export default function About() {
    return (
        <div className = "max-w-[1200px] mx-auto px-6 py-10 lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
            <aside className = "sticky top-20 hidden lg:block border-r border-white/6">
                <nav className = "flex flex-col gap-4 text-sm text-white/50">
                    <a href="#privacy-policy" className = "hover:text-white/80 transition-colors">Privacy Policy</a>
                    <a href="#contact" className = "hover:text-white/80 transition-colors">Contact</a>
                </nav>
            </aside>
            <main>
                <section id = "privacy-policy">

                </section>
                <section id = "contact">
                    
                </section>
            </main>
        </div>
        
    )
}