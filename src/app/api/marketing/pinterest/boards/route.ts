import { NextResponse } from "next/server";

const PINTEREST_API_BASE = "https://api.pinterest.com/v5";

export async function GET() {
  const token = process.env.PINTEREST_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "PINTEREST_ACCESS_TOKEN manquant" },
      { status: 500 },
    );
  }

  const response = await fetch(`${PINTEREST_API_BASE}/boards`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const body = await response.text();
    return NextResponse.json(
      { error: `Pinterest API ${response.status}: ${body}` },
      { status: response.status },
    );
  }

  const data = (await response.json()) as {
    items: Array<{
      id: string;
      name: string;
      description: string;
      pin_count: number;
    }>;
  };

  const boards = data.items.map((b) => ({
    id: b.id,
    name: b.name,
    description: b.description,
    pinCount: b.pin_count,
  }));

  return NextResponse.json({ boards });
}
