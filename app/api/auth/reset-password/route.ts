import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, resetToken, newPassword } = await req.json();

    if (!email || !resetToken || !newPassword) {
      return NextResponse.json(
        { message: "Email, token reset, dan password baru wajib diisi." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "Password baru minimal 6 karakter." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const identifier = `${normalizedEmail}:reset_auth`;

    // Verify resetToken in database
    const tokenRecord = await prisma.verificationToken.findFirst({
      where: {
        identifier,
        token: resetToken,
      },
    });

    if (!tokenRecord || tokenRecord.expires < new Date()) {
      return NextResponse.json(
        { message: "Sesi reset password tidak valid atau telah kedaluwarsa. Silakan ulang proses dari awal." },
        { status: 400 }
      );
    }

    // Check user
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Pengguna tidak ditemukan." },
        { status: 404 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in Neon DB
    await prisma.user.update({
      where: { email: normalizedEmail },
      data: {
        password_hash: hashedPassword,
        is_verified: true,
      },
    });

    // Clean up reset authorization token
    await prisma.verificationToken.deleteMany({
      where: { identifier },
    });

    return NextResponse.json({
      message: "Password berhasil diperbarui! Silakan login dengan password baru Anda.",
      success: true,
    });
  } catch (error: any) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui password.", error: error.message },
      { status: 500 }
    );
  }
}
