"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [userInput, setUserInput] = useState("")
  const router = useRouter()

  function handleSearch() {
    const tag = userInput.trim().replace(/^#/, "")
    if (tag) router.push(`/player/${tag}`)
  }

  return (
    <main className="flex-1 bg-[#fcfdfe] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-10 pt-24 pb-6">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* LEFT: HEADLINE */}
          <div className="lg:col-span-6">
            <h1 className="text-[96px] md:text-[130px] font-black leading-[0.88] tracking-tighter text-zinc-900">
              Master the Arena.
            </h1>
            <p className="mt-8 text-zinc-400 text-lg font-medium leading-relaxed">
              Real-time stats, rankings, and brawler analysis<br />for competitive Brawl Stars players.
            </p>
          </div>

          {/* RIGHT: SEARCH + CARDS */}
          <div className="lg:col-span-6 space-y-8">

            {/* SEARCH BOX */}
            <div>
              <div className="flex items-center bg-white border border-zinc-200 rounded-2xl px-6 py-4 shadow-sm focus-within:border-zinc-400 transition-colors">
                <span className="text-zinc-400 font-black text-xl mr-2">#</span>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Enter player tag"
                  className="flex-1 bg-transparent py-2 text-xl font-bold outline-none text-zinc-950 placeholder:text-zinc-300 tracking-tight"
                />
                <button
                  onClick={handleSearch}
                  className="bg-[#FFD400] text-zinc-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#ECC000] transition-colors shrink-0"
                >
                  Search
                </button>
              </div>
              <p className="mt-3 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] text-center">
                Tap your profile icon in-game to find your tag
              </p>
            </div>

            {/* STATS CARDS */}
            <div className="flex gap-4">

              {/* Win Rate */}
              <div className="flex-1 bg-white p-7 rounded-[28px] border border-zinc-100 shadow-sm">
                <div className="h-28 bg-[#FFD400]/15 rounded-xl flex flex-col justify-end p-4 mb-5">
                  <span className="text-4xl font-black text-zinc-800 leading-none">85%</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mt-1">Win Rate</span>
                </div>
                <p className="text-[10px] font-black uppercase text-zinc-400 mb-3">Top Brawlers</p>
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 border-2 border-white" />
                  <div className="w-10 h-10 rounded-xl bg-zinc-200 border-2 border-white" />
                </div>
              </div>

              {/* Meta */}
              <div className="flex-1 bg-white p-7 rounded-[28px] border border-zinc-100 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 mb-4">
                  <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#FFF5C0" strokeWidth="4" />
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#FFD400" strokeWidth="4" strokeDasharray="65, 100" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[9px] font-black uppercase text-zinc-300 tracking-widest">Current Meta</span>
                <span className="text-base font-black text-zinc-700 mt-1">Duo Showdown</span>
              </div>

              {/* Global Rank */}
              <div className="flex-1 bg-white p-7 rounded-[28px] border border-zinc-100 shadow-sm">
                <div className="h-14 bg-[#FFD400] rounded-xl flex items-center justify-center text-xs font-black tracking-widest mb-6">
                  TOP 5%
                </div>
                <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Global Rank</span>
                <div className="mt-3 w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">🏆</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
