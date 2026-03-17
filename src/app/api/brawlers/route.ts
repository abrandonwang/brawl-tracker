import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch('https://api.brawlify.com/v1/brawlers', { cache: 'no-store' })

    const data = await response.json();

    return NextResponse.json(data);
}