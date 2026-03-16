"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Footer() {
    const pathname = usePathname()
    const isDark = pathname !== "/"

    return (
        <footer className={`py-20 ${isDark ? "bg-black border-t border-white/5" : "bg-zinc-50"}`}>
            <div className="max-w-[1440px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-10">
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? "text-white" : "text-zinc-950"}`}>
                        BrawlLens
                    </span>
                    <Link
                        href="/about?section=privacy-policy"
                        className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${isDark ? "text-white/30 hover:text-white" : "text-zinc-300 hover:text-black"}`}
                    >
                        Privacy
                    </Link>
                    <Link
                        href="/about?section=contact"
                        className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${isDark ? "text-white/30 hover:text-white" : "text-zinc-300 hover:text-black"}`}
                    >
                        Contact
                    </Link>
                </div>
                <p className={`text-[9px] font-bold uppercase tracking-widest ${isDark ? "text-white/20" : "text-zinc-300"}`}>
                    Fan-made — not affiliated with Supercell.
                </p>
            </div>
        </footer>
    )
}
