# TenSen (Tendensi Sentral) 📊
<img width="1900" height="909" alt="image" src="https://github.com/user-attachments/assets/ed2c070d-3c9d-4a80-b35a-b515c1f3cb55" />

**TenSen** adalah aplikasi kalkulator statistika deskriptif yang dirancang untuk menghitung Tendensi Sentral secara otomatis. Aplikasi ini tidak hanya memberikan hasil akhir, tetapi juga menyertakan penjelasan langkah demi langkah (*step-by-step*) dan visualisasi grafik interaktif untuk membantu pemahaman data.

---

## 🚀 Fitur Utama

- **Kalkulasi Otomatis**: Menghitung Mean, Median, Modus, Varian, Standar Deviasi, hingga Kuartil.
- **Dua Metode Input**: Mendukung pengolahan **Data Tunggal** (deret angka) dan **Data Kelompok** (tabel distribusi frekuensi).
  <img width="1896" height="899" alt="image" src="https://github.com/user-attachments/assets/ff090733-e719-4f9c-a887-914446ec5f50" />
- **Langkah Perhitungan**: Menampilkan rumus dan proses substitusi nilai secara mendetail.
  <img width="1901" height="910" alt="image" src="https://github.com/user-attachments/assets/2dcc2876-fb95-4b79-aef2-15bb653599c8" />
- **Visualisasi Grafik**:
  - **Frekuensi (Bar)**: Untuk melihat distribusi data.
  - **Kumulatif (Line)**: Untuk melihat tren data secara akumulatif.
  <img width="1897" height="906" alt="image" src="https://github.com/user-attachments/assets/1dc49c03-2480-4cab-b13f-24c740c68dfa" />
- **Antarmuka Modern**: Dashboard yang bersih dengan navigasi sidebar yang intuitif.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) / [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/)
- **Math Rendering**: [KaTeX](https://katex.org/) (untuk rumus matematika)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Library**: NumPy & Pandas

---

## 💻 Cara Instalasi

### 1. Clone Repositori
```bash
git clone [https://github.com/username-kamu/tensen.git](https://github.com/username-kamu/tensen.git)
cd tensen
```

### 2. Setup Backend (Python)
Pindah ke direktori backend dan jalankan server:
```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate

# Unix/Mac:
source venv/bin/activate

pip install -r requirements.txt
python main.py
```
*Backend akan berjalan di: `http://localhost:8000`*

### 3. Setup Frontend (Node.js)
Pindah ke direktori frontend dan jalankan mode development:
```bash
cd frontend
npm install
npm run dev
```
*Frontend akan berjalan di: `http://localhost:3000`*

---

## 📂 Struktur Proyek

```text
tensen/
├── backend/            # FastAPI (Logika Statistika)
│   ├── main.py         # Entry point server
│   └── requirements.txt
├── frontend/           # Next.js (User Interface)
│   ├── components/     # Komponen UI & Chart
│   └── pages/          # Halaman Kalkulator
└── README.md           # Dokumentasi Proyek
```
