"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Footer() {
    const pathname = usePathname()
    if (pathname !== "/") return null

    return (
        <footer className="relative z-10 w-full border-t border-zinc-200/60 bg-white/70 backdrop-blur-xl">
            <div className="px-8 py-4 flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-900">© 2025 BrawlLens. All rights reserved.</p>
                <div className="flex items-center divide-x divide-black/10 border border-black/10 rounded-xl overflow-hidden">
                    <Link href="/about?section=privacy-policy" className="text-xs font-bold tracking-tight transition-all duration-200 px-4 py-2 text-zinc-500 hover:text-zinc-900 hover:bg-black/5">
                        Privacy Policy
                    </Link>
                    <Link href="/about?section=contact" className="text-xs font-bold tracking-tight transition-all duration-200 px-4 py-2 text-zinc-500 hover:text-zinc-900 hover:bg-black/5">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    )
}
