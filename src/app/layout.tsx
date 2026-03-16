import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { MenuProvider } from "../context/MenuContext"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} selection:bg-black selection:text-white`}>
        <MenuProvider>
          <NavBar/>
          {children}
          
          <Footer />
        </MenuProvider>
      </body>
    </html>
  );
}