"use client"
import { createContext, useContext, useState } from "react"

const MenuContext = createContext<{ menuOpen: boolean; setMenuOpen: (open: boolean) => void }>({
  menuOpen: false,
  setMenuOpen: () => {},
})

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => useContext(MenuContext)
