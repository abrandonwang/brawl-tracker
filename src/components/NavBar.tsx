"use client"

import { usePathname, useRouter } from "next/navigation"
import { User, BarChart2, Trophy, Shield, Layers, Info } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import "./NavBar.css"
import { useMenu } from "../context/MenuContext"

const navItems = [
    { label: "My Profile", icon: User, activeOn: "/player" },
    { label: "Stats", icon: BarChart2, activeOn: "/stats" },
    { label: "Leaderboards", icon: Trophy, activeOn: "/leaderboards" },
    { label: "Brawlers", icon: Shield, activeOn: "/brawlers" },
    { label: "Modes", icon: Layers, activeOn: "/modes" },
    { label: "About", icon: Info, activeOn: "/about" },
]

export default function NavBar() {
    const { menuOpen, setMenuOpen } = useMenu()
    const pathname = usePathname()
    const router = useRouter()
    const [savedTag, setSavedTag] = useState<string | null>(null)
    const [savedIconId, setSavedIconId] = useState<string | null>(null)
    const [iconError, setIconError] = useState(false)

    useEffect(() => {
        function syncFromStorage() {
            const iconId = localStorage.getItem("savedPlayerIconId")
            setSavedTag(localStorage.getItem("savedPlayerTag"))
            setSavedIconId(iconId)
            setIconError(false)
        }
        syncFromStorage()
        window.addEventListener("playerSaved", syncFromStorage)
        return () => window.removeEventListener("playerSaved", syncFromStorage)
    }, [pathname])

    function handleNavClick(label: string) {
        if (label === "My Profile") {
            if (savedTag) {
                router.push(`/player/${savedTag}`)
            } else {
                router.push("/")
            }
        }
    }

    function handleMobileNavClick(label: string) {
        setMenuOpen(false)
        handleNavClick(label)
    }

    return (
        <header className="sticky top-0 z-50 bg-brawl-bg/80 backdrop-blur-md border-b border-white/10 hidden lg:block" data-astro-transition-persist="desktop-header-en">
            <nav className="container-main !overflow-visible">
                <div className="navbar-content">
                    <Link href="/" className="navbar-title">
                        BrawlLens
                    </Link>
                    <div className="navbar-content-right">
                        {navItems.map(({ label, icon: Icon, activeOn }) => {
                            const isActive = pathname.startsWith(activeOn)
                            if (label === "My Profile") {
                                return (
                                    <div key={label} className="flex items-center">
                                        <button
                                            onClick={() => handleNavClick(label)}
                                            className={`nav-item${isActive ? " nav-item-active" : ""}`}
                                        >
                                            {savedIconId && !iconError ? (
                                                <img
                                                    src={`https://cdn.brawlify.com/profile-icons/regular/${savedIconId}.png`}
                                                    alt="Profile"
                                                    width={22}
                                                    height={22}
                                                    style={{ borderRadius: "50%", objectFit: "cover" }}
                                                    onError={() => setIconError(true)}
                                                />
                                            ) : (
                                                <Icon size={20} />
                                            )}
                                            {label}
                                        </button>
                                        <div className="w-px h-6 bg-white/10 mx-2" />
                                    </div>
                                )
                            }
                            return (
                                <Link
                                    key={label}
                                    href={activeOn}
                                    className={`nav-item${isActive ? " nav-item-active" : ""}`}
                                >
                                    <Icon size={20} />
                                    {label}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </nav>
        </header>
    )
}
