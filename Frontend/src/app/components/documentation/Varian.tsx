"use client";

export const Varian = () => {
  return (
    <div id="varian" className="scroll-m-28 md:scroll-m-[180px] mt-10">
      {/* Judul Varian */}
      <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
        Apa Itu Varian?
      </h2>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        <b>Varian</b> adalah ukuran yang menunjukkan seberapa jauh data menyebar dari
        nilai rata-ratanya. Varian mengukur rata-rata kuadrat selisih antara data
        dan mean.
      </p>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        Semakin besar nilai varian, semakin besar pula penyebaran datanya.
      </p>

      {/* -------------------------------------------------------------------------------- */}
      {/* VARIAN DATA TUNGGAL */}
      {/* -------------------------------------------------------------------------------- */}
      <h3 className="text-2xl font-bold text-black dark:text-white mt-8 mb-3">
        Varian pada Data Tunggal
      </h3>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Varian pada data tunggal dihitung dengan menentukan selisih setiap data
        terhadap mean, lalu dikuadratkan dan dirata-ratakan.
      </p>

      <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
        Rumus Varian Data Tunggal
      </h4>

      <pre className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md text-sm mb-4 whitespace-pre-wrap">
        σ² = (Σ (x - x̄)²) / n
      </pre>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Keterangan:
      </p>

      <ul className="list-disc ml-6 text-base text-midnight_text dark:text-gray mb-4">
        <li><b>x</b> = nilai data</li>
        <li><b>x̄</b> = mean (rata-rata)</li>
        <li><b>n</b> = jumlah data</li>
        <li><b>σ²</b> = varian</li>
      </ul>

      {/* -------------------------------------------------------------------------------- */}
      {/* VARIAN DATA KELOMPOK */}
      {/* -------------------------------------------------------------------------------- */}
      <h3 className="text-2xl font-bold text-black dark:text-white mt-8 mb-3">
        Varian pada Data Kelompok
      </h3>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Pada data berkelompok, varian dihitung menggunakan nilai tengah setiap kelas
        dan frekuensinya.
      </p>

      <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
        Rumus Varian Data Kelompok
      </h4>

      <pre className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md text-sm mb-4 whitespace-pre-wrap">
        σ² = (Σ f (xᵢ - x̄)²) / Σf
      </pre>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Keterangan:
      </p>

      <ul className="list-disc ml-6 text-base text-midnight_text dark:text-gray mb-4">
        <li><b>xᵢ</b> = nilai tengah kelas</li>
        <li><b>f</b> = frekuensi kelas</li>
        <li><b>x̄</b> = mean data kelompok</li>
      </ul>

      <p className="text-base text-midnight_text dark:text-gray">
        Rumus ini memberikan ukuran penyebaran data berdasarkan kelas interval.
      </p>
    </div>
  );
};
