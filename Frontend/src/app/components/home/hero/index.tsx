"use client";
import { useState } from "react";
import { useRouter  } from "next/navigation";
import Link from "next/link";

const Hero = () => {

  const router = useRouter();



  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#D6465C] min-h-[400px] md:min-h-[500px] flex items-center justify-center px-4">
      
      <div className="container mx-auto relative z-10 text-center flex flex-col items-center">
        
        {/* JUDUL UTAMA */}
        <h1 
          className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-10 tracking-wide drop-shadow-md leading-tight"
          data-aos="fade-up"
        >
          Hitung Tendensi Sentral Sekarang!
        </h1>
        <p 
          className="text-white/90 text-base md:text-lg mb-10 max-w-2xl font-medium"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Analisis data statistikmu dengan cepat dan akurat. Dapatkan hasil Mean, Median, Modus, hingga Grafik visualisasi dalam hitungan detik.
        </p>
        <div 
          className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          
          {/* 1. TOMBOL UTAMA (Mulai Hitung) - Style: White Solid */}
          <Link
            href="/kalkulator"
            className="group relative px-8 py-3.5 bg-white text-[#D6465C] font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 w-full sm:w-auto min-w-[180px] flex items-center justify-center gap-2"
          >
            {/* Icon Calculator */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2"></rect>
              <line x1="8" y1="6" x2="16" y2="6"></line>
              <line x1="16" y1="14" x2="16" y2="14"></line>
              <line x1="12" y1="14" x2="12" y2="14"></line>
              <line x1="8" y1="14" x2="8" y2="14"></line>
              <line x1="16" y1="18" x2="16" y2="18"></line>
              <line x1="12" y1="18" x2="12" y2="18"></line>
              <line x1="8" y1="18" x2="8" y2="18"></line>
            </svg>
            Mulai Hitung
          </Link>

          {/* 2. TOMBOL KEDUA (Dokumentasi/Pelajari) - Style: White Outline */}
          <Link 
            href="/documentation"
            className="group px-8 py-3.5 border-2 border-white/40 hover:border-white text-white font-semibold text-lg rounded-full transition-all duration-300 hover:bg-white/10 w-full sm:w-auto min-w-[180px] flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            {/* Icon Book/Docs */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            Pelajari Materi
          </Link>

        </div>


      </div>
    </section>
  );
};

export default Hero;