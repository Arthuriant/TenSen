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
    // Section dengan background merah (#DB3F59) agar menyatu dengan Navbar
    <section className="relative pt-32 pb-20 bg-[#D6465C] min-h-[500px] flex items-center justify-center">
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        
        {/* JUDUL UTAMA */}
        <h1 
          className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-wide drop-shadow-md"
          data-aos="fade-up"
        >
          Hitung Tendensi Sentral Sekarang!
        </h1>

        {/* WRAPPER INPUT PENCARIAN */}
        <div 
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-2 flex items-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          
          {/* INPUT FIELD */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Masukan Data Anda"
            className="flex-grow px-4 py-3 text-lg md:text-xl text-gray-700 placeholder:text-gray-400 bg-transparent focus:outline-none"
          />

          {/* ICONS GROUP (Camera & Keyboard) */}
          <div className="flex items-center gap-3 px-3 border-r border-gray-200 mr-2">
            
            {/* Icon Camera */}
            <button className="p-2 text-gray-500 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </button>

            {/* Icon Keyboard */}
            <button className="p-2 text-gray-500 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            className="bg-[#FF5A75] hover:bg-[#e04860] text-white text-xl font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg min-w-[100px]"
          >
            Go
          </button>

        </div>
      </div>
    </section>
  );
};

export default Hero;