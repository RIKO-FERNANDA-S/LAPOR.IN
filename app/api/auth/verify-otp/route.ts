import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, code, type, name, password } = await req.json();

    if (!email || !code || !type) {
      return NextResponse.json(
        { message: "Email, kode OTP, dan tipe verifikasi wajib diisi." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedCode = code.trim();
    const identifier = `${normalizedEmail}:${type}`;

    // Find token in database
    const tokenRecord = await prisma.verificationToken.findFirst({
      where: {
        identifier,
        token: normalizedCode,
      },
    });

    if (!tokenRecord) {
      return NextResponse.json(
        { message: "Kode OTP salah atau tidak ditemukan." },
        { status: 400 }
      );
    }

    if (tokenRecord.expires < new Date()) {
      // Clean expired token
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier,
            token: normalizedCode,
          },
        },
      });
      return NextResponse.json(
        { message: "Kode OTP telah kedaluwarsa. Silakan minta kode baru." },
        { status: 400 }
      );
    }

    // Token is valid! Process flow
    if (type === "register") {
      let hashedPassword = "";
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // Check if user already exists
      let user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (user) {
        // Update user to verified and set password if provided
        user = await prisma.user.update({
          where: { email: normalizedEmail },
          data: {
            name: name || user.name,
            password_hash: hashedPassword || user.password_hash,
            is_verified: true,
          },
        });
      } else {
        // Create new verified user
        user = await prisma.user.create({
          data: {
            name: name || "Warga Lapor.in",
            email: normalizedEmail,
            password_hash: hashedPassword,
            is_verified: true,
          },
        });
      }

      // Clean up token
      await prisma.verificationToken.deleteMany({
        where: { identifier },
      });

      return NextResponse.json({
        message: "Akun berhasil diverifikasi dan terdaftar!",
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } else if (type === "reset_password") {
      // Delete OTP token
      await prisma.verificationToken.deleteMany({
        where: { identifier },
      });

      // Generate a temporary reset authorization token (valid for 15 minutes)
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetIdentifier = `${normalizedEmail}:reset_auth`;
      const resetExpires = new Date(Date.now() + 15 * 60 * 1000);

      await prisma.verificationToken.deleteMany({
        where: { identifier: resetIdentifier },
      });

      await prisma.verificationToken.create({
        data: {
          identifier: resetIdentifier,
          token: resetToken,
          expires: resetExpires,
        },
      });

      return NextResponse.json({
        message: "OTP Valid. Silakan atur kata sandi baru Anda.",
        success: true,
        resetToken,
      });
    }

    return NextResponse.json(
      { message: "Tipe verifikasi tidak dikenal." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { message: "Gagal memverifikasi kode OTP.", error: error.message },
      { status: 500 }
    );
  }
}
