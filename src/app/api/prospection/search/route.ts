import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getGoogleMapsClient, getCompanyWebClient } from "@/lib/prospection/registry";
import { qualifyBusiness } from "@/lib/prospection/qualifier";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { location, radius, businessType, maxResults, marginMin, marginMax } = body;

    // Validation
    if (!location || !businessType) {
      return NextResponse.json(
        { error: "Localite et type d'entreprise requis" },
        { status: 400 }
      );
    }
    if (!radius || radius < 1) {
      return NextResponse.json({ error: "Rayon invalide" }, { status: 400 });
    }
    if (!maxResults || maxResults < 1 || maxResults > 200) {
      return NextResponse.json(
        { error: "Nombre d'entreprises invalide (1-200)" },
        { status: 400 }
      );
    }
    if (marginMin == null || marginMax == null || marginMin >= marginMax) {
      return NextResponse.json(
        { error: "Fourchette de marge invalide" },
        { status: 400 }
      );
    }

    // 1. Creer la recherche en DB
    const search = await prisma.prospectSearch.create({
      data: {
        location,
        radius,
        businessType,
        maxResults,
        marginMin,
        marginMax,
        status: "searching",
      },
    });

    // 2. Rechercher sur Google Maps
    const googleClient = getGoogleMapsClient();
    const gmResult = await googleClient.searchBusinesses({
      query: businessType,
      location: `${location}, Belgique`,
      radius: radius * 1000, // km -> metres
      maxResults,
    });

    if (!gmResult.success || gmResult.businesses.length === 0) {
      await prisma.prospectSearch.update({
        where: { id: search.id },
        data: { status: "done", totalFound: 0, totalQualified: 0 },
      });
      return NextResponse.json({
        searchId: search.id,
        status: "done",
        totalFound: 0,
        totalQualified: 0,
      });
    }

    // 3. Persister les entreprises + enrichir via CompanyWeb
    const cwClient = getCompanyWebClient();
    let totalQualified = 0;

    for (const biz of gmResult.businesses) {
      // Chercher sur CompanyWeb
      const cwSearch = await cwClient.searchCompany({
        name: biz.name,
        city: location,
      });

      let companyNumber: string | null = null;
      let grossMargin: number | null = null;
      let revenue: number | null = null;
      let netProfit: number | null = null;
      let employees: number | null = null;
      let legalForm: string | null = null;
      let enrichedAt: Date | null = null;

      if (cwSearch.success && cwSearch.companies.length > 0) {
        const company = cwSearch.companies[0];
        companyNumber = company.companyNumber;
        legalForm = company.legalForm ?? null;

        // Recuperer les donnees financieres
        const financials = await cwClient.getCompanyFinancials(company.companyNumber);
        if (financials.success && financials.financials) {
          grossMargin = financials.financials.grossMargin ?? null;
          revenue = financials.financials.revenue ?? null;
          netProfit = financials.financials.netProfit ?? null;
          employees = financials.financials.employees ?? null;
          enrichedAt = new Date();
        }
      }

      // Qualifier
      const qualification = qualifyBusiness(grossMargin, marginMin, marginMax);
      if (qualification.isQualified) totalQualified++;

      await prisma.prospectBusiness.create({
        data: {
          searchId: search.id,
          name: biz.name,
          address: biz.address,
          phone: biz.phone ?? null,
          website: biz.website ?? null,
          googleRating: biz.rating ?? null,
          googleReviewCount: biz.reviewCount ?? null,
          latitude: biz.latitude,
          longitude: biz.longitude,
          companyNumber,
          grossMargin,
          revenue,
          netProfit,
          employees,
          legalForm,
          isQualified: qualification.isQualified,
          qualificationNote: qualification.note,
          enrichedAt,
        },
      });
    }

    // 4. Mettre a jour la recherche
    await prisma.prospectSearch.update({
      where: { id: search.id },
      data: {
        status: "done",
        totalFound: gmResult.businesses.length,
        totalQualified,
      },
    });

    return NextResponse.json({
      searchId: search.id,
      status: "done",
      totalFound: gmResult.businesses.length,
      totalQualified,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur interne";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
