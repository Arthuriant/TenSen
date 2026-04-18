"use client";

export const TendensiSentral = () => {
  return (    
    <div id="tensen" className="scroll-m-28 md:scroll-m-[180px] mt-10">
      {/* Judul Tendensi Sentral */}
    <div className="bg-white dark:bg-semidark rounded-xl shadow-lg p-4 md:p-6">
      <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
        Apa Itu Tendensi Sentral?
      </h2>

      {/* Penjelasan Tendensi Sentral */}
      <p className="text-base text-midnight_text dark:text-gray mb-3">
        Tendensi sentral adalah ukuran statistik yang digunakan untuk
        menggambarkan nilai tengah atau nilai yang mewakili keseluruhan data.
        Dengan menggunakan tendensi sentral, kita dapat mengetahui di mana
        sebagian besar data berkumpul.
      </p>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        Ada tiga ukuran tendensi sentral yang paling umum digunakan:
      </p>

      <ul className="list-disc ml-6 text-base text-midnight_text dark:text-gray mb-4">
        <li>
          <b>Mean (Rata-rata):</b> hasil total seluruh nilai dibagi jumlah data.
        </li>
        <li>
          <b>Median:</b> nilai tengah setelah data diurutkan.
        </li>
        <li>
          <b>Modus:</b> nilai yang paling sering muncul.
        </li>
      </ul>

      {/* Judul Komponen Pendukung */}
      <h2 className="text-2xl font-semibold text-black dark:text-white mt-8 mb-3">
        Komponen Pendukung dalam Pengolahan Data
      </h2>

      <p className="text-base text-midnight_text dark:text-gray mb-3">
        Selain tendensi sentral, ada beberapa ukuran lain yang membantu memahami
        bagaimana data tersebar. Ukuran ini sangat penting untuk melihat
        konsistensi data, variasi nilai, dan pola penyebaran secara keseluruhan.
      </p>

      {/* Jangkauan */}
      <h3 className="text-xl font-bold text-black dark:text-white mt-6 mb-2">
        1. Jangkauan (Range)
      </h3>
      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Jangkauan adalah selisih antara nilai terbesar dan nilai terkecil dalam
        suatu data. Fungsinya adalah untuk melihat seberapa luas penyebaran
        nilai dalam dataset.
      </p>

      {/* Varian */}
      <h3 className="text-xl font-bold text-black dark:text-white mt-6 mb-2">
        2. Varians
      </h3>
      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Varians adalah ukuran yang menunjukkan seberapa jauh nilai-nilai data
        menyimpang dari rata-ratanya. Semakin besar varians, semakin besar pula
        tingkat variasi atau ketidakteraturan dalam data.
      </p>

      {/* Deviasi Standar */}
      <h3 className="text-xl font-bold text-black dark:text-white mt-6 mb-2">
        3. Deviasi Standar
      </h3>
      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Deviasi standar adalah akar kuadrat dari varians. Ukuran ini lebih mudah
        dipahami karena menggunakan satuan yang sama dengan data aslinya. Fungsi
        utamanya adalah untuk melihat seberapa besar rata-rata penyimpangan nilai
        dari rata-rata keseluruhan.
      </p>

      {/* Kuartil */}
      <h3 className="text-xl font-bold text-black dark:text-white mt-6 mb-2">
        4. Kuartil
      </h3>
      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Kuartil membagi data menjadi empat bagian sama besar. Kuartil membantu
        melihat distribusi dan persebaran data secara lebih rinci, seperti nilai
        bawah, nilai tengah (median), dan nilai atas.
      </p>

      {/* Penutup */}
      <p className="text-base text-midnight_text dark:text-gray mt-6">
        Dengan menggabungkan ukuran tendensi sentral dan komponen pendukung
        seperti jangkauan, varians, deviasi standar, dan kuartil, analisis
        statistik menjadi lebih lengkap. Kombinasi ini membantu memahami pola
        data secara keseluruhan dan membuat keputusan analitis yang lebih akurat.
      </p>
      </div>
    </div>
  );
};