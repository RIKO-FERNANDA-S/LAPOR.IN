import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/email";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Nama, email, dan password wajib diisi." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password minimal 6 karakter." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser && existingUser.is_verified) {
      return NextResponse.json(
        { message: "Email ini sudah terdaftar. Silakan login." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      // Update pending user details
      await prisma.user.update({
        where: { email: normalizedEmail },
        data: {
          name,
          password_hash: hashedPassword,
          is_verified: false,
        },
      });
    } else {
      // Create pending unverified user
      await prisma.user.create({
        data: {
          name,
          email: normalizedEmail,
          password_hash: hashedPassword,
          is_verified: false,
        },
      });
    }

    // Generate 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const identifier = `${normalizedEmail}:register`;
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 Minutes expiration

    await prisma.verificationToken.deleteMany({
      where: { identifier },
    });

    await prisma.verificationToken.create({
      data: {
        identifier,
        token: otp,
        expires,
      },
    });

    // Send email with OTP code
    const emailResult = await sendOtpEmail({
      to: normalizedEmail,
      otp,
      type: "register",
    });

    return NextResponse.json(
      {
        message: "Kode OTP verifikasi telah dikirim ke email Anda.",
        requireOtp: true,
        email: normalizedEmail,
        simulated: emailResult.simulated,
        devOtp: emailResult.simulated ? emailResult.otp : undefined,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat registrasi.", error: error.message },
      { status: 500 }
    );
  }
}
