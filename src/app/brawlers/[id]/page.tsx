import BrawlerDetail from "@/components/BrawlerDetail"

// TODO 1: This function receives `params` from Next.js.
//   `params` is an object with an `id` property (from the [id] folder name).
//   You need to:
//   a) Fetch from `https://api.brawlify.com/v1/brawlers/${id}`
//   b) Parse the JSON response
//   c) Pass the brawler data to <BrawlerDetail />
//
//   Look at how /app/brawlers/page.tsx fetches data for reference.

export default async function BrawlerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // TODO 2: Fetch the brawler data using the id
    // Hint: same pattern as your brawlers list page, just a different URL

    // TODO 3: Parse the response as JSON

    return (
        <div className="bg-black flex-1 -mt-[80px] pt-[80px]">
            <main className="pt-32 pb-16">
                <div className="max-w-[1200px] mx-auto px-10">
                    {/* TODO 4: Pass the brawler data to BrawlerDetail */}
                    <BrawlerDetail />
                </div>
            </main>
        </div>
    )
}