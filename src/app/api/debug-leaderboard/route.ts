import { NextResponse } from "next/server"

export async function GET() {
  const res = await fetch(
    "https://api.brawlstars.com/v1/rankings/global/players",
    {
      headers: {
        Authorization: `Bearer ${process.env.BRAWL_API_KEY}`,
        "Cache-Control": "no-cache",
      },
      cache: "no-store",
    }
  )
  const text = await res.text()
  return NextResponse.json({ status: res.status, body: text.slice(0, 1000) })
}
