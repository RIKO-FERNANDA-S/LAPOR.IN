import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email, type } = await req.json();

    if (!email || !type) {
      return NextResponse.json(
        { message: "Email dan tipe verifikasi wajib diisi." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check user existence based on flow
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (type === "register") {
      if (existingUser && existingUser.is_verified) {
        return NextResponse.json(
          { message: "Email ini sudah terdaftar. Silakan login." },
          { status: 400 }
        );
      }
    } else if (type === "reset_password") {
      if (!existingUser) {
        return NextResponse.json(
          { message: "Email tidak terdaftar dalam sistem." },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Tipe verifikasi tidak valid." },
        { status: 400 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const identifier = `${normalizedEmail}:${type}`;
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 Minutes expiration

    // Save or update VerificationToken in database
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

    // Send Email
    const result = await sendOtpEmail({
      to: normalizedEmail,
      otp,
      type,
    });

    return NextResponse.json(
      {
        message: `Kode OTP berhasil dikirim ke ${normalizedEmail}`,
        simulated: result.simulated,
        devOtp: result.simulated ? result.otp : undefined,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { message: "Gagal mengirimkan kode OTP.", error: error.message },
      { status: 500 }
    );
  }
}
