import React from 'react';
import Link from 'next/link';

export default function NavigationCard() {
    return (
        <section className="px-4 md:px-0 bg-[#F5F5F5] dark:bg-darkmode py-8 md:py-12">
            <div className="container lg:max-w-screen-xl md:max-w-screen-md px-0 md:px-4 mx-auto">
                
                {/* Card Container */}
                <div 
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row max-w-4xl mx-auto" 
                    data-aos="fade-up"
                >
                    
                    {/* Bagian Atas (Mobile) / Kiri (Desktop): Background Orange & Icon */}
                    {/* UPDATE: min-h disesuaikan agar tidak terlalu tinggi di HP */}
                    <div className="w-full md:w-1/3 bg-[#F2994A] flex items-center justify-center p-8 min-h-[200px] md:min-h-[280px]">
                        
                        {/* --- ICON SVG --- */}
                        {/* UPDATE: Ukuran icon responsif (w-32 di HP, w-40 di Desktop) */}
                        <svg 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            className="w-32 h-32 md:w-40 md:h-40 text-white drop-shadow-md transition-transform duration-300 hover:scale-105"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* 1. Kurva Lonceng */}
                            <path 
                                d="M2 20C2 20 7 20 9 10C10.5 2.5 13.5 2.5 15 10C17 20 22 20 22 20" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />

                            {/* 2. Titik Puncak */}
                            <circle cx="12" cy="5" r="1.5" fill="white" className="animate-bounce" style={{ animationDuration: '3s' }} />

                            {/* 3. Diagram Batang */}
                            <g className="opacity-80">
                                <rect x="6" y="14" width="3" height="6" rx="0.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '0s' }} />
                                <rect x="10.5" y="9" width="3" height="11" rx="0.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                                <rect x="15" y="14" width="3" height="6" rx="0.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '1s' }} />
                            </g>

                            {/* Garis Dasar */}
                            <path d="M2 21H22" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round"/>
                        </svg>
                        {/* --- AKHIR ICON --- */}

                    </div>

                    {/* Bagian Bawah (Mobile) / Kanan (Desktop): Konten Teks */}
                    {/* UPDATE: Text align center di HP, left di Desktop. Padding disesuaikan. */}
                    <div className="w-full md:w-2/3 p-6 md:p-10 flex flex-col justify-center text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-3 md:mb-4">
                            Tendensi Sentral
                        </h3>
                        
                        <p className="text-gray-500 dark:text-gray-300 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">
                            Pahami karakteristik data Anda melalui analisis tendensi sentral. Temukan nilai rata-rata, nilai tengah, dan frekuensi data tertinggi untuk mendapatkan wawasan statistik yang mendalam.
                        </p>

                        {/* Tombol: Center di HP, Start (Kiri) di Desktop */}
                        <div className='flex justify-center md:justify-start'>
                            <Link 
                                href="/kalkulator" 
                                className="inline-block bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 uppercase tracking-wider text-xs md:text-sm shadow-md hover:shadow-lg"
                            >
                                Pelajari Selengkapnya
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}