import React from 'react';
import Link from 'next/link';

export default function CentralTendencyCard() {
    return (
        <section className="px-4 md:px-0 bg-[#F5F5F5] dark:bg-darkmode py-10">
            <div className="container lg:max-w-screen-xl md:max-w-screen-md px-4 mx-auto py-12">
                
                {/* Card Container */}
                <div 
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row max-w-4xl mx-auto items-stretch" 
                    data-aos="fade-up"
                >
                    
                    {/* Bagian Kiri: Background Orange & Icon SVG */}
                    <div className="md:w-1/3 bg-[#F2994A] flex items-center justify-center p-8 relative min-h-[250px]">
                        
                        {/* --- MULAI BAGIAN ICON SVG TENDENSI SENTRAL --- */}
                        <svg 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            className="w-40 h-40 text-white drop-shadow-md" // Ukuran diperbesar sedikit agar pas
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* 1. Kurva Lonceng (Bell Curve) */}
                            {/* Menggunakan Path Bezier untuk lengkungan halus */}
                            <path 
                                d="M2 20C2 20 7 20 9 10C10.5 2.5 13.5 2.5 15 10C17 20 22 20 22 20" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />

                            {/* 2. Titik Puncak (Mean/Median/Mode) */}
                            <circle cx="12" cy="5" r="1.5" fill="white" className="animate-bounce" style={{ animationDuration: '3s' }} />

                            {/* 3. Diagram Batang (Histogram) di dalam kurva */}
                            <g className="opacity-80">
                                {/* Batang Kiri */}
                                <rect x="6" y="14" width="3" height="6" rx="0.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '0s' }} />
                                
                                {/* Batang Tengah (Tertinggi) */}
                                <rect x="10.5" y="9" width="3" height="11" rx="0.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                                
                                {/* Batang Kanan */}
                                <rect x="15" y="14" width="3" height="6" rx="0.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '1s' }} />
                            </g>

                            {/* Garis Dasar (X-Axis) - Opsional */}
                            <path d="M2 21H22" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round"/>
                        </svg>
                        {/* --- AKHIR BAGIAN ICON SVG --- */}

                    </div>

                    {/* Bagian Kanan: Konten Teks */}
                    <div className="md:w-2/3 p-8 flex flex-col justify-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
                            Tendensi Sentral
                        </h3>
                        
                        <p className="text-gray-500 dark:text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
                            Pahami karakteristik data Anda melalui analisis tendensi sentral. Temukan nilai rata-rata, nilai tengah, dan frekuensi data tertinggi untuk mendapatkan wawasan statistik yang mendalam.
                        </p>

                        <div className='flex justify-center'>
                            <Link 
                                href="/kalkulator" 
                                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 uppercase tracking-wider text-sm"
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