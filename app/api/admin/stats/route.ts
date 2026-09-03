import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ReportStatus, Severity } from "@prisma/client";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Tidak diizinkan. Silakan login." },
        { status: 401 }
      );
    }

    // Aggregations
    const [
      totalReports,
      verifiedReports,
      pendingReports,
      inProgressReports,
      rejectedReports,
      totalUsers,
      criticalReports,
      highSeverityReports,
      avgRatingAggregate,
      recentReports,
      categoriesCount,
    ] = await Promise.all([
      prisma.report.count({ where: { is_deleted: false } }),
      prisma.report.count({
        where: {
          is_deleted: false,
          status: { in: [ReportStatus.DIVERIFIKASI, ReportStatus.SELESAI] },
        },
      }),
      prisma.report.count({
        where: { is_deleted: false, status: ReportStatus.MENUNGGU },
      }),
      prisma.report.count({
        where: { is_deleted: false, status: ReportStatus.DIPROSES },
      }),
      prisma.report.count({
        where: { is_deleted: false, status: ReportStatus.DITOLAK },
      }),
      prisma.user.count(),
      prisma.report.count({
        where: { is_deleted: false, severity_level: Severity.KRITIS },
      }),
      prisma.report.count({
        where: { is_deleted: false, severity_level: Severity.TINGGI },
      }),
      prisma.report.aggregate({
        _avg: { rating: true },
        where: { is_deleted: false },
      }),
      prisma.report.findMany({
        where: { is_deleted: false },
        orderBy: { reported_at: "desc" },
        take: 10,
        include: {
          user: { select: { name: true, email: true } },
          sub_category: true,
          region: true,
        },
      }),
      prisma.infraCategory.count(),
    ]);

    const avgRating = avgRatingAggregate._avg.rating || 4.2;
    // Calculate Bina Score (scale 0-100 based on rating & verification percentage)
    const verificationRate =
      totalReports > 0 ? (verifiedReports / totalReports) * 100 : 85;
    const binaScore = Math.min(
      100,
      Math.round((avgRating / 5) * 70 + (verificationRate / 100) * 30)
    );

    return NextResponse.json({
      stats: {
        totalReports,
        verifiedReports,
        pendingReports,
        inProgressReports,
        rejectedReports,
        totalUsers,
        criticalReports,
        highSeverityReports,
        avgRating: Math.round(avgRating * 10) / 10,
        binaScore,
        categoriesCount,
      },
      recentReports,
    });
  } catch (error: any) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { message: "Gagal mengambil statistik admin", error: error.message },
      { status: 500 }
    );
  }
}
