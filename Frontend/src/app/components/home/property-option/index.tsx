'use client';

const cardData = [
    {
        id: 1,
        title: "Kalkulator", // Judul dipersingkat sedikit agar pas di HP
        description: "Hitung nilai tendensi sentral dengan cepat dan akurat",
        bgColor: "bg-[#00239C]",
        // --- ICON KALKULATOR ---
        // UPDATE: Ukuran SVG disesuaikan: w-16 (kecil di HP) -> md:w-32 (besar di Desktop)
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 md:w-32 md:h-32 text-white drop-shadow-lg transition-all duration-300" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" fillOpacity="0" />
                <path d="M6 5H18C18.55 5 19 5.45 19 6V8C19 8.55 18.55 9 18 9H6C5.45 9 5 8.55 5 8V6C5 5.45 5.45 5 6 5Z" fill="white" />
                <rect x="7" y="6" width="10" height="2" fill="#00239C" className="animate-pulse opacity-30" />
                <g>
                    <rect x="5" y="11" width="4" height="4" rx="1" fill="white" className="animate-press" style={{ animationDelay: '0s' }} />
                    <rect x="10" y="11" width="4" height="4" rx="1" fill="white" className="animate-press" style={{ animationDelay: '0.2s' }} />
                    <rect x="15" y="11" width="4" height="9" rx="1" fill="#FF6B81" className="animate-press" style={{ animationDelay: '0.4s' }} />
                    <rect x="5" y="16" width="4" height="4" rx="1" fill="white" className="animate-press" style={{ animationDelay: '0.3s' }} />
                    <rect x="10" y="16" width="4" height="4" rx="1" fill="white" className="animate-press" style={{ animationDelay: '0.5s' }} />
                </g>
            </svg>
        )
    },
    {
        id: 2,
        title: "Solusi",
        description: "Dapatkan langkah-langkah penyelesaian yang detail.",
        bgColor: "bg-[#B02E40]",
        // --- ICON SOLUSI ---
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 md:w-32 md:h-32 text-white drop-shadow-lg transition-all duration-300" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="4" rx="1" fill="white" fillOpacity="0.3" className="translate-x-1" />
                <rect x="4" y="4" width="10" height="4" rx="1" fill="white" />
                <rect x="15" y="4" width="5" height="4" rx="1" fill="#FF6B81" className="animate-pulse" /> 
                <rect x="4" y="10" width="16" height="6" rx="1" fill="white" />
                <rect x="5" y="11" height="1.5" rx="0.5" fill="#ccc" className="animate-stretch" style={{ animationDelay: '0s' }} />
                <rect x="5" y="13.5" height="1.5" rx="0.5" fill="#ccc" className="animate-stretch" style={{ animationDelay: '0.5s' }} />
                <rect x="4" y="18" width="16" height="4" rx="1" fill="white" fillOpacity="0.8" />
                <rect x="5" y="19" height="2" rx="0.5" fill="#ccc" className="animate-stretch" style={{ animationDelay: '1s' }} />
            </svg>
        )
    },
    {
        id: 3,
        title: "Grafik",
        description: "Visualisasikan data Anda dengan grafik interaktif.",
        bgColor: "bg-[#00C4B4]",
        // --- ICON GRAFIK ---
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 md:w-32 md:h-32 text-white drop-shadow-lg transition-all duration-300" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="white" strokeWidth="1.5" />
                <rect x="5" y="13" width="3" height="4" rx="0.5" fill="white" className="animate-grow" style={{ animationDelay: '0s' }} />
                <rect x="9" y="11" width="3" height="6" rx="0.5" fill="white" className="animate-grow" style={{ animationDelay: '0.2s' }} />
                <rect x="13" y="9" width="3" height="8" rx="0.5" fill="white" className="animate-grow" style={{ animationDelay: '0.4s' }} />
                <rect x="17" y="7" width="3" height="10" rx="0.5" fill="white" className="animate-grow" style={{ animationDelay: '0.6s' }} />
                <g className="animate-fade" style={{ animationDelay: '1s' }}>
                    <path d="M5 11L9 7L13 9L18 4" stroke="#FFEB3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="7" r="1.5" fill="#FFEB3B"/>
                    <circle cx="13" cy="9" r="1.5" fill="#FFEB3B"/>
                    <circle cx="18" cy="4" r="1.5" fill="#FFEB3B"/>
                </g>
            </svg>
        )
    }
];

export default function DiscoverProperties() {
    return (
        <section className='dark:bg-darkmode py-10 md:py-20'>
            <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4">
                
                {/* JUDUL SECTION */}
                <h2 className="text-center text-2xl md:text-4xl font-bold mb-8 md:mb-16 text-midnight_text dark:text-white leading-tight" data-aos="fade-up">
                    TenSen, Penghitung Tendensi Sentral
                </h2>

                {/* GRID CARD */}
                {/* UPDATE: grid-cols-2 (Mobile) -> grid-cols-3 (Desktop) */}
                {/* Gap diperkecil (gap-4) agar muat 2 kolom di HP */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 px-0 md:px-12">
                    {cardData.map((card, index) => (
                        <div 
                            key={card.id} 
                            className="flex flex-col items-center group cursor-default w-full"
                            data-aos="fade-up" 
                            data-aos-delay={index * 100}
                        >
                            {/* KOTAK WARNA UTAMA */}
                            {/* UPDATE: Padding dikurangi drastis di mobile (p-4) */}
                            {/* UPDATE: Margin bottom dikurangi (mb-3) */}
                            <div className={`${card.bgColor} w-full aspect-square rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center p-4 md:p-8 mb-3 md:mb-8 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl`}>
                                <div className="transform scale-100 md:scale-110">
                                    {card.icon}
                                </div>
                            </div>

                            {/* TEXT CONTENT */}
                            {/* UPDATE: Font size kecil di HP (text-sm) */}
                            <h3 className="text-sm font-semibold md:text-2xl md:font-bold text-midnight_text dark:text-white mb-0 md:mb-3 text-center">
                                {card.title}
                            </h3>
                            
                            {/* UPDATE: hidden di Mobile, block di Desktop (md:block) */}
                            <p className="hidden md:block text-gray-500 dark:text-gray-400 text-center text-sm leading-relaxed px-2">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}