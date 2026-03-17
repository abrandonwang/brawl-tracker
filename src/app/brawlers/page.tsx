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

    const grouped = RARITY_ORDER.reduce((acc, rarity) => {
        acc[rarity] = brawlers.filter(b => b.rarity.name === rarity)
        return acc
    }, {} as Record<string, Brawler[]>)

    return (
        <div className="bg-black min-h-screen -mt-[80px] pt-[80px]">
            <main className="pt-32 pb-32">
                <div className="max-w-[1440px] mx-auto px-10">

                    {/* HEADER */}
                    <section className="mb-20">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">Catalog</p>
                        <h1 className="text-6xl md:text-[100px] font-black tracking-[-0.06em] leading-[0.85] text-white">
                            {brawlers.length-1} Brawlers
                        </h1>
                    </section>

                    {/* GROUPED BY RARITY */}
                    <div className="space-y-24">
                        {RARITY_ORDER.map(rarity => {
                            const group = grouped[rarity]
                            if (!group?.length) return null

                            return (
                                <section key={rarity}>
                                    <div className="flex items-center gap-4 mb-10">
                                        <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30">{rarity}</h2>
                                        <div className="flex-1 h-px bg-white/5" />
                                        <span className="text-[11px] font-black text-white/20">{group.length}</span>
                                    </div>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                                        {group.map(brawler => (
                                            <div key={brawler.id} className="group flex flex-col items-center gap-2 cursor-pointer">
                                                <div className="w-full aspect-square bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center group-hover:border-white/20 group-hover:bg-zinc-800 transition-all duration-300">
                                                    <img
                                                        src={brawler.imageUrl2}
                                                        alt={brawler.name}
                                                        className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <p className="text-[10px] font-bold text-white/40 text-center group-hover:text-white/70 transition-colors truncate w-full text-center">
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
