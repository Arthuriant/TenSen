"use client";

export const Mean = () => {
  return (
    <div id="mean" className="scroll-m-28 md:scroll-m-[180px] mt-10">
    <div className="bg-white dark:bg-semidark rounded-xl shadow-lg p-4 md:p-6">
      <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
        Mean (Rata-Rata)
      </h2>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Mean atau rata-rata adalah ukuran tendensi sentral yang digunakan untuk
        menggambarkan nilai pusat dari suatu data. Mean dihitung dengan
        membagi total seluruh nilai data dengan jumlah elemen data tersebut.
        Ukuran ini sering digunakan karena memberikan gambaran umum mengenai
        kecenderungan nilai dalam suatu kumpulan data.
      </p>

      {/* DATA TUNGGAL */}
      <h3 className="text-2xl font-semibold text-black dark:text-white mt-6 mb-3">
        Mean untuk Data Tunggal
      </h3>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Data tunggal adalah data yang disajikan dalam bentuk nilai-nilai
        sederhana tanpa pengelompokan. Rumus mean untuk data tunggal adalah:
      </p>

      <div className="bg-gray-100 dark:bg-darkmode p-4 rounded-md mb-4">
        <p className="text-base text-black dark:text-white font-mono">
          𝑥̄ = (Σ𝑥) / 𝑛
        </p>
      </div>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        <b>Keterangan:</b>
      </p>
      <ul className="list-disc ml-6 text-base text-midnight_text dark:text-gray mb-4">
        <li>
          <b>Σ𝑥</b> : jumlah seluruh nilai data
        </li>
        <li>
          <b>n</b> : jumlah data
        </li>
      </ul>

      <p className="text-base text-midnight_text dark:text-gray mb-6">
        Rumus ini digunakan ketika setiap data hanya memiliki satu nilai
        (tidak ada frekuensi atau pengelompokan). Dengan menghitung mean pada
        data tunggal, kita dapat mengetahui nilai rata-rata umum yang mewakili
        seluruh data.
      </p>

      {/* DATA KELOMPOK */}
      <h3 className="text-2xl font-semibold text-black dark:text-white mt-6 mb-3">
        Mean untuk Data Kelompok
      </h3>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        Data kelompok adalah data yang telah diklasifikasikan ke dalam interval
        kelas tertentu dan setiap kelas memiliki frekuensi kemunculan. Rumus mean
        untuk data kelompok menggunakan titik tengah (nilai tengah kelas).
      </p>

      <div className="bg-gray-100 dark:bg-darkmode p-4 rounded-md mb-4">
        <p className="text-base text-black dark:text-white font-mono">
          𝑥̄ = (Σ𝑓𝑖·𝑥𝑖) / Σ𝑓𝑖
        </p>
      </div>

      <p className="text-base text-midnight_text dark:text-gray mb-4">
        <b>Keterangan:</b>
      </p>

      <ul className="list-disc ml-6 text-base text-midnight_text dark:text-gray mb-4">
        <li>
          <b>𝑓𝑖</b> : frekuensi dari kelas ke-i
        </li>
        <li>
          <b>𝑥𝑖</b> : titik tengah (median class) dari kelas ke-i, dihitung dengan:
          <br />
          <span className="font-mono ml-2">𝑥𝑖 = (batas bawah + batas atas) / 2</span>
        </li>
        <li>
          <b>Σ𝑓𝑖·𝑥𝑖</b> : jumlah perkalian titik tengah setiap kelas dengan frekuensinya
        </li>
        <li>
          <b>Σ𝑓𝑖</b> : total frekuensi seluruh kelas
        </li>
      </ul>

      <p className="text-base text-midnight_text dark:text-gray mb-2">
        Rumus ini digunakan ketika data berada dalam bentuk tabel distribusi
        frekuensi. Karena nilai data tidak diketahui satu per satu, maka digunakan
        titik tengah kelas untuk mewakili nilai-nilai tersebut.
      </p>

      <p className="text-base text-midnight_text dark:text-gray mb-6">
        Dengan menghitung mean dari data kelompok, kita bisa memperkirakan
        nilai rata-rata dari seluruh data meskipun datanya sudah dipadatkan dalam
        bentuk interval.
      </p>
    </div>
    </div>
  );
};