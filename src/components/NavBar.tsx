"use client"

import { usePathname, useRouter } from "next/navigation"
import { User, BarChart2, Trophy, Shield, Layers, Menu, X } from "lucide-react"
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
        <nav className="navbar">
            <div className="navbar-content">
                <Link href="/" className="navbar-title">BrawlLens</Link>

                {/* Desktop nav */}
                <div className="navbar-content-right">
                    {navItems.map(({ label, icon: Icon, activeOn }) => (
                        <button key={label} className={`nav-item ${pathname.startsWith(activeOn) ? "nav-item-active" : ""}`} onClick={() => handleNavClick(label)}>
                            {label === "My Profile" && savedIconId && !iconError
                                ? <img src={`/api/player-icon?id=${savedIconId}`} alt="profile icon" width={20} height={20} className="rounded" onError={() => setIconError(true)} />
                                : <Icon size={16} />}
                            <span>{label}</span>
                        </button>
                    ))}
                </div>

                {/* Mobile hamburger */}
                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="mobile-menu">
                    {navItems.map(({ label, icon: Icon }) => (
                        <button key={label} className="mobile-nav-item" onClick={() => handleMobileNavClick(label)}>
                            {label === "My Profile" && savedIconId && !iconError
                                ? <img src={`/api/player-icon?id=${savedIconId}`} alt="profile icon" width={24} height={24} className="rounded" onError={() => setIconError(true)} />
                                : <Icon size={20} />}
                            <span>{label}</span>
                        </button>
                    ))}
                </div>
            )}
        </nav>
    )
}
