"use client";

export const Kuartil = () => {
  return (
    <div id="kuartil" className="scroll-m-28 md:scroll-m-[180px] mt-10">
      {/* Judul Kuartil */}
      <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
        Apa Itu Kuartil?
      </h2>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        <b>Kuartil</b> adalah ukuran pemusatan data yang membagi data menjadi empat bagian sama besar.
        Kuartil menunjukkan posisi data dalam distribusi.
      </p>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        Terdapat tiga kuartil utama:  
        <b>Q1</b> (kuartil bawah), <b>Q2</b> (median), dan <b>Q3</b> (kuartil atas).
      </p>

      {/* -------------------------------------------------------------------------------- */}
      {/* KUARTIL DATA TUNGGAL */}
      {/* -------------------------------------------------------------------------------- */}
      <h3 className="text-2xl font-bold text-black dark:text-white mt-8 mb-3">
        Kuartil pada Data Tunggal
      </h3>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Rumus kuartil untuk data tunggal menggunakan posisi data setelah diurutkan.
      </p>

      <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
        Rumus Kuartil Data Tunggal
      </h4>

      <pre className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md text-sm mb-4 whitespace-pre-wrap">
        Qk = (k (n + 1)) / 4
      </pre>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Keterangan:
      </p>

      <ul className="list-disc ml-6 text-base text-midnight_text dark:text-gray mb-4">
        <li><b>k</b> = kuartil ke-1, ke-2, atau ke-3</li>
        <li><b>n</b> = jumlah data</li>
      </ul>

      {/* -------------------------------------------------------------------------------- */}
      {/* KUARTIL DATA KELOMPOK */}
      {/* -------------------------------------------------------------------------------- */}
      <h3 className="text-2xl font-bold text-black dark:text-white mt-8 mb-3">
        Kuartil pada Data Kelompok
      </h3>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Pada data berkelompok, kuartil dihitung menggunakan interval kelas.
      </p>

      <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
        Rumus Kuartil Data Kelompok
      </h4>

      <pre className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md text-sm mb-4 whitespace-pre-wrap">
{`Qk = L + (( (k * N/4) - F ) / f ) * i`}
      </pre>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Keterangan variabel:
      </p>

      <ul className="list-disc ml-6 text-base text-midnight_text dark:text-gray mb-4">
        <li><b>L</b> = batas bawah kelas kuartil</li>
        <li><b>N</b> = jumlah total frekuensi</li>
        <li><b>F</b> = frekuensi kumulatif sebelum kelas kuartil</li>
        <li><b>f</b> = frekuensi kelas kuartil</li>
        <li><b>i</b> = panjang kelas</li>
      </ul>

      <p className="text-base text-midnight_text dark:text-gray">
        Kuartil membantu memahami penyebaran data dan posisi relatif dalam distribusi.
      </p>
    </div>
  );
};
