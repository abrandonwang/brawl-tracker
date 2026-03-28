"use client"

import { useState } from "react"
import { Search, Trophy } from "lucide-react"

interface Player {
  rank: number
  player_tag: string
  player_name: string
  trophies: number
  club_name: string | null
  updated_at: string
}

interface RegionData {
  code: string
  label: string
  players: Player[]
}

const linkBase = "text-xs font-semibold tracking-tight transition-all duration-200 px-3 py-1.5 text-left whitespace-nowrap"
const linkInactive = `${linkBase} text-white/50 hover:text-white hover:bg-white/5`
const linkActive = `${linkBase} bg-[#FFD400] text-black`

export default function LeaderboardsClient({ allData, updatedAt }: { allData: RegionData[]; updatedAt: string | null }) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const filtered = allData
    .filter((r) => activeRegion === null || r.code === activeRegion)
    .map((r) => ({
      ...r,
      players: r.players.filter(
        (p) =>
          p.player_name.toLowerCase().includes(search.toLowerCase()) ||
          p.player_tag.toLowerCase().includes(search.toLowerCase())
      ),
    }))

  return (
    <div className="bg-black h-[calc(100dvh-52px)] flex flex-col lg:flex-row overflow-hidden">

      {/* Sidebar */}
      <aside className="w-full lg:w-64 shrink-0 h-auto lg:h-full border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col lg:overflow-y-auto">

        {/* Search */}
        <div className="px-4 pt-4 pb-3 lg:px-5 lg:pt-10 lg:pb-4">
          <div className="flex items-center gap-2.5 bg-white/10 border border-white/20 px-4 py-2.5">
            <Search size={13} className="text-white/60 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search players"
              className="bg-transparent text-xs text-white outline-none placeholder:text-white/40 w-full"
            />
          </div>
        </div>

        {/* Regions */}
        <div className="lg:px-5 lg:pb-10 flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible px-4 pb-3 lg:pb-0 scrollbar-none">
          <p className="hidden lg:block text-[10px] font-bold text-white/30 uppercase tracking-widest px-3 mb-1">Region</p>

          <button onClick={() => setActiveRegion(null)} className={activeRegion === null ? linkActive : linkInactive}>
            All
          </button>

          {allData.map((r) => (
            <button
              key={r.code}
              onClick={() => setActiveRegion(activeRegion === r.code ? null : r.code)}
              className={activeRegion === r.code ? linkActive : linkInactive}
            >
              {r.label}
            </button>
          ))}
        </div>

        {updatedAt && (
          <p className="hidden lg:block text-[10px] text-white/20 mt-auto px-8 pb-6">Updated {updatedAt}</p>
        )}
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-y-auto pt-6 pb-6 px-8">
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">Leaderboards</h1>
          <p className="text-white/40 text-sm leading-relaxed">Top 200 players by region, ranked by trophies.</p>
        </section>

        <div className="space-y-12">
          {filtered.map((region) => (
            <section key={region.code}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-sm font-bold text-white/70 uppercase tracking-widest">{region.label}</h2>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              {region.players.length === 0 ? (
                <p className="text-white/25 text-sm py-8">No data yet.</p>
              ) : (
                <div className="space-y-1">
                  <div className="grid grid-cols-[32px_1fr_auto_auto] gap-4 px-3 py-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    <span>#</span>
                    <span>Player</span>
                    <span className="hidden sm:block">Club</span>
                    <span className="text-right">Trophies</span>
                  </div>

                  {region.players.map((player, i) => (
                    <div
                      key={player.player_tag}
                      className="grid grid-cols-[32px_1fr_auto_auto] gap-4 items-center px-3 py-2.5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                    >
                      <span className={`text-xs font-black tabular-nums ${
                        i === 0 ? "text-[#FFD400]" : i === 1 ? "text-white/60" : i === 2 ? "text-orange-400/70" : "text-white/25"
                      }`}>
                        {player.rank}
                      </span>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{player.player_name}</p>
                        <p className="text-[10px] text-white/25 font-mono">{player.player_tag}</p>
                      </div>

                      <span className="hidden sm:block text-xs text-white/30 truncate max-w-[140px]">
                        {player.club_name ?? "—"}
                      </span>

                      <div className="flex items-center gap-1.5 justify-end">
                        <Trophy size={11} className="text-[#FFD400]/50 shrink-0" />
                        <span className="text-sm font-bold text-[#FFD400]/80 tabular-nums">
                          {player.trophies.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
