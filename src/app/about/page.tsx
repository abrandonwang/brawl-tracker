export default function About() {
    return (
        <div className="max-w-[1200px] mx-auto px-6 py-10 lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
            <aside className="sticky top-20 hidden lg:block border-r border-white/6 pr-6">
                <nav className="flex flex-col gap-4 text-sm text-white/50">
                    <a href="#privacy-policy" className="hover:text-white/80 transition-colors">Privacy Policy</a>
                    <a href="#contact" className="hover:text-white/80 transition-colors">Contact</a>
                </nav>
            </aside>

            <main className="py-2">

                <h1 className="text-4xl font-black text-white mb-10">BrawlLens</h1>

                {/* Privacy Policy */}
                <section id="privacy-policy" className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Privacy Policy</h2>
                    <p className="text-sm text-white/50 leading-relaxed mb-6">
                        This privacy policy has been compiled to better serve those who are concerned with how their Personally Identifiable Information is being used online. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your information.
                    </p>

                    {/* Callout */}
                    <div className="rounded-xl bg-blue-500/10 border-l-4 border-blue-500 px-5 py-4 mb-8">
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Note</p>
                        <p className="text-sm text-white/60 leading-relaxed">
                            BrawlLens does not collect, store, or transmit any personal data to our servers. All player tags are saved locally on your device only.
                        </p>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3">What We Collect</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-8">
                        We do not collect any personal information from visitors. Player tags entered on the site are stored in your browser's local storage and never leave your device.
                    </p>

                    <h3 className="text-lg font-bold text-white mb-3">Cookies</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-8">
                        We use cookies to recognize your browser and remember certain preferences. If you turn cookies off, some features may not function properly.
                    </p>

                    <h3 className="text-lg font-bold text-white mb-3">Third Parties</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-8">
                        We do not share your information with third parties except as necessary to provide our services or comply with legal obligations.
                    </p>

                    <h3 className="text-lg font-bold text-white mb-3">Changes to This Policy</h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                        We may update this policy from time to time. Changes will be posted on this page. Last updated March 2026.
                    </p>
                </section>

                <div className="border-t border-white/6 mb-12" />

                {/* Contact */}
                <section id="contact" className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
                    <p className="text-sm text-white/50 leading-relaxed">
                        Questions or concerns about this policy? Reach us at{" "}
                        <a href="mailto:privacy@brawllens.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                            privacy@brawllens.com
                        </a>
                    </p>
                </section>

            </main>
        </div>
    )
}
