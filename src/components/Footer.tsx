"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Footer() {
    const pathname = usePathname()
    if (pathname !== "/") return null

    return (
        <footer className="relative z-10">
            <div className="h-[52px] grid grid-cols-3 items-center px-4 md:px-6">
                <p className="hidden sm:block text-xs font-medium text-zinc-600">© 2025 BrawlLens</p>
                <div className="hidden sm:block" />
                <div className="flex items-center justify-end gap-1">
                    <Link href="/about?section=privacy-policy" className="text-xs font-bold text-zinc-600 hover:text-black transition-colors px-3 py-1.5 rounded hover:bg-black/5">
                        Privacy Policy
                    </Link>
                    <Link href="/about?section=contact" className="text-xs font-bold text-zinc-600 hover:text-black transition-colors px-3 py-1.5 rounded hover:bg-black/5">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    )
}
