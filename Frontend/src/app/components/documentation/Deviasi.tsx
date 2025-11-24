"use client";

export const Deviasi = () => {
  return (
    <div id="deviasi" className="scroll-m-28 md:scroll-m-[180px] mt-10">
    <div className="bg-white dark:bg-semidark rounded-xl shadow-lg p-4 md:p-6">
      {/* Judul Deviasi */}
      <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
        Apa Itu Deviasi Standar?
      </h2>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        <b>Deviasi standar</b> adalah ukuran yang menunjukkan seberapa jauh data
        menyimpang dari rata-ratanya. Deviasi standar merupakan akar kuadrat dari varian.
      </p>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        Semakin kecil deviasi standar, semakin dekat data terhadap mean.
      </p>

      {/* -------------------------------------------------------------------------------- */}
      {/* DEVIASI DATA TUNGGAL */}
      {/* -------------------------------------------------------------------------------- */}
      <h3 className="text-2xl font-bold text-black dark:text-white mt-8 mb-3">
        Deviasi Standar pada Data Tunggal
      </h3>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Deviasi standar untuk data tunggal dihitung dengan mengambil akar dari varian.
      </p>

      <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
        Rumus Deviasi Standar Data Tunggal
      </h4>

      <div className="bg-gray-100 dark:bg-darkmode p-4 rounded-md mb-4">
        <p className="text-base text-black dark:text-white font-mono">
          σ = √( Σ (x - x̄)² / n )
        </p>
      </div>

      {/* -------------------------------------------------------------------------------- */}
      {/* DEVIASI DATA KELOMPOK */}
      {/* -------------------------------------------------------------------------------- */}
      <h3 className="text-2xl font-bold text-black dark:text-white mt-8 mb-3">
        Deviasi Standar pada Data Kelompok
      </h3>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Pada data berkelompok, deviasi standar dihitung dari nilai tengah kelas dan frekuensinya.
      </p>

      <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
        Rumus Deviasi Standar Data Kelompok
      </h4>

      <div className="bg-gray-100 dark:bg-darkmode p-4 rounded-md mb-4">
        <p className="text-base text-black dark:text-white font-mono">
          σ = √( Σ f (xᵢ - x̄)² / Σf )
        </p>
      </div>

      <p className="text-base text-midnight_text dark:text-gray">
        Deviasi standar memberikan informasi penyebaran data yang lebih rinci dibandingkan varian.
      </p>
    </div>
    </div>
  );
};