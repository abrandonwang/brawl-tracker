import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.brawlstars.com/v1/events/rotation", {
    headers: {
      Authorization: `Bearer ${process.env.BRAWL_API_KEY}`,
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!res.ok) {
    return NextResponse.json([], { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}