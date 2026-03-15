import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get('tag')

    const response = await fetch(`https://brawlapi.com/api/players/%23${tag}`)
    const data = await response.json()
    return NextResponse.json(data)
}
