"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, useMotionValue, useSpring } from "framer-motion"
import FluidBackground from "@/components/FluidBackground"

const marqueeItems = [
  "Real-time Stats",
  "80+ Brawlers",
  "No Account Required",
  "Live Rankings",
  "Free Forever",
  "Brawl Stars API",
  "All Rarities",
  "Trophy Tracking",
]

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const slideUp = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
}

export default function Home() {
  const [userInput, setUserInput] = useState("")
  const router = useRouter()

  // 1. Mouse Position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 2. Create a "Trail" of springs with increasing heaviness
  // Each spring is slightly slower than the one before it
  const springConfig1 = { damping: 25, stiffness: 120 }
  const springConfig2 = { damping: 30, stiffness: 80 }
  const springConfig3 = { damping: 40, stiffness: 50 }
  const springConfig4 = { damping: 50, stiffness: 30 }

  const trail1X = useSpring(mouseX, springConfig1)
  const trail1Y = useSpring(mouseY, springConfig1)
  
  const trail2X = useSpring(mouseX, springConfig2)
  const trail2Y = useSpring(mouseY, springConfig2)
  
  const trail3X = useSpring(mouseX, springConfig3)
  const trail3Y = useSpring(mouseY, springConfig3)

  const trail4X = useSpring(mouseX, springConfig4)
  const trail4Y = useSpring(mouseY, springConfig4)

  useEffect(() => {
    document.body.classList.add("home-page")
    return () => document.body.classList.remove("home-page")
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  function handleSearch() {
    const tag = userInput.trim().replace(/^#/, "")
    if (tag) router.push(`/player/${tag}`)
  }

  return (
    <main className="flex-1 flex flex-col relative overflow-hidden">

      <FluidBackground />

      {/* Cursor trail blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          style={{ x: trail4X, y: trail4Y, translateX: "-50%", translateY: "-50%" }}
          className="absolute w-[600px] h-[600px] rounded-full bg-white/40 blur-[100px]"
        />
        <motion.div
          style={{ x: trail3X, y: trail3Y, translateX: "-50%", translateY: "-50%" }}
          className="absolute w-[500px] h-[500px] rounded-full bg-white/60 blur-[75px]"
        />
        <motion.div
          style={{ x: trail2X, y: trail2Y, translateX: "-50%", translateY: "-50%" }}
          className="absolute w-[380px] h-[380px] rounded-full bg-white/80 blur-[50px]"
        />
        <motion.div
          style={{ x: trail1X, y: trail1Y, translateX: "-50%", translateY: "-50%" }}
          className="absolute w-[260px] h-[260px] rounded-full bg-white blur-[30px]"
        />
      </div>

      {/* CONTENT LAYER */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <div className="w-full max-w-[640px] mx-auto text-center">

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/50 bg-white/40 backdrop-blur-md mb-10 shadow-sm"
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
              Live · Brawl Stars API
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="mb-8">
            {["Master the", "Arena."].map((line, i) => (
              <div key={i} className="overflow-hidden leading-none">
                <motion.h1
                  variants={slideUp}
                  className="text-[72px] sm:text-[96px] md:text-[118px] font-black tracking-tighter text-zinc-950 leading-[0.88] block"
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-zinc-500 text-base sm:text-lg font-medium leading-relaxed max-w-sm mx-auto mb-10"
          >
            Real-time stats and brawler analysis for competitive Brawl Stars players.
          </motion.p>

          {/* Search container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="group flex items-center bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-xl shadow-indigo-500/5 focus-within:border-zinc-400 focus-within:bg-white transition-all">
              <span className="text-zinc-400 font-black text-lg sm:text-xl mr-2 shrink-0">#</span>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Enter player tag"
                className="flex-1 min-w-0 bg-transparent py-1.5 sm:py-2 text-base sm:text-xl font-bold outline-none text-zinc-950 placeholder:text-zinc-300 tracking-tight"
              />
              <button
                onClick={handleSearch}
                className="bg-zinc-950 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-black active:scale-95 transition-all shrink-0"
              >
                Search
              </button>
            </div>
            <p className="mt-4 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] text-center">
              Tap your profile icon in-game to find your tag
            </p>
          </motion.div>

        </div>
      </section>

      {/* Marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative z-10 border-t border-white/50 overflow-hidden py-4 bg-white/20 backdrop-blur-lg"
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white/60 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/60 to-transparent z-10" />

        <div className="marquee-outer flex">
          <div className="marquee-inner flex items-center gap-10 shrink-0">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0">
                <div className="w-1 h-1 rounded-full bg-zinc-300" />
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400 whitespace-nowrap">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </main>
  )
}