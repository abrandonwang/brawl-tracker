"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface StarPower {
    id: number
    name: string
    description: string
    imageUrl: string
}

interface Gadget {
    id: number
    name: string
    description: string
    imageUrl: string
}

interface Brawler {
    id: number
    name: string
    description: string
    imageUrl2: string
    rarity: { id: number; name: string; color: string }
    class: { id: number; name: string }
    starPowers: StarPower[]
    gadgets: Gadget[]
}

export default function BrawlerDetail({ brawler }: { brawler: Brawler }) {
    // TODO 5: Create a state variable called `activeTab` to track which tab is selected.
    //   It should start as "starPowers" and can be either "starPowers" or "gadgets".

    // TODO 6: Build an `items` variable.
    //   If activeTab is "starPowers", it should be brawler.starPowers
    //   If activeTab is "gadgets", it should be brawler.gadgets
    //   Hint: ternary operator
    const items: (StarPower | Gadget)[] = [] // replace me

    const rarityColor = brawler.rarity.color

    return (
        <div>
            {/* BACK LINK */}
            <Link
                href="/brawlers"
                className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
            >
                <ArrowLeft size={14} />
                Back to all brawlers
            </Link>

            {/* HERO SECTION */}
            <div className="flex flex-col md:flex-row items-start gap-10 mb-14">
                {/* Brawler Image */}
                <div
                    className="w-48 h-48 rounded-2xl border-2 p-4 shrink-0 flex items-center justify-center"
                    style={{ borderColor: rarityColor, backgroundColor: `${rarityColor}10` }}
                >
                    <img
                        src={brawler.imageUrl2}
                        alt={brawler.name}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Brawler Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <h1 className="text-3xl font-bold text-white">{brawler.name}</h1>
                        <span
                            className="px-3 py-1 rounded-lg text-xs font-semibold"
                            style={{ color: rarityColor, backgroundColor: `${rarityColor}15`, border: `1px solid ${rarityColor}40` }}
                        >
                            {brawler.rarity.name}
                        </span>
                    </div>
                    {brawler.class.name !== "Unknown" && (
                        <p className="text-white/30 text-sm mb-4">{brawler.class.name}</p>
                    )}
                    <p className="text-white/50 text-sm leading-relaxed max-w-xl">
                        {brawler.description}
                    </p>
                </div>
            </div>

            {/* TABS */}
            <div className="flex items-center gap-2 mb-6">
                {/* TODO 7: Create two tab buttons — "Star Powers" and "Gadgets"
                    Each button should:
                    a) On click, set activeTab to "starPowers" or "gadgets"
                    b) Have different styling when active vs inactive
                    
                    Use this className pattern (same idea as the rarity buttons):
                    - Active:   "bg-white text-black"
                    - Inactive: "bg-zinc-900 border border-white/10 text-white/40 hover:text-white/70"
                    
                    Both should have these base classes:
                    "px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                */}
            </div>

            {/* ABILITY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* TODO 8: Map over `items` and render a card for each one.
                    Each card should show:
                    - The ability's image (item.imageUrl)
                    - The ability's name (item.name)
                    - The ability's description (item.description)
                    
                    Don't forget the `key` prop!
                    
                    Here's the card shell (CSS already done for you):
                    
                    <div key={???} className="flex items-start gap-4 bg-zinc-900 border border-white/5 rounded-xl p-4 hover:border-white/15 transition-colors">
                        <img src={???} alt={???} className="w-12 h-12 object-contain shrink-0" />
                        <div>
                            <h3 className="text-sm font-semibold text-white mb-1">{???}</h3>
                            <p className="text-xs text-white/40 leading-relaxed">{???}</p>
                        </div>
                    </div>
                */}
            </div>
        </div>
    )
}