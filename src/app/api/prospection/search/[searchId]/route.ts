import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ searchId: string }> }
) {
  try {
    const { searchId } = await context.params;

    const search = await prisma.prospectSearch.findUnique({
      where: { id: searchId },
      include: {
        businesses: {
          orderBy: [
            { isQualified: "desc" },
            { grossMargin: "desc" },
          ],
        },
      },
    });

    if (!search) {
      return NextResponse.json(
        { error: "Recherche non trouvee" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      search: {
        id: search.id,
        location: search.location,
        radius: search.radius,
        businessType: search.businessType,
        maxResults: search.maxResults,
        marginMin: search.marginMin,
        marginMax: search.marginMax,
        status: search.status,
        totalFound: search.totalFound,
        totalQualified: search.totalQualified,
        createdAt: search.createdAt.toISOString(),
      },
      businesses: search.businesses.map((b) => ({
        id: b.id,
        name: b.name,
        address: b.address,
        phone: b.phone,
        website: b.website,
        googleRating: b.googleRating,
        googleReviewCount: b.googleReviewCount,
        companyNumber: b.companyNumber,
        grossMargin: b.grossMargin,
        revenue: b.revenue,
        netProfit: b.netProfit,
        employees: b.employees,
        legalForm: b.legalForm,
        isQualified: b.isQualified,
        qualificationNote: b.qualificationNote,
      })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur interne";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
