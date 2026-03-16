"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Swords, TrendingUp, Trophy } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const router = useRouter()
  const [userInput, setUserInput] = useState("")
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".feature-card")
    if (!cards) return

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      )
    })

    const footer = document.querySelector("footer")
    if (footer) {
      gsap.fromTo(footer,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        }
      )
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  const handleSearch = () => {
    const tag = userInput.trim().toUpperCase()
    if (tag) router.push(`/player/${tag}`)
  }

  return (
    <main className="relative pt-64 pb-60 spotlight-bg">
      <div className="max-w-[1440px] mx-auto px-10">

        {/* HERO SECTION */}
        <section className="max-w-4xl mx-auto text-center space-y-12 mb-56">
          <h1 className="text-7xl md:text-[130px] font-black tracking-[-0.08em] leading-[0.75] text-zinc-950">
            The library <br />
            <span className="text-zinc-500">for the best.</span>
          </h1>

          <p className="text-2xl text-zinc-500 font-medium max-w-xl mx-auto leading-relaxed">
            A specialized analytics suite for competitive Brawl Stars players.
          </p>

          <div className="relative max-w-xl mx-auto pt-10">
            <div className="flex items-center p-2 bg-white border border-zinc-200 rounded-[32px] shadow-xl shadow-zinc-200/50 focus-within:border-black transition-all">
              <span className="pl-6 pr-2 text-zinc-400 font-black text-2xl">#</span>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="PLAYER TAG"
                className="flex-1 py-5 text-xl font-black outline-none placeholder:text-zinc-300 uppercase tracking-tighter"
              />
              <button
                onClick={handleSearch}
                className="bg-zinc-950 text-white px-10 py-5 rounded-[26px] font-black text-xs uppercase tracking-widest hover:bg-black transition-all"
              >
                Search
              </button>
            </div>
          </div>
        </section>

        {/* FEATURE CARDS */}
        <section ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">

          {/* Brawlers */}
          <div className="feature-card m-card bg-white p-14 min-h-[550px] flex flex-col justify-between group opacity-0">
            <div className="space-y-8">
              <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center border border-zinc-100">
                <Swords size={28} />
              </div>
              <h3 className="text-4xl font-black tracking-tight">Brawlers</h3>
              <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                Browse every brawler — stats, star powers, gadgets, and hyper charges all in one place.
              </p>
            </div>
            <div className="text-zinc-100 font-black text-[120px] leading-none select-none group-hover:text-zinc-950 transition-colors duration-700">01</div>
          </div>

          {/* Meta */}
          <div className="feature-card m-card bg-zinc-950 text-white p-14 min-h-[550px] flex flex-col justify-between group opacity-0">
            <div className="space-y-8">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                <TrendingUp size={28} className="text-white" />
              </div>
              <h3 className="text-4xl font-black tracking-tight">Meta</h3>
              <p className="text-zinc-300 text-lg font-medium leading-relaxed">
                See which brawlers are dominating right now. Win rates and pick rates updated from live matches.
              </p>
            </div>
            <div className="text-white/10 font-black text-[120px] leading-none select-none group-hover:text-white/20 transition-colors duration-700">02</div>
          </div>

          {/* Leaderboards */}
          <div className="feature-card m-card bg-white p-14 min-h-[550px] flex flex-col justify-between group opacity-0">
            <div className="space-y-8">
              <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center border border-zinc-100">
                <Trophy size={28} />
              </div>
              <h3 className="text-4xl font-black tracking-tight">Leaderboards</h3>
              <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                Track the top players globally and by brawler. See who's pushing trophies at the highest level.
              </p>
            </div>
            <div className="text-zinc-100 font-black text-[120px] leading-none select-none group-hover:text-zinc-950 transition-colors duration-700">03</div>
          </div>

        </section>
      </div>
    </main>
  )
}
