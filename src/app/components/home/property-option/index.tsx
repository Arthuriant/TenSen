'use client';

const cardData = [
    {
        id: 1,
        title: "TenSen Kalkulator",
        description: "Hitung nilai tendensi sentral dengan cepat dan akurat",
        bgColor: "bg-[#00239C]",
        // --- ICON KALKULATOR (LOOP) ---
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-32 h-32 text-white drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
                {/* Body Kalkulator */}
                <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" fillOpacity="0" />
                <path d="M6 5H18C18.55 5 19 5.45 19 6V8C19 8.55 18.55 9 18 9H6C5.45 9 5 8.55 5 8V6C5 5.45 5.45 5 6 5Z" fill="white" />
                
                {/* Layar (Berkedip pelan) */}
                <rect x="7" y="6" width="10" height="2" fill="#00239C" className="animate-pulse opacity-30" />

                {/* Tombol-tombol (Bergerak Loop) */}
                <g>
                    {/* Baris 1 */}
                    <rect x="5" y="11" width="4" height="4" rx="1" fill="white" className="animate-press" style={{ animationDelay: '0s' }} />
                    <rect x="10" y="11" width="4" height="4" rx="1" fill="white" className="animate-press" style={{ animationDelay: '0.2s' }} />
                    {/* Tombol Enter (Merah) */}
                    <rect x="15" y="11" width="4" height="9" rx="1" fill="#FF6B81" className="animate-press" style={{ animationDelay: '0.4s' }} />
                    
                    {/* Baris 2 */}
                    <rect x="5" y="16" width="4" height="4" rx="1" fill="white" className="animate-press" style={{ animationDelay: '0.3s' }} />
                    <rect x="10" y="16" width="4" height="4" rx="1" fill="white" className="animate-press" style={{ animationDelay: '0.5s' }} />
                </g>
            </svg>
        )
    },
    {
        id: 2,
        title: "Solusi",
        description: "Dapatkan langkah-langkah penyelesaian yang detail dan mudah dipahami.",
        bgColor: "bg-[#B02E40]",
        // --- ICON SOLUSI (LOOP) ---
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-32 h-32 text-white drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
                {/* Kertas Belakang */}
                <rect x="4" y="4" width="16" height="4" rx="1" fill="white" fillOpacity="0.3" className="translate-x-1" />
                
                {/* Kertas Depan */}
                <rect x="4" y="4" width="10" height="4" rx="1" fill="white" />
                <rect x="15" y="4" width="5" height="4" rx="1" fill="#FF6B81" className="animate-pulse" /> 
                
                {/* Body Kertas */}
                <rect x="4" y="10" width="16" height="6" rx="1" fill="white" />
                
                {/* Garis Text (Memanjang Memendek Loop) */}
                {/* Width default diatur via CSS keyframes 'animate-stretch' */}
                <rect x="5" y="11" height="1.5" rx="0.5" fill="#ccc" className="animate-stretch" style={{ animationDelay: '0s' }} />
                <rect x="5" y="13.5" height="1.5" rx="0.5" fill="#ccc" className="animate-stretch" style={{ animationDelay: '0.5s' }} />
                
                {/* Footer Kertas */}
                <rect x="4" y="18" width="16" height="4" rx="1" fill="white" fillOpacity="0.8" />
                <rect x="5" y="19" height="2" rx="0.5" fill="#ccc" className="animate-stretch" style={{ animationDelay: '1s' }} />
            </svg>
        )
    },
    {
        id: 3,
        title: "Grafik",
        description: "Visualisasikan data Anda dengan grafik interaktif yang menarik.",
        bgColor: "bg-[#00C4B4]",
        // --- ICON GRAFIK (LOOP) ---
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-32 h-32 text-white drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
                {/* Frame */}
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="white" strokeWidth="1.5" />
                
                {/* Batang Grafik (Naik Turun Loop) */}
                <rect x="5" y="13" width="3" height="4" rx="0.5" fill="white" className="animate-grow" style={{ animationDelay: '0s' }} />
                <rect x="9" y="11" width="3" height="6" rx="0.5" fill="white" className="animate-grow" style={{ animationDelay: '0.2s' }} />
                <rect x="13" y="9" width="3" height="8" rx="0.5" fill="white" className="animate-grow" style={{ animationDelay: '0.4s' }} />
                <rect x="17" y="7" width="3" height="10" rx="0.5" fill="white" className="animate-grow" style={{ animationDelay: '0.6s' }} />

                {/* Garis Tren (Muncul Hilang Loop) */}
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
        <section className='dark:bg-darkmode py-20'>
            <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4">
                
                {/* JUDUL SECTION */}
                <h2 className="text-center text-4xl font-bold mb-16 text-midnight_text dark:text-white" data-aos="fade-up">
                    TenSen, Penghitung Tendensi Sentral
                </h2>

                {/* GRID CARD */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 lg:px-12">
                    {cardData.map((card, index) => (
                        <div 
                            key={card.id} 
                            className="flex flex-col items-center group cursor-default"
                            data-aos="fade-up" 
                            data-aos-delay={index * 100}
                        >
                            {/* KOTAK WARNA UTAMA */}
                            {/* Tetap pertahankan hover effect pada kotak (naik sedikit saat dihover) agar tetap interaktif */}
                            <div className={`${card.bgColor} w-full aspect-square rounded-2xl shadow-xl flex items-center justify-center p-8 mb-8 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl`}>
                                <div className="transform scale-110">
                                    {card.icon}
                                </div>
                            </div>

                            {/* TEXT CONTENT */}
                            <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-3 text-center">
                                {card.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-center text-sm leading-relaxed px-2">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}