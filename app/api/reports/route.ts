import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { Severity } from "@prisma/client"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      title,
      description,
      severity_level,
      location_description,
      latitude,
      longitude,
      photo_urls,
      tags,
      rating,
      aspect,
      category_name,
      facility_name,
    } = body

    if (!description && !title) {
      return NextResponse.json(
        { message: "Judul atau deskripsi laporan harus diisi" },
        { status: 400 }
      )
    }

    // Mandatory photo check according to section 17 of prompt
    if (!photo_urls || !Array.isArray(photo_urls) || photo_urls.length === 0) {
      return NextResponse.json(
        { message: "Bukti foto/video wajib diunggah untuk mengirim laporan atau penilaian" },
        { status: 400 }
      )
    }

    // Get session user if logged in
    const session = await auth().catch(() => null)
    let userId = session?.user?.id

    if (!userId) {
      // Find fallback user or create one
      let user = await prisma.user.findFirst()
      if (!user) {
        user = await prisma.user.create({
          data: {
            name: "Pelapor Anonim",
            email: "pelapor@lapor.in",
            is_verified: true,
          },
        })
      }
      userId = user.id
    }

    // Ensure default region exists
    let region = await prisma.region.findFirst()
    if (!region) {
      region = await prisma.region.create({
        data: {
          province: "Jawa Timur",
          city: "Surabaya",
          district: "Gunung Anyar",
          village: "Gunung Anyar",
          center_latitude: latitude || -7.3361,
          center_longitude: longitude || 112.7872,
        },
      })
    }

    // Find or create subcategory based on facility_name / category_name
    let subCategoryName = facility_name || "Laporan Fasilitas"
    let subCategory = await prisma.subCategory.findFirst({
      where: { name: subCategoryName },
    })

    if (!subCategory) {
      let infraCategory = await prisma.infraCategory.findFirst()
      if (!infraCategory) {
        infraCategory = await prisma.infraCategory.create({
          data: {
            name: category_name || "Infrastruktur & Mobilitas",
            code: "INFRA_MAIN",
            description: "Kategori utama penilaian infrastruktur",
          },
        })
      }
      subCategory = await prisma.subCategory.create({
        data: {
          category_id: infraCategory.id,
          name: subCategoryName,
          code: `SUB_${Date.now()}`,
        },
      })
    }

    // Normalize rating (1 - 5 stars)
    let parsedRating = 5
    if (typeof rating === "number" && rating >= 1 && rating <= 5) {
      parsedRating = Math.round(rating)
    }

    // Normalize severity enum value
    let validSeverity: Severity = Severity.RENDAH
    if (severity_level && Object.values(Severity).includes(severity_level as Severity)) {
      validSeverity = severity_level as Severity
    } else if (parsedRating === 1) {
      validSeverity = Severity.KRITIS
    } else if (parsedRating === 2) {
      validSeverity = Severity.TINGGI
    } else if (parsedRating === 3) {
      validSeverity = Severity.SEDANG
    } else {
      validSeverity = Severity.RENDAH
    }

    // Combine title into description or location if needed
    const finalDescription = title
      ? `[${title}] ${description || ""}`
      : description || "Laporan dan penilaian fasilitas"

    const newReport = await prisma.report.create({
      data: {
        user_id: userId,
        sub_category_id: subCategory.id,
        region_id: region.id,
        report_date: new Date(),
        location_description: location_description || "Lokasi terpilih via peta",
        latitude: typeof latitude === "number" ? latitude : -7.3361,
        longitude: typeof longitude === "number" ? longitude : 112.7872,
        description: finalDescription,
        rating: parsedRating,
        aspect: aspect || "Kondisi Umum",
        severity_level: validSeverity,
        photo_urls: Array.isArray(photo_urls) ? photo_urls : [],
      },
    })

    return NextResponse.json(
      {
        message: "Laporan berhasil dibuat",
        report: newReport,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error creating report:", error)
    return NextResponse.json(
      { message: "Gagal membuat laporan", error: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { reported_at: "desc" },
      take: 50,
      include: {
        user: { select: { name: true, email: true } },
        sub_category: true,
        region: true,
      },
    })
    return NextResponse.json({ reports })
  } catch (error: any) {
    return NextResponse.json({ message: "Gagal mengambil data laporan", error: error.message }, { status: 500 })
  }
}
