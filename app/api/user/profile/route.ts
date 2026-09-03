import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Tidak diizinkan. Silakan login." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role_id: true,
        village: true,
        city: true,
        province: true,
        latitude: true,
        longitude: true,
        is_verified: true,
        created_at: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Pengguna tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data profil.", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Tidak diizinkan. Silakan login." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, village, city, province, latitude, longitude } = body;

    const updateData: any = {};
    if (typeof name === "string" && name.trim()) updateData.name = name.trim();
    if (typeof village === "string") updateData.village = village.trim();
    if (typeof city === "string") updateData.city = city.trim();
    if (typeof province === "string") updateData.province = province.trim();
    if (typeof latitude === "number" && !isNaN(latitude)) updateData.latitude = latitude;
    if (typeof longitude === "number" && !isNaN(longitude)) updateData.longitude = longitude;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role_id: true,
        village: true,
        city: true,
        province: true,
        latitude: true,
        longitude: true,
        is_verified: true,
        updated_at: true,
      },
    });

    return NextResponse.json({
      message: "Profil dan lokasi berhasil diperbarui.",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui profil.", error: error.message },
      { status: 500 }
    );
  }
}
