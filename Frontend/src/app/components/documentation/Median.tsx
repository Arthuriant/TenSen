"use client";

export const Median = () => {
  return (
    <div id="median" className="scroll-m-28 md:scroll-m-[180px] mt-10">
    <div className="bg-white dark:bg-semidark rounded-xl shadow-lg p-4 md:p-6">
      {/* Judul Median */}  
      <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
        Apa Itu Median?
      </h2>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        <b>Median</b> adalah nilai tengah dari suatu data yang telah diurutkan.
        Median membagi data menjadi dua bagian yang sama besar: 50% data berada
        di bawahnya dan 50% berada di atasnya.
      </p>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        Median sangat berguna ketika data memiliki nilai ekstrim (outlier), karena
        median tidak terpengaruh secara signifikan oleh nilai yang sangat besar atau
        sangat kecil.
      </p>

      {/* -------------------------------------------------------------------------------- */}
      {/* MEDIAN DATA TUNGGAL */}
      {/* -------------------------------------------------------------------------------- */}
      <h3 className="text-2xl font-bold text-black dark:text-white mt-8 mb-3">
        Median pada Data Tunggal
      </h3>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Pada data tunggal, median ditentukan berdasarkan jumlah data (<b>n</b>) dan
        letak posisi data tengah setelah diurutkan.
      </p>

      <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
        Rumus Median Data Tunggal
      </h4>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        Jika jumlah data <b>n</b> ganjil:
      </p>

      <div className="bg-gray-100 dark:bg-darkmode p-4 rounded-md mb-4">
        <p className="text-base text-black dark:text-white font-mono">
          Median = x<sub>(n+1)/2</sub>
        </p>
      </div>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        Jika jumlah data <b>n</b> genap:
      </p>

      <div className="bg-gray-100 dark:bg-darkmode p-4 rounded-md mb-4">
        <p className="text-base text-black dark:text-white font-mono">
          Median = (x<sub>n/2</sub> + x<sub>(n/2)+1</sub>) / 2
        </p>
      </div>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Rumus ini digunakan dengan mengambil data urutan ke tengah berdasarkan
        jumlah data setelah diurutkan.
      </p>

      {/* -------------------------------------------------------------------------------- */}
      {/* MEDIAN DATA KELOMPOK */}
      {/* -------------------------------------------------------------------------------- */}
      <h3 className="text-2xl font-bold text-black dark:text-white mt-8 mb-3">
        Median pada Data Kelompok
      </h3>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Median pada data kelompok digunakan ketika data berbentuk tabel distribusi
        frekuensi. Rumus median memperkirakan letak nilai tengah dalam kelas median.
      </p>

      <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
        Rumus Median Data Kelompok
      </h4>

      <div className="bg-gray-100 dark:bg-darkmode p-4 rounded-md mb-4">
        <p className="text-base text-black dark:text-white font-mono">
          Median = L + {"(( (n/2 - Fk) / f )"} * i)
        </p>
      </div>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Penjelasan variabel:
      </p>

      <ul className="list-disc ml-6 text-base text-midnight_text dark:text-gray mb-4">
        <li>
          <b>L</b> = batas bawah kelas median
        </li>
        <li>
          <b>n</b> = jumlah seluruh frekuensi
        </li>
        <li>
          <b>Fk</b> = frekuensi kumulatif sebelum kelas median
        </li>
        <li>
          <b>f</b> = frekuensi kelas median
        </li>
        <li>
          <b>i</b> = panjang kelas
        </li>
      </ul>

      <p className="text-base text-midnight_text dark:text-gray mt-6">
        Rumus ini digunakan untuk memperkirakan nilai tengah berdasarkan distribusi
        kelas frekuensi sehingga cocok untuk data dalam skala besar.
      </p>
    </div>
    </div>
  );
};