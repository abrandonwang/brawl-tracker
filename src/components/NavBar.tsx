"use client"
import { useState, useEffect } from "react"
import { Search, Command, X, User, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { label: "[ Brawlers ]", href: "/brawlers" },
    { label: "[ Maps ]", href: "/meta" },
    { label: "[ Leaderboards ]", href: "/leaderboards" },
    { label: "[ About ]", href: "/about" },
]

export default function NavBar() {
    const pathname = usePathname()
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    const isDark = pathname !== "/"

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
                isDark ? "bg-black border-b border-white/10" : "bg-white/70 backdrop-blur-xl border-b border-zinc-200/60"
            }`}>
                <header className="h-[72px] flex items-center justify-between px-4 md:px-8">
                    
                    {/* LEFT: Logo & Search */}
                    <div className="flex items-center gap-3 md:gap-4 shrink-0">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
                                <div className={`absolute inset-0 border-[2.5px] rounded-full transition-colors ${isDark ? "border-white" : "border-zinc-900"}`} />
                                <div className={`w-1 h-1 rounded-full transition-colors ${isDark ? "bg-white" : "bg-zinc-900"}`} />
                            </div>
                            <span className={`text-base font-black transition-colors ${isDark ? "text-white" : "text-zinc-900"}`}>
                                BrawlLens
                            </span>
                        </Link>

                        <div className={`h-6 w-[1px] hidden lg:block ${isDark ? "bg-white/10" : "bg-zinc-200"}`} />

                        {/* Search Trigger */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className={`flex items-center justify-center md:justify-start gap-3 p-2 md:px-4 md:py-2 rounded-xl md:rounded-2xl transition-all group ${
                                isDark ? "bg-white/5 hover:bg-white/10" : "bg-white/80 hover:bg-white shadow-sm border border-zinc-100"
                            }`}
                        >
                            <Search size={16} className={isDark ? "text-white/40" : "text-zinc-400"} />
                            <span className={`text-[10px] font-bold uppercase tracking-widest pr-4 hidden md:block ${isDark ? "text-white/60" : "text-zinc-500"}`}>
                                Search...
                            </span>
                            <div className="hidden lg:flex items-center gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
                                <Command size={10} className={isDark ? "text-white" : "text-zinc-900"} />
                                <span className={`text-[9px] font-black ${isDark ? "text-white" : "text-zinc-900"}`}>K</span>
                            </div>
                        </button>
                    </div>

                    {/* RIGHT: Desktop Nav & Mobile Toggle */}
                    <div className="flex items-center gap-2 md:gap-6">
                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = pathname.startsWith(item.href)
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`font-mono whitespace-nowrap text-xs font-bold tracking-tight transition-all duration-200 px-3 py-1.5 rounded-sm ${
                                            isActive
                                                ? (isDark ? "bg-[#FFD400] text-black" : "bg-zinc-900 text-white")
                                                : (isDark ? "text-white/70 hover:text-white hover:bg-white/5" : "text-black/60 hover:text-zinc-950 hover:bg-black/5")
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* User Profile - Hidden on tiny screens to save space, or kept */}
                        <Link
                            href="/player/me"
                            className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-all shrink-0 ${
                                isDark ? "bg-white text-black" : "bg-zinc-900 text-white hover:scale-105 shadow-lg shadow-zinc-900/10"
                            }`}
                        >
                            <User size={16} />
                        </Link>

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-2 lg:hidden transition-colors ${isDark ? "text-white" : "text-zinc-900"}`}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </header>

            </div>

            {/* MOBILE NAV OVERLAY */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[150] lg:hidden" onClick={() => setIsMenuOpen(false)}>
                    <div
                        className={`absolute top-[80px] right-4 w-44 rounded-2xl shadow-2xl border overflow-hidden animate-in zoom-in-95 slide-in-from-top-1 duration-150 ${
                            isDark ? "bg-zinc-900 border-white/10" : "bg-white border-zinc-100 shadow-zinc-200/60"
                        }`}
                        onClick={e => e.stopPropagation()}
                    >
                        <nav className="flex flex-col p-1.5 gap-0.5">
                            {navItems.map((item) => {
                                const isActive = pathname.startsWith(item.href)
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`font-mono text-xs font-bold px-3 py-2.5 rounded-xl transition-all ${
                                            isActive
                                                ? (isDark ? "bg-[#FFD400] text-black" : "bg-zinc-900 text-white")
                                                : (isDark ? "text-white/60 hover:text-white hover:bg-white/5" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50")
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                </div>
            )}

            {/* SPACER (to prevent content jump since navbar is fixed) */}
            <div className="h-[72px]" />

            {/* SEARCH OVERLAY */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-start justify-center pt-[10vh] md:pt-[15vh] px-4 md:px-6">
                    <div className="w-full max-w-xl bg-white rounded-3xl md:rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-5 md:p-8 flex items-center gap-4 md:gap-6 border-b border-zinc-100">
                            <Search className="text-[#FFD400]" size={22} />
                            <input 
                                autoFocus 
                                placeholder="ENTER PLAYER TAG..." 
                                className="flex-1 bg-transparent border-none outline-none text-lg md:text-xl font-black tracking-tight placeholder:text-zinc-200 uppercase w-full" 
                            />
                            <button onClick={() => setIsSearchOpen(false)}>
                                <X size={24} className="text-zinc-300 hover:text-black"/>
                            </button>
                        </div>
                        <div className="p-6 md:p-10 flex flex-col items-center gap-4 bg-zinc-50/50">
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 text-center">Suggested Tags</span>
                            <div className="flex flex-wrap justify-center gap-2">
                                <button className="px-3 py-2 md:px-4 md:py-2 bg-white border border-zinc-100 rounded-xl text-[10px] font-black text-zinc-400 hover:border-[#FFD400] hover:text-zinc-900 transition-all">#GRG0L2G</button>
                                <button className="px-3 py-2 md:px-4 md:py-2 bg-white border border-zinc-100 rounded-xl text-[10px] font-black text-zinc-400 hover:border-[#FFD400] hover:text-zinc-900 transition-all">#2Y09VLLY</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}