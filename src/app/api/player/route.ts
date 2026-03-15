import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get('tag')

    const response = await fetch(`http://165.227.206.51:3000/player/${tag}`)
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
}
