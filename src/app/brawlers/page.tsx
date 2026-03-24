interface Brawler {
    id: number
    name: string
    imageUrl2: string
    rarity: { id: number; name: string; color: string }
}

const RARITY_ORDER = [
    "Starting Brawler",
    "Common",
    "Rare",
    "Super Rare",
    "Epic",
    "Mythic",
    "Legendary",
    "Ultra Legendary",
]

export default async function Brawlers() {
    const res = await fetch("https://api.brawlify.com/v1/brawlers", { cache: "no-store" })
    const data = await res.json()
    const brawlers: Brawler[] = data.list ?? []
    const newest = [...brawlers].sort((a, b) => b.id - a.id)[0]

    const grouped = RARITY_ORDER.reduce((acc, rarity) => {
        acc[rarity] = brawlers.filter(b => b.rarity.name === rarity)
        return acc
    }, {} as Record<string, Brawler[]>)

    return (
        <div className="bg-black min-h-screen -mt-[80px] pt-[80px]">
            <main className="pt-24 pb-16">
                <div className="max-w-[1200px] mx-auto px-10">

                    {/* HEADER */}
                    <section className="mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
                            All {brawlers.length} Brawl Stars Characters
                        </h1>
                        <p className="text-white/40 text-sm leading-relaxed">
                            Browse every brawler in Brawl Stars. Click on a character to see detailed stats, star powers, gadgets, gears, buffs, and skins. The newest brawler is {newest?.name}.
                        </p>
                    </section>

                    {/* GROUPED BY RARITY */}
                    <div className="space-y-10">
                        {RARITY_ORDER.map(rarity => {
                            const group = grouped[rarity]
                            if (!group?.length) return null

                            const color = group[0]?.rarity.color ?? "#ffffff"

                            return (
                                <section key={rarity}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: color }} />
                                        <h2 className="text-sm font-semibold" style={{ color }}>{rarity}</h2>
                                    </div>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
                                        {group.map(brawler => (
                                            <div key={brawler.id} className="group flex flex-col items-center gap-1.5 cursor-pointer">
                                                <div className="w-full aspect-square bg-zinc-900 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center group-hover:border-white/20 group-hover:bg-zinc-800 transition-all duration-300">
                                                    <img
                                                        src={brawler.imageUrl2}
                                                        alt={brawler.name}
                                                        className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <p className="text-[10px] font-medium text-white/40 text-center group-hover:text-white/70 transition-colors truncate w-full">
                                                    {brawler.name}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )
                        })}
                    </div>

                </div>
            </main>
        </div>
    )
}
