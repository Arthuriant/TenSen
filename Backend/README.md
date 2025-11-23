
# 📊 Statistical Calculator Backend

Backend API performa tinggi yang dibangun dengan **FastAPI**, **Pandas**, dan **NumPy**. Sistem ini dirancang untuk melakukan analisis statistik deskriptif (Tendensi Sentral & Dispersi) untuk **Data Tunggal** dan **Data Kelompok**.

Fitur unggulan dari backend ini adalah kemampuannya menghasilkan **langkah-langkah pengerjaan (Step-by-step Solution)** dalam format **LaTeX** secara dinamis, serta menyiapkan data visualisasi grafik untuk Frontend.

## 🚀 Fitur Utama

* **Multi-Input Support:** Menerima input berupa Deret Angka (Raw Data) atau Tabel Distribusi Frekuensi.
* **Dual Mode:** Mendukung kalkulasi Data Tunggal dan Data Kelompok.
* **Auto Binning:** Otomatis mengelompokkan data mentah menjadi tabel interval menggunakan rumus *Sturges*.
* **LaTeX Generator:** Menghasilkan string rumus matematika, substitusi nilai, dan hasil akhir (Mean, Median, Modus, Varian, dll) untuk dirender di Frontend.
* **Visualization Ready:** Menyediakan JSON data siap pakai untuk Grafik Histogram (Frekuensi) dan Ogive (Persentase Kumulatif).

## 🛠️ Tech Stack

* **Language:** Python 3.13+
* **Framework:** FastAPI
* **Server:** Uvicorn (ASGI)
* **Data Processing:** Pandas, NumPy
* **Validation:** Pydantic

## 📂 Struktur Folder

```text
backend/
├── main.py             # Entry point, API Endpoints, & Data Parsing
├── stats_logic.py      # Core Logic Kalkulasi Statistik & LaTeX Generator
├── requirements.txt    # Daftar dependensi library
└── README.md           # Dokumentasi proyek
```

## ⚙️ Instalasi & Menjalankan

1.  **Clone Repository & Masuk ke Folder**

    ```bash
    cd backend
    ```

2.  **Buat Virtual Environment (Disarankan)**

    ```bash
    # Windows
    python -m venv venv
    venv\Scripts\activate

    # Mac/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install Dependensi**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Jalankan Server (Development Mode)**

    ```bash
    uvicorn main:app --reload
    ```

    Server akan berjalan di `http://localhost:8000`.

## 📡 Dokumentasi API

### Endpoint: `POST /calculate`

Endpoint utama untuk melakukan semua perhitungan statistik.

**URL:** `http://localhost:8000/calculate`
**Content-Type:** `application/json`

#### 1\. Request Body Examples

**Skenario A: Input Deret Angka (Raw Data)**

```json
{
  "data_type": "kelompok",
  "input_mode": "raw",
  "raw_data": [10, 12, 15, 18, 20, 22, 25, 30],
  "class_interval": 5  // Opsional (jika kosong, menggunakan Sturges Rule)
}
```

**Skenario B: Input Tabel Distribusi (Data Kelompok)**
*Backend otomatis menghitung nilai tengah jika format rentang `Bawah-Atas` diberikan.*

```json
{
  "data_type": "kelompok",
  "input_mode": "table",
  "table_data": [
    { "value": 0, "frequency": 5 }, // value akan diabaikan/di-overwrite oleh logika parsing rentang
    // Frontend mengirim rentang, backend menerima value float hasil parsing
  ],
  // Note: Pada implementasi aktual, Frontend mengirimkan data yang sudah diparsing
  // menjadi { value: nilai_tengah, frequency: fi }
}
```

#### 2\. Response Structure

```json
{
  "status": "success",
  "data_summary": {
    "total_data": 50,
    "data_type": "kelompok"
  },
  "frequency_table": [
    {
      "no": 1,
      "xi_display": "10 - 14",
      "fi": 5,
      "fk": 5,
      "percentage": "10.0%"
    }
    // ...
  ],
  "charts": {
    "frequency_data": [
      { "label": "10 - 14", "value": 5, "tooltip_info": "Frekuensi: 5" }
    ],
    "cumulative_data": [
      { "label": "10 - 14", "value": 10.0, "tooltip_info": "Kumulatif: 10.0%" }
    ]
  },
  "results": {
    "mean": {
      "value": 24.5,
      "latex": "$$\\begin{aligned} ... \\end{aligned}$$"
    },
    "median": { "value": 23.8, "latex": "..." },
    "mode": { "value": 26.2, "latex": "..." },
    "variance": { "value": 42.3, "latex": "..." },
    "std_dev": { "value": 6.5, "latex": "..." },
    "range": { "value": 24, "latex": "..." },
    "q1": { "value": 18.5, "latex": "..." },
    "q3": { "value": 29.1, "latex": "..." }
  }
}
```

## 🧠 Penjelasan Logika Kalkulasi

### 1\. Smart LaTeX Formatting

Backend tidak hanya menghitung angka, tetapi menyusun string LaTeX yang merepresentasikan logika manual:

  * **Mean:** Menampilkan langkah $\sum f_i \cdot x_i$. Jika data banyak, otomatis disingkat dengan `...` (ellipsis).
  * **Median Data Kelompok:** Menampilkan detail $Tb$, $f_k$, $f_i$, dan $p$ dalam rumus interpolasi.
  * **Varian:** Menampilkan substitusi sampel perhitungan $(x_i - \bar{x})^2$.

### 2\. Logika Interval & Binning

  * Jika user memberikan **Raw Data**, sistem menggunakan `pandas.cut` dengan opsi `include_lowest=True` dan `right=False` (standar interval `[a, b)`).
  * Jika user memberikan **Tabel (Rentang)**, sistem menghitung **Nilai Tengah** dari rentang tersebut untuk digunakan dalam kalkulasi Mean/Varian.

### 3\. Presisi Angka

Sistem mendeteksi jumlah desimal pada input user (Helper `get_max_precision`).

  * Hasil **Mean** ditampilkan dengan presisi `input + 2`.
  * Hasil **Varian/SD** ditampilkan dengan presisi `input + 5`.

## 📦 Requirements

Isi file `requirements.txt`:

```text
fastapi>=0.110.0
uvicorn[standard]>=0.29.0
pandas>=2.2.0
numpy>=1.26.0
pydantic>=2.6.0
python-multipart>=0.0.9
```

```
```