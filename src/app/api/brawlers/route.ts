import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch('https://brawlapi.com/api/brawlers')

    const data = await response.json();

    return NextResponse.json(data);
}