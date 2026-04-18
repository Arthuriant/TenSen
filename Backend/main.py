from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Union, Dict
import pandas as pd
import numpy as np
import math
from stats_logic import *

app = FastAPI()

# Setup CORS agar React bisa mengakses API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Di production, ganti dengan URL React Anda (misal: http://localhost:3000)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 1. MODEL INPUT ---

class DataInput(BaseModel):
    # Tipe data: 'tunggal' atau 'kelompok'
    data_type: str = Field(..., pattern="^(tunggal|kelompok)$") 
    
    # Mode input: 'raw' (10, 12, 10...) atau 'table' (x:10, f:2)
    input_mode: str = Field(..., pattern="^(raw|table)$")
    
    # Jika mode 'raw', list angka
    raw_data: Optional[List[float]] = None
    
    # Jika mode 'table', list of object {value: 10, frequency: 5}
    table_data: Optional[List[Dict[str, float]]] = None
    
    # Opsional: Panjang kelas (interval) jika user ingin custom untuk data kelompok
    class_interval: Optional[int] = None

# --- 2. LOGIC GENERATOR TABEL ---

def create_frequency_table(data: List[float], data_type: str, interval: Optional[int] = None):
    df = pd.DataFrame(data, columns=['value'])
    
    if data_type == 'tunggal':
        # --- DATA TUNGGAL ---
        # Hitung frekuensi
        freq_table = df['value'].value_counts().sort_index().reset_index()
        # Pandas 2.x memberi nama kolom ['value', 'count'] secara default
        freq_table.columns = ['xi_value', 'fi']
        
        # Format Tampilan (hilangkan .0)
        freq_table['xi_display'] = freq_table['xi_value'].apply(lambda x: int(x) if x.is_integer() else x)
        
    elif data_type == 'kelompok':
        # --- DATA KELOMPOK ---
        n = len(df)
        
        # 1. Tentukan Interval (Bin Width)
        if interval is None:
            # Rumus Sturges
            k = 1 + 3.322 * np.log10(n)
            k = round(k)
            if k <= 0: k = 5 # Fallback safety
            data_range = df['value'].max() - df['value'].min()
            if data_range == 0: data_range = 1
            interval_width = math.ceil(data_range / k)
        else:
            interval_width = int(interval)

        # 2. Buat Bins
        min_val = math.floor(df['value'].min())
        max_val = math.ceil(df['value'].max())
        
        # Pastikan bin mencakup nilai max dengan buffer cukup
        # Range: dari min sampai max + interval (supaya angka terakhir masuk)
        bins = range(min_val, max_val + interval_width + 1, interval_width)
        
        # 3. Cut Data (Binning)
        # Gunakan try-except untuk menangani potensi error binning
        try:
            df['group'] = pd.cut(df['value'], bins=bins, right=False, include_lowest=True)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Gagal mengelompokkan data: {str(e)}")

        # 4. Hitung Frekuensi (Gunakan GroupBy agar lebih stabil di Pandas 2.x)
        # observed=True -> Hanya menampilkan kelas yang ada datanya (fi > 0)
        freq_table = df.groupby('group', observed=True).size().reset_index(name='fi')
        
        # Rename kolom group menjadi 'interval' agar konsisten
        freq_table.rename(columns={'group': 'interval'}, inplace=True)
        
        # Validasi: Jika hasil kosong (misal data di luar jangkauan bin)
        if freq_table.empty:
             raise HTTPException(status_code=400, detail="Binning menghasilkan tabel kosong. Cek jangkauan data.")

        # 5. Buat Kolom Helper
        # Nilai Tengah (xi_value) dari Interval
        freq_table['xi_value'] = freq_table['interval'].apply(lambda x: (x-0.5).mid).astype(float)
        freq_table['fi'] = freq_table['fi'].astype(int)
        
        # Tampilan String "10 - 19"
        # Kurangi 1 dari right side agar terlihat inklusif (misal [10, 20) jadi 10-19)
        freq_table['xi_display'] = freq_table['interval'].apply(
            lambda x: f"{int(x.left)} - {int(x.right - 1)}"
        )

    # --- HITUNG KUMULATIF (Sama untuk keduanya) ---
    freq_table['fk'] = freq_table['fi'].cumsum()
    total_freq = freq_table['fi'].sum()
    
    # Hindari pembagian nol
    if total_freq == 0:
         freq_table['percentage'] = 0
    else:
         freq_table['percentage'] = (freq_table['fk'] / total_freq * 100).round(1)

    return freq_table, total_freq

def generate_chart_data(df):
    """
    Generate data untuk 2 jenis grafik:
    1. Frequency (Histogram) -> Menggunakan Frekuensi (fi)
    2. Cumulative (Ogive) -> Menggunakan Persentase Kumulatif (0-100%)
    """
    freq_data = []
    cum_data = []
    
    for _, row in df.iterrows():
        label = str(row['xi_display'])
        
        # --- Grafik 1: Frekuensi (Tetap) ---
        freq_data.append({
            "label": label,
            "value": int(row['fi']),
            "tooltip_info": f"Frekuensi: {int(row['fi'])}"
        })
        
        # --- Grafik 2: Kumulatif (UPDATE: Gunakan Persentase) ---
        # Ambil nilai percentage yang sudah dihitung di create_frequency_table
        pct_value = float(row['percentage']) 
        
        cum_data.append({
            "label": label,
            "value": pct_value,  # Sekarang bernilai 0 - 100
            "tooltip_info": f"Kumulatif: {pct_value}%"
        })
        
    return {
        "frequency_chart": freq_data,
        "cumulative_chart": cum_data
    }

# --- 3. ENDPOINT API ---

@app.post("/calculate")
def calculate_statistics(payload: DataInput):
    # 1. Parsing Input
    data_values = []
    
    if payload.input_mode == 'raw':
        if not payload.raw_data:
            raise HTTPException(status_code=400, detail="Raw data tidak boleh kosong")
        data_values = payload.raw_data
        
    elif payload.input_mode == 'table':
        if not payload.table_data:
            raise HTTPException(status_code=400, detail="Table data tidak boleh kosong")
        # Konversi {value: 10, frequency: 2} menjadi [10, 10] untuk diproses pandas
        for item in payload.table_data:
            val = item.get('value')
            freq = int(item.get('frequency'))
            data_values.extend([val] * freq)

    if not data_values:
        raise HTTPException(status_code=400, detail="Data valid tidak ditemukan")

    # 2. Generate Tabel Utama
    try:
        df_table, total_n = create_frequency_table(
            data_values, 
            payload.data_type, 
            payload.class_interval
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saat mengolah tabel: {str(e)}")

    # 3. Konversi ke Format JSON Response (sesuai UI React)
    table_response = []
    for idx, row in df_table.iterrows():
        table_response.append({
            "no": idx + 1,
            "xi_display": str(row['xi_display']), # Tampilan (10-14 atau 10)
            "xi_value": float(row['xi_value']),         # Nilai numerik/tengah utk kalkulasi
            "fi": int(row['fi']),
            "fk": int(row['fk']),
            "percentage": f"{row['percentage']}%"
        })

    # 1. Generate Tabel & Total N (sudah ada dari langkah sebelumnya)
    df_table, total_n = create_frequency_table(
        data_values, 
        payload.data_type, 
        payload.class_interval
    )

    current_precision = get_max_precision(df_table)

    # 2. KALKULASI STATISTIK (BARU)
    # Menghitung Mean
    mean_res = calculate_mean_latex(df_table, total_n, payload.data_type,precision=current_precision)
    
    # Menghitung Median (Q2)
    median_res = calculate_median_latex(df_table, total_n, payload.data_type,precision=current_precision)
    
    # 3. Format Response Tabel (Sama seperti sebelumnya)
    table_response = []
    for idx, row in df_table.iterrows():
        table_response.append({
            "no": idx + 1,
            "xi_display": str(row['xi_display']),
            "xi_value": float(row['xi_value']),         # Pastikan nama kolom di df sesuai ('xi_value' di func table mungkin perlu rename jadi 'xi_value' atau sesuaikan)
            "fi": int(row['fi']),
            "fk": int(row['fk']),
            "percentage": f"{row['percentage']}%"
        })
        
        # BUG FIX KECIL: Di fungsi create_frequency_table saya sebelumnya, 
        # kolom nilai tengah dinamakan 'xi_value'. 
        # Di fungsi calculate_mean_latex, saya panggil 'xi_value'. 
        # Pastikan konsisten. Saran: di create_frequency_table, rename kolom 'xi_value' jadi 'xi_value'.

    mean_res = calculate_mean_latex(df_table, total_n, payload.data_type,precision=current_precision)
    median_res = calculate_median_latex(df_table, total_n, payload.data_type,precision=current_precision)
    mode_res = calculate_mode_latex(df_table, payload.data_type,precision=current_precision) # Modus tidak butuh n
    q1_res = calculate_q1_latex(df_table, total_n, payload.data_type)
    q3_res = calculate_q3_latex(df_table, total_n, payload.data_type)

    # 1. Hitung Mean DULU (karena nilai mean_res['value'] dibutuhkan Varian)
    mean_res = calculate_mean_latex(df_table, total_n, payload.data_type,precision=current_precision)
    mean_value = mean_res['value']

    # 2. Hitung Varian (masukkan mean_value)
    variance_res = calculate_variance_latex(df_table, total_n, mean_value, payload.data_type,precision=current_precision)
    variance_value = variance_res['value']

    # 3. Hitung Std Dev (masukkan variance_value)
    std_dev_res = calculate_std_dev_latex(variance_value,precision=current_precision)

    # range
    range_res = calculate_range_latex(df_table, payload.data_type,precision=current_precision)

    # chart
    charts = generate_chart_data(df_table)

    # 4. Final Response
    return {
        "status": "success",
        "data_summary": {
            "total_data": int(total_n),
            "data_type": payload.data_type
        },
        "frequency_table": table_response,
        "charts": {
            "frequency_data": charts['frequency_chart'],   # Untuk Bar Chart
            "cumulative_data": charts['cumulative_chart']  # Untuk Line Chart
        },
        "steps": {
            "mean": mean_res,      
            "median": median_res, 
            "mode": mode_res,
            "q1": q1_res,
            "q3": q3_res,
            "range": range_res,
            "variance": variance_res,
            "std_dev": std_dev_res,
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)