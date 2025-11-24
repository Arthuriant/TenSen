"use client";

export const Modus = () => {
  return (
    <div id="modus" className="scroll-m-28 md:scroll-m-[180px] mt-10">
    <div className="bg-white dark:bg-semidark rounded-xl shadow-lg p-4 md:p-6">
      {/* Judul Modus */}
      <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
        Apa Itu Modus?
      </h2>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        <b>Modus</b> adalah nilai yang paling sering muncul dalam suatu kumpulan data.
        Modus digunakan untuk menggambarkan nilai yang paling dominan atau paling
        banyak terjadi.
      </p>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        Modus sangat berguna untuk data kategorik atau data yang memiliki nilai
        tertentu yang muncul berulang kali, dan tidak terpengaruh oleh nilai ekstrem
        seperti mean.
      </p>

      {/* -------------------------------------------------------------------------------- */}
      {/* MODUS DATA TUNGGAL */}
      {/* -------------------------------------------------------------------------------- */}
      <h3 className="text-2xl font-bold text-black dark:text-white mt-8 mb-3">
        Modus pada Data Tunggal
      </h3>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Pada data tunggal, modus adalah nilai yang frekuensinya paling banyak.
      </p>

      <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
        Rumus Modus Data Tunggal
      </h4>

      <div className="bg-gray-100 dark:bg-darkmode p-4 rounded-md mb-4">
        <p className="text-base text-black dark:text-white font-mono">
          Modus = nilai dengan frekuensi tertinggi
        </p>
      </div>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Jika ada dua nilai yang muncul dengan frekuensi sama dan tertinggi, data
        tersebut disebut <b>bimodal</b>.  
        Jika lebih dari dua, disebut <b>multimodal</b>.
      </p>

      {/* -------------------------------------------------------------------------------- */}
      {/* MODUS DATA KELOMPOK */}
      {/* -------------------------------------------------------------------------------- */}
      <h3 className="text-2xl font-bold text-black dark:text-white mt-8 mb-3">
        Modus pada Data Kelompok
      </h3>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Modus untuk data berkelompok digunakan untuk mencari nilai pada kelas modal
        (kelas dengan frekuensi tertinggi) menggunakan pendekatan rumus.
      </p>

      <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
        Rumus Modus Data Kelompok
      </h4>

      <div className="bg-gray-100 dark:bg-darkmode p-4 rounded-md mb-4">
        <p className="text-base text-black dark:text-white font-mono">
          Modus = L + {"(( (f1 - f0) / ((2f1 - f0 - f2)) )"} * i)
        </p>
      </div>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Keterangan variabel:
      </p>

      <ul className="list-disc ml-6 text-base text-midnight_text dark:text-gray mb-4">
        <li>
          <b>L</b> = batas bawah kelas modal (kelas dengan frekuensi terbesar)
        </li>
        <li>
          <b>f1</b> = frekuensi kelas modal
        </li>
        <li>
          <b>f0</b> = frekuensi kelas sebelum kelas modal
        </li>
        <li>
          <b>f2</b> = frekuensi kelas setelah kelas modal
        </li>
        <li>
          <b>i</b> = panjang kelas
        </li>
      </ul>

      <p className="text-base text-midnight_text dark:text-gray">
        Rumus ini digunakan untuk memperkirakan nilai modus secara lebih akurat,
        khususnya ketika data disajikan dalam bentuk interval kelas.
      </p>
    </div>
    </div>
  );
};