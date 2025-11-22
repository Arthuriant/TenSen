import React from 'react';
import Link from 'next/link';

export default function CentralTendencyCard() {
    return (
        <section className="px-4 md:px-0 bg-[#F5F5F5] dark:bg-darkmode py-8 md:py-12">
            <div className="container lg:max-w-screen-xl md:max-w-screen-md px-0 md:px-4 mx-auto">
                
                {/* Card Container */}
                <div 
                    // UPDATE PENTING: 'flex-col-reverse' membuat gambar (elemen ke-2) naik ke atas di HP
                    // 'md:flex-row' membuat susunan kembali kiri-kanan di Desktop
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col-reverse md:flex-row max-w-4xl mx-auto items-stretch" 
                    data-aos="fade-up"
                >
                    
                    {/* --- BAGIAN 1: TEKS --- */}
                    {/* Di HP: Tampil di BAWAH gambar (karena flex-col-reverse) */}
                    {/* Di Desktop: Tampil di KIRI gambar */}
                    <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
                            Unduh User Guide
                        </h3>
                        
                        {/* Hapus text-end, ganti jadi center di HP dan left di Desktop agar rapi */}
                        <p className="text-gray-500 dark:text-gray-300 text-sm md:text-lg mb-8 leading-relaxed">
                            Bingung saat menggunakan aplikasi? Jangan khawatir. Kami telah menyediakan dokumen panduan praktis yang berisi langkah-langkah detail penggunaan fitur dari awal hingga akhir.
                        </p>

                        {/* Tombol: Center di HP, Kiri di Desktop */}
                        <div className='flex justify-center md:justify-start'>
                            <Link 
                                href="/kalkulator" 
                                className="inline-block bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 uppercase tracking-wider text-xs md:text-sm shadow-md hover:shadow-lg"
                            >
                                Pelajari Selengkapnya
                            </Link>
                        </div>
                    </div>

                    {/* --- BAGIAN 2: GAMBAR/ICON --- */}
                    {/* Di HP: Tampil di ATAS (karena flex-col-reverse) */}
                    {/* Di Desktop: Tampil di KANAN */}
                    <div className="w-full md:w-1/3 bg-blue-500 flex items-center justify-center p-8 relative min-h-[220px] md:min-h-[280px]">
                        
                        {/* Icon SVG Buku Panduan */}
                        <svg 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            // Ukuran diperkecil sedikit di HP (w-32) agar tidak terlalu penuh
                            className="w-32 h-32 md:w-40 md:h-40 text-white drop-shadow-md transform transition-transform duration-500 hover:scale-105"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* 1. Outline Buku Terbuka */}
                            <path 
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                className="opacity-90"
                            />

                            {/* 2. Grafik Kurva Kecil */}
                            <g className="animate-pulse" style={{ animationDuration: '3s' }}>
                                <path 
                                    d="M14 14c0 0 1.5 0 2-3c0.5-3 1.5-3 2-3s1.5 0 2 3c0.5 3 2 3 2 3" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round"
                                />
                                <rect x="15.5" y="14" width="1" height="2" fill="currentColor" />
                                <rect x="17.5" y="12" width="1" height="4" fill="currentColor" />
                                <rect x="19.5" y="14" width="1" height="2" fill="currentColor" />
                            </g>

                            {/* 3. Dekorasi Bookmark */}
                            <path d="M6 9h3M6 12h3M6 15h1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                        </svg>

                    </div>

                </div>
            </div>
        </section>
    );
}