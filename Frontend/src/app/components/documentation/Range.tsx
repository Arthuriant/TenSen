"use client";

export const Range = () => {
  return (
    <div id="range" className="scroll-m-28 md:scroll-m-[180px] mt-10">
    <div className="bg-white dark:bg-semidark rounded-xl shadow-lg p-4 md:p-6">
      {/* Judul Range */}
      <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
        Apa Itu Jangkauan (Range)?
      </h2>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        <b>Jangkauan (Range)</b> adalah ukuran statistik yang menggambarkan seberapa 
        jauh penyebaran data dengan menghitung selisih antara nilai maksimum 
        dan nilai minimum dalam suatu kumpulan data.
      </p>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        Jangkauan memberikan informasi dasar mengenai variasi atau penyebaran data, 
        namun sangat sensitif terhadap nilai ekstrem (outlier).
      </p>

      {/* -------------------------------------------------------------------------------- */}
      {/* RANGE DATA TUNGGAL */}
      {/* -------------------------------------------------------------------------------- */}
      <h3 className="text-2xl font-bold text-black dark:text-white mt-8 mb-3">
        Jangkauan pada Data Tunggal
      </h3>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Pada data tunggal, jangkauan dihitung dengan mengurangkan nilai minimum dari 
        nilai maksimum dalam kumpulan data.
      </p>

      <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
        Rumus Jangkauan Data Tunggal
      </h4>

      <div className="bg-gray-100 dark:bg-darkmode p-4 rounded-md mb-4">
        <p className="text-base text-black dark:text-white font-mono">
          Range = X<sub>maks</sub> - X<sub>min</sub>
        </p>
      </div>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Di mana:
      </p>

      <ul className="list-disc ml-6 text-base text-midnight_text dark:text-gray mb-4">
        <li>
          <b>X<sub>maks</sub></b> = nilai terbesar dalam data
        </li>
        <li>
          <b>X<sub>min</sub></b> = nilai terkecil dalam data
        </li>
      </ul>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Rumus ini sangat sederhana dan memberikan gambaran cepat tentang lebar distribusi data.
      </p>

      {/* -------------------------------------------------------------------------------- */}
      {/* RANGE DATA KELOMPOK */}
      {/* -------------------------------------------------------------------------------- */}
      <h3 className="text-2xl font-bold text-black dark:text-white mt-8 mb-3">
        Jangkauan pada Data Kelompok
      </h3>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Pada data berkelompok, jangkauan dihitung dari selisih antara batas atas 
        kelas tertinggi dan batas bawah kelas terendah dalam tabel distribusi frekuensi.
      </p>

      <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
        Rumus Jangkauan Data Kelompok
      </h4>

      <div className="bg-gray-100 dark:bg-darkmode p-4 rounded-md mb-4">
        <p className="text-base text-black dark:text-white font-mono">
          Range = Batas Atas Tertinggi - Batas Bawah Terendah
        </p>
      </div>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Keterangan variabel:
      </p>

      <ul className="list-disc ml-6 text-base text-midnight_text dark:text-gray mb-4">
        <li>
          <b>Batas Atas Tertinggi</b> = batas atas pada kelas interval paling besar
        </li>
        <li>
          <b>Batas Bawah Terendah</b> = batas bawah pada kelas interval paling kecil
        </li>
      </ul>

      <p className="text-base text-midnight_text dark:text-gray">
        Jangkauan pada data kelompok membantu memberikan gambaran lebar distribusi 
        keseluruhan dari data yang disajikan dalam bentuk interval kelas.
      </p>
    </div>
    </div>
  );
};