"use client";
import { useState } from "react";

const Hero = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (inputValue.trim()) {
      console.log("Searching for:", inputValue);
      // Tambahkan logika redirect atau proses hitung di sini nantinya
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#D6465C] min-h-[400px] md:min-h-[500px] flex items-center justify-center px-4">
      
      <div className="container mx-auto relative z-10 text-center">
        
        {/* JUDUL UTAMA */}
        <h1 
          className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-10 tracking-wide drop-shadow-md leading-tight"
          data-aos="fade-up"
        >
          Hitung Tendensi Sentral Sekarang!
        </h1>

        {/* WRAPPER INPUT PENCARIAN */}
        <div 
          className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-1.5 md:p-2 flex flex-row items-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          
          {/* INPUT FIELD */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Masukan Data..."
            className="flex-grow px-3 py-2 md:px-4 md:py-3 text-base md:text-xl text-gray-700 placeholder:text-gray-400 bg-transparent focus:outline-none min-w-0"
          />

          {/* ICONS GROUP (Camera & Keyboard) */}
          {/* Hidden di layar sangat kecil jika perlu, atau perkecil padding */}
          <div className="flex items-center gap-1 md:gap-3 px-1 md:px-3 border-r border-gray-200 mr-1 md:mr-2">
            
            {/* Icon Camera */}
            <button className="p-1.5 md:p-2 text-gray-400 hover:text-[#D6465C] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </button>

            {/* Icon Keyboard */}
            <button className="p-1.5 md:p-2 text-gray-400 hover:text-[#D6465C] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                <path d="M6 8h.001"></path>
                <path d="M10 8h.001"></path>
                <path d="M14 8h.001"></path>
                <path d="M18 8h.001"></path>
                <path d="M6 12h.001"></path>
                <path d="M10 12h.001"></path>
                <path d="M14 12h.001"></path>
                <path d="M18 12h.001"></path>
                <path d="M7 16h10"></path>
              </svg>
            </button>
          </div>

          {/* TOMBOL GO */}
          <button 
            onClick={handleSearch}
            className="bg-[#FF5A75] hover:bg-[#e04860] active:scale-95 text-white text-lg md:text-xl font-bold py-2 px-5 md:py-3 md:px-8 rounded-lg transition-all duration-200 shadow-md min-w-[70px] md:min-w-[100px]"
          >
            Go
          </button>

        </div>
      </div>
    </section>
  );
};

export default Hero;