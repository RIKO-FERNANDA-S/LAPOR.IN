import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ReportStatus } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Tidak diizinkan. Silakan login." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const reportId = parseInt(id, 10);
    if (isNaN(reportId)) {
      return NextResponse.json(
        { message: "ID laporan tidak valid" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { status, comment } = body;

    const validStatuses: ReportStatus[] = [
      ReportStatus.DIVERIFIKASI,
      ReportStatus.DIPROSES,
      ReportStatus.DITOLAK,
      ReportStatus.SELESAI,
      ReportStatus.MENUNGGU,
    ];

    if (!status || !validStatuses.includes(status as ReportStatus)) {
      return NextResponse.json(
        { message: "Status verifikasi tidak valid" },
        { status: 400 }
      );
    }

    // Update Report status and admin verifier info
    const updatedReport = await prisma.report.update({
      where: { id: reportId },
      data: {
        status: status as ReportStatus,
        admin_verified_by: session.user.id,
        admin_verified_at: new Date(),
        verification_count: { increment: 1 },
      },
      include: {
        user: { select: { name: true, email: true } },
        sub_category: true,
        region: true,
      },
    });

    // Insert ReportVerification record
    await prisma.reportVerification.create({
      data: {
        report_id: reportId,
        user_id: session.user.id,
        verification_type: "ADMIN_CHECK",
        comment: comment || `Status diubah menjadi ${status} oleh Admin`,
      },
    });

    return NextResponse.json({
      message: `Status laporan berhasil diperbarui menjadi ${status}`,
      report: updatedReport,
    });
  } catch (error: any) {
    console.error("Error verifying report:", error);
    return NextResponse.json(
      { message: "Gagal memverifikasi laporan", error: error.message },
      { status: 500 }
    );
  }
}
