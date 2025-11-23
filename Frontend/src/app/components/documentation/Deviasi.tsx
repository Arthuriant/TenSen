"use client";

export const Deviasi = () => {
  return (
    <div id="deviasi" className="scroll-m-28 md:scroll-m-[180px] mt-10">
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

      <pre className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md text-sm mb-4 whitespace-pre-wrap">
        σ = √( Σ (x - x̄)² / n )
      </pre>

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

      <pre className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md text-sm mb-4 whitespace-pre-wrap">
        σ = √( Σ f (xᵢ - x̄)² / Σf )
      </pre>

      <p className="text-base text-midnight_text dark:text-gray">
        Deviasi standar memberikan informasi penyebaran data yang lebih rinci dibandingkan varian.
      </p>
    </div>
  );
};
