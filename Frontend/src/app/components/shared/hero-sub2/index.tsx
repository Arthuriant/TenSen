"use client"; // Wajib ditambahkan karena kita menggunakan hooks (useEffect, useState)

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const HeroSub2 = () => {
    const [animationData, setAnimationData] = useState(null);

    // Mengambil file JSON dari folder public
    useEffect(() => {
        fetch("/Animation/BookAnim.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Gagal memuat animasi");
                }
                return response.json();
            })
            .then((data) => setAnimationData(data))
            .catch((error) => console.error("Error loading Lottie:", error));
    }, []);

    return (
        <section className="flex items-center justify-center min-h-[400px] bg-cover pt-20 pb-5 relative bg-gradient-to-b from-white from-10% dark:from-darkmode to-[#F5F5F5] to-90% dark:to-darklight overflow-x-hidden">
            
            {/* Container untuk membatasi ukuran animasi */}
            <div className="w-full max-w-xs px-4" data-aos="fade-up">
                {animationData ? (
                    <Lottie 
                        animationData={animationData} 
                        loop={true} 
                        autoplay={true} 
                        className="w-full h-auto drop-shadow-xl" // Styling tambahan agar lebih bagus
                    />
                ) : (
                    // Loading state sederhana jika animasi belum termuat (opsional)
                    <div className="w-full h-64 flex items-center justify-center animate-pulse">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    </div>
                )}
            </div>

        </section>
    );
};

export default HeroSub2;