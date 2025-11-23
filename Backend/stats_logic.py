import math
import pandas as pd

# Helper untuk format angka (hapus .0 di belakang jika bulat)

def get_max_precision(df):
    """
    Mencari jumlah desimal terbanyak dari kolom 'xi_value'.
    Contoh: [10, 10.5, 10.25] -> Max desimal = 2
    """
    def count_decimals(val):
        # Konversi ke string, hapus floating point error kecil
        s = str(val)
        if '.' not in s: 
            return 0
        # Jika 10.0 -> 0 desimal
        if s.split('.')[1] == '0': 
            return 0
        return len(s.split('.')[1])

    # Ambil max desimal dari data, default minimal 2 agar rapi
    max_dec = df['xi_value'].apply(count_decimals).max()
    return max(2, max_dec) # Minimal 2 desimal (atau ubah jadi max_dec jika ingin strict)

def fmt(num,digits=2):
    """
    Format angka dinamis. 
    - num: Angka yang diformat
    - digits: Jumlah desimal yang diinginkan (default 2)
    """
    # Jika angka benar-benar bulat (misal 25.00), jadikan integer (25)
    if num % 1 == 0:
        return str(int(num))
    
    # Format string dinamis berdasarkan 'digits'
    # Contoh: "{:.4f}" jika digits=4
    format_str = f"{{:.{digits}f}}" 
    
    formatted = format_str.format(num)
    
    # Hapus 0 di belakang (misal 10.500 -> 10.5) agar lebih bersih
    return formatted.rstrip('0').rstrip('.') if '.' in formatted else formatted

def calculate_mean_latex(df, total_n, data_type,precision=2):
    """
    Menghitung Mean dengan langkah detail:
    1. Rumus
    2. Substitusi (Show expansion)
    3. Kalkulasi Sigma
    4. Hasil Akhir
    """
    calc_prec = precision + 2
    # 1. Hitung Total Sigma (fi * xi)
    sum_fixi = (df['fi'] * df['xi_value']).sum()
    mean_val = sum_fixi / total_n
    
    # 2. Siapkan String Substitusi (Logic untuk "Show Expansion")
    # Format: (f1 . x1) + (f2 . x2) + ...
    rows = df.to_dict('records')
    terms = []
    
    # Batasan: Jika data > 3 baris, gunakan '...' agar tidak terlalu panjang
    if len(rows) <= 3:
        for row in rows:
            # Menampilkan (fi . xi)
            terms.append(f"({row['fi']} \cdot {fmt(row['xi_value'],calc_prec)})")
        expansion_str = " + ".join(terms)
    else:
        # Ambil 2 pertama
        for row in rows[:2]:
            terms.append(f"({row['fi']} \cdot {fmt(row['xi_value'],calc_prec)})")
        
        # Tambah ...
        expansion_str = " + ".join(terms) + " + \dots + "
        
        # Ambil 1 terakhir
        last_row = rows[-1]
        expansion_str += f"({last_row['fi']} \cdot {fmt(last_row['xi_value'],calc_prec)})"

    # 3. Generate LaTeX dengan 4 Langkah
    latex_str = (
        r"\begin{aligned}"
        # Langkah 1: Rumus
        # r"& \text{1. Rumus:}" "\\"
        r"& \bar{x} = \frac{\sum f_i \cdot x_i}{\sum f_i} \\[1em]"
        
        # Langkah 2: Substitusi (Expansion)
        # r"& \text{2. Substitusi:}" "\\"
        fr"& \bar{{x}} = \frac{{{expansion_str}}}{{{total_n}}} \\[1em]"
        
        # Langkah 3: Kalkulasi Sigma (Hasil Penjumlahan Atas)
        # r"& \text{3. Kalkulasi Sigma:}" "\\"
        fr"& \bar{{x}} = \frac{{{fmt(sum_fixi,calc_prec)}}}{{{total_n}}} \\[1em]"
        
        # Langkah 4: Hasil Akhir
        # r"& \text{4. Hasil Akhir:}" "\\"
        fr"& \mathbf{{\bar{{x}} = {fmt(mean_val,calc_prec)}}}"
        r"\end{aligned}"
    )
    
    return {
        "value": float(mean_val),
        "latex": f"$$ {latex_str} $$"
    }

def calculate_median_latex(df, total_n, data_type, precision=2):
    """
    Menghitung Median.
    - Data Tunggal: Cek Ganjil/Genap.
      * Ganjil: Data ke-(n+1)/2
      * Genap: Rata-rata Data ke-(n/2) dan (n/2 + 1)
    - Data Kelompok: Interpolasi (Rumus Tb...)
    """
    
    # --- KONDISI 1: DATA TUNGGAL ---
    if data_type == 'tunggal':
        # Cek Ganjil / Genap
        if total_n % 2 != 0:
            # --- GANJIL ---
            posisi = (total_n + 1) / 2
            
            # Cari data pada posisi tersebut (Lihat FK)
            # Logic: Cari baris pertama dimana FK >= posisi
            row = df[df['fk'] >= posisi].iloc[0]
            median_val = row['xi_value']
            
            latex_str = (
                r"\begin{aligned}"
                # r"& \text{1. Cek Jumlah Data (n):}" "\\"
                fr"& n = {total_n} \text{{ (Ganjil)}} \\[1em]"
                
                # r"& \text{2. Rumus Posisi:}" "\\"
                r"& Posisi = \frac{n+1}{2} \\"
                fr"& Posisi = \frac{{{total_n}+1}}{{2}} = \text{{Data ke-}}{int(posisi)} \\[1em]"
                
                # r"& \text{3. Cari Nilai Data:}" "\\"
                fr"& \text{{Data ke-}}{int(posisi)} \text{{ berada pada nilai }} \mathbf{{{fmt(median_val, precision)}}} \\"
                fr"& \mathbf{{Me = {fmt(median_val, precision)}}}"
                r"\end{aligned}"
            )
            return {"value": float(median_val), "latex": f"$$ {latex_str} $$"}
            
        else:
            # --- GENAP ---
            pos1 = total_n / 2
            pos2 = (total_n / 2) + 1
            
            # Cari data ke-pos1
            row1 = df[df['fk'] >= pos1].iloc[0]
            val1 = row1['xi_value']
            
            # Cari data ke-pos2
            row2 = df[df['fk'] >= pos2].iloc[0]
            val2 = row2['xi_value']
            
            # Hitung Rata-rata
            median_val = (val1 + val2) / 2
            
            latex_str = (
                r"\begin{aligned}"
                # r"& \text{1. Cek Jumlah Data (n):}" "\\"
                fr"& n = {total_n} \text{{ (Genap)}} \\[1em]"
                
                # r"& \text{2. Rumus Posisi:}" "\\"
                r"& Me = \frac{X_{(n/2)} + X_{(n/2)+1}}{2} \\"
                fr"& Me = \frac{{X_{{{int(pos1)}}} + X_{{{int(pos2)}}}}}{{2}} \\[1em]"
                
                # r"& \text{3. Substitusi Nilai:}" "\\"
                fr"& \text{{Data ke-}}{int(pos1)} = {fmt(val1, precision)} \\"
                fr"& \text{{Data ke-}}{int(pos2)} = {fmt(val2, precision)} \\"
                fr"& Me = \frac{{{fmt(val1, precision)} + {fmt(val2, precision)}}}{{2}} \\[1em]"
                
                # r"& \text{4. Hasil Akhir:}" "\\"
                fr"& \mathbf{{Me = {fmt(median_val, precision)}}}"
                r"\end{aligned}"
            )
            return {"value": float(median_val), "latex": f"$$ {latex_str} $$"}

    # --- KONDISI 2: DATA KELOMPOK (Tidak Berubah) ---
    else:
        posisi = total_n / 2
        
        # 1. Cari Kelas Median
        class_row = df[df['fk'] >= posisi].iloc[0]
        idx = int(class_row.name)
        
        # 2. Tentukan Variabel Rumus
        limit_bawah = int(str(class_row['xi_display']).split(' - ')[0])
        Tb = limit_bawah - 0.5
        
        if idx == 0:
            fk_prev = 0
        else:
            fk_prev = df.iloc[idx-1]['fk']
            
        fi = class_row['fi']
        
        split_interval = str(class_row['xi_display']).split(' - ')
        p = int(split_interval[1]) - int(split_interval[0]) + 1
        
        # 3. Kalkulasi
        fraction_part = (posisi - fk_prev) / fi
        result_val = Tb + (fraction_part * p)
        
        # --- GENERATE LATEX ---
        latex_str = (
            r"\begin{aligned}"
            # r"& \text{1. Rumus (Interpolasi):}" "\\"
            r"& Me = Tb + \left( \frac{\frac{1}{2}n - f_k}{f_i} \right) \cdot p \\[1em]"
            
            # r"& \text{2. Identifikasi Nilai:}" "\\"
            fr"& n={total_n} \rightarrow \text{{Posisi}} = {fmt(posisi)} \\"
            fr"& \text{{Kelas Me}}: \mathbf{{{class_row['xi_display']}}} \\"
            fr"& Tb={fmt(Tb)}, f_k={fk_prev}, f_i={fi}, p={p} \\[1em]"
            
            # r"& \text{3. Substitusi:}" "\\"
            fr"& Me = {fmt(Tb)} + \left( \frac{{{fmt(posisi)} - {fk_prev}}}{{{fi}}} \right) \cdot {p} \\"
            fr"& Me = {fmt(Tb)} + ({fmt(fraction_part, 4)}) \cdot {p} \\[1em]" # Precision 4 agar langkah tengah akurat
            
            # r"& \text{4. Hasil Akhir:}" "\\"
            fr"& \mathbf{{Me = {fmt(result_val, precision)}}}"
            r"\end{aligned}"
        )

        return {"value": result_val, "latex": f"$$ {latex_str} $$"} 
# ... (Kode sebelumnya: fmt, calculate_mean, calculate_median) ...

def calculate_mode_latex(df, data_type,precision=2):
    """
    Menghitung Modus (Nilai yang paling sering muncul).
    """
    # Cari frekuensi tertinggi
    max_fi = df['fi'].max()
    
    # Ambil baris yang memiliki fi max (bisa lebih dari 1 jika multimodal)
    # Kita ambil yang pertama saja untuk simplifikasi demo
    mode_row = df[df['fi'] == max_fi].iloc[0]
    idx = int(mode_row.name)
    
    if data_type == 'tunggal':
        mode_val = mode_row['xi_value']
        latex_str = (
            r"\begin{aligned}"
            fr"& \text{{Nilai dengan frekuensi tertinggi adalah }} \mathbf{{{fmt(mode_val,precision)}}}"
            fr"\text{{ dengan jumlah kemunculan }} {max_fi} \text{{ kali.}}"
            r"\end{aligned}"
        )
        return {"value": float(mode_val), "latex": f"$$ {latex_str} $$"}

    else:
        # --- DATA KELOMPOK ---
        # Rumus: Mo = Tb + (d1 / (d1 + d2)) * p
        
        # 1. Tentukan Tb & p
        lower_limit = int(str(mode_row['xi_display']).split(' - ')[0])
        Tb = lower_limit - 0.5
        
        split_interval = str(mode_row['xi_display']).split(' - ')
        p = int(split_interval[1]) - int(split_interval[0]) + 1
        
        # 2. Hitung d1 (selisih freq dengan kelas sebelumnya)
        if idx == 0:
            d1 = mode_row['fi'] # Anggap prev freq = 0
        else:
            d1 = mode_row['fi'] - df.iloc[idx-1]['fi']
            
        # 3. Hitung d2 (selisih freq dengan kelas sesudahnya)
        if idx == len(df) - 1:
            d2 = mode_row['fi'] # Anggap next freq = 0
        else:
            d2 = mode_row['fi'] - df.iloc[idx+1]['fi']
            
        # 4. Kalkulasi
        try:
            fraction = d1 / (d1 + d2)
        except ZeroDivisionError:
            fraction = 0 # Fallback jika d1+d2 = 0 (jarang terjadi di data normal)
            
        mode_val = Tb + (fraction * p)
        
        # --- LATEX ---
        latex_str = (
            r"\begin{aligned}"
            r"& Mo = Tb + \left( \frac{d_1}{d_1 + d_2} \right) \cdot p \\"
            fr"& \text{{Kelas Modus: }} {mode_row['xi_display']} \quad (f_{{max}}={max_fi}) \\"
            fr"& Tb = {fmt(Tb,precision)}, \quad p = {p} \\"
            fr"& d_1 = {max_fi} - {(max_fi - d1)} = {d1} \\"
            fr"& d_2 = {max_fi} - {(max_fi - d2)} = {d2} \\[1em]" # [1em] untuk spasi
            fr"& Mo = {fmt(Tb,precision)} + \left( \frac{{{d1}}}{{{d1} + {d2}}} \right) \cdot {p} \\"
            fr"& Mo = {fmt(Tb,precision)} + \left( \frac{{{d1}}}{{{d1+d2}}} \right) \cdot {p} \\"
            fr"& Mo = {fmt(Tb,precision)} + {fmt((fraction * p),precision)} \\"
            fr"& \mathbf{{Mo = {fmt(mode_val,precision)}}}"
            r"\end{aligned}"
        )
        
        return {"value": mode_val, "latex": f"$$ {latex_str} $$"}

def _calculate_quartile_general(df, total_n, data_type, quartile_type, precision=2):
    """
    Fungsi Internal Generic untuk Q1 (1/4), Q2 (2/4), Q3 (3/4)
    quartile_type: 1, 2, atau 3
    """
    q_frac = quartile_type / 4
    posisi = total_n * q_frac
    label = f"Q_{quartile_type}"
    
    # --- DATA TUNGGAL ---
    if data_type == 'tunggal':
        row = df[df['fk'] >= posisi].iloc[0]
        val = row['xi_value']
        
        latex_str = (
            r"\begin{aligned}"
            fr"& \text{{Letak }} {label} = \frac{{{quartile_type}}}{{4}}\ n = {fmt(total_n,precision)} \\"
            fr"& {label} \text{{ terletak pada data ke-}}{fmt(posisi,precision)} \\"
            fr"& \mathbf{{{label} = {fmt(val,(precision+1))}}}"
            r"\end{aligned}"
        )
        return {"value": float(val), "latex": f"$$ {latex_str} $$"}

    # --- DATA KELOMPOK ---
    else:
        # 1. Cari Kelas
        class_row = df[df['fk'] >= posisi].iloc[0]
        idx = int(class_row.name)
        
        # 2. Variabel Rumus
        lower_limit = int(str(class_row['xi_display']).split(' - ')[0])
        Tb = lower_limit - 0.5
        
        if idx == 0:
            fk_prev = 0
        else:
            fk_prev = df.iloc[idx-1]['fk']
            
        fi = class_row['fi']
        
        split_interval = str(class_row['xi_display']).split(' - ')
        p = int(split_interval[1]) - int(split_interval[0]) + 1
        
        # 3. Kalkulasi
        fraction_part = (posisi - fk_prev) / fi
        res_val = Tb + (fraction_part * p)
        
        # 4. LaTeX
        latex_str = (
            r"\begin{aligned}"
            fr"& {label} = Tb + \left( \frac{{\frac{{{quartile_type}}}{{4}}n - f_k}}{{f_i}} \right) \cdot p \\"
            fr"& \text{{Letak }}: \frac{{{quartile_type}}}{{4}} \cdot {total_n} = {fmt(posisi,precision)} \rightarrow \text{{Kelas }} {class_row['xi_display']} \\"
            fr"& {label} = {fmt(Tb,precision)} + \left( \frac{{{fmt(posisi,precision)} - {fk_prev}}}{{{fi}}} \right) \cdot {p} \\"
            fr"& {label} = {fmt(Tb,precision)} + ({fmt(fraction_part,precision)}) \cdot {p} \\"
            fr"& \mathbf{{{label} = {fmt(res_val,(precision+1))}}}"
            r"\end{aligned}"
        )
        
        return {"value": res_val, "latex": f"$$ {latex_str} $$"}

# Wrapper Functions agar mudah dipanggil di main.py
def calculate_q1_latex(df, total_n, data_type):
    return _calculate_quartile_general(df, total_n, data_type, 1)

def calculate_q3_latex(df, total_n, data_type):
    return _calculate_quartile_general(df, total_n, data_type, 3)

def calculate_variance_latex(df, total_n, mean_val, data_type,precision=2):
    """
    Menghitung Varian Sampel (S^2) dengan 4 langkah detail.
    Rumus: S^2 = Sum(fi * (xi - mean)^2) / (n)
    """
    calc_prec = precision + 5
    # --- 1. Kalkulasi Numerik ---
    # Hitung (xi - mean)^2
    df['xi_min_mean_sq'] = (df['xi_value'] - mean_val) ** 2
    # Hitung fi * (xi - mean)^2
    df['fi_xi_min_mean_sq'] = df['fi'] * df['xi_min_mean_sq']
    
    sum_sq_diff = df['fi_xi_min_mean_sq'].sum()
    denominator = total_n
    variance_val = sum_sq_diff / denominator
    
    # --- 2. Logic Generasi String Substitusi (Smart Expansion) ---
    rows = df.to_dict('records')
    terms = []
    
    # Format tampilan: fi(xi - mean)^2
    # Contoh: 5(12 - 14.5)^2
    
    if len(rows) <= 3:
        for row in rows:
            term = fr"{row['fi']}({fmt(row['xi_value'], precision)} - {fmt(mean_val, calc_prec)})^2"
            terms.append(term)
        expansion_str = " + ".join(terms)
    else:
        # Ambil 2 data pertama
        for row in rows[:2]:
            term = fr"{row['fi']}({fmt(row['xi_value'], precision)} - {fmt(mean_val, calc_prec)})^2"
            terms.append(term)
            
        # Tambah '...'
        expansion_str = " + ".join(terms) + " + \dots + "
        
        # Ambil 1 data terakhir
        last_row = rows[-1]
        last_term = fr"{last_row['fi']}({fmt(last_row['xi_value'], precision)} - {fmt(mean_val, calc_prec)})^2"
        expansion_str += last_term

    # --- 3. Generate LaTeX ---
    latex_str = (
        r"\begin{aligned}"
        # Langkah 1: Rumus
        # r"& \text{1. Rumus (Varian Sampel):}" "\\"
        r"& S^2 = \frac{\sum f_i (x_i - \bar{x})^2}{n} \\[1em]"
        
        # Langkah 2: Substitusi (Expansion)
        # r"& \text{2. Substitusi:}" "\\"
        fr"& S^2 = \frac{{{expansion_str}}}{{{total_n}}} \\[1em]"
        
        # Langkah 3: Kalkulasi Sigma (Pembilang dan Penyebut)
        # r"& \text{3. Kalkulasi Sigma:}" "\\"
        fr"& S^2 = \frac{{{fmt(sum_sq_diff, calc_prec)}}}{{{denominator}}} \\[1em]"
        
        # Langkah 4: Hasil Akhir
        # r"& \text{4. Hasil Akhir:}" "\\"
        fr"& \mathbf{{S^2 = {fmt(variance_val, calc_prec)}}}"
        r"\end{aligned}"
    )
    
    return {"value": float(variance_val), "latex": f"$$ {latex_str} $$"}


def calculate_std_dev_latex(variance_val,precision=2):
    """
    Menghitung Standar Deviasi (S) dari Varian.
    Langkahnya sedikit lebih pendek karena hanya akar kuadrat, 
    tapi tetap mengikuti format labeling.
    """
    calc_prec = precision + 5
    std_dev = math.sqrt(variance_val)
    
    latex_str = (
        r"\begin{aligned}"
        # Langkah 1: Rumus
        # r"& \text{1. Rumus:}" "\\"
        r"& S = \sqrt{S^2} \\[1em]"
        
        # Langkah 2: Substitusi
        # r"& \text{2. Substitusi:}" "\\"
        fr"& S = \sqrt{{{fmt(variance_val,calc_prec)}}} \\[1em]"
        
        # Langkah 3: Hasil Akhir (Langsung karena hanya operasi akar)
        # r"& \text{3. Hasil Akhir:}" "\\"
        fr"& \mathbf{{S = {fmt(std_dev,precision+2)}}}"
        r"\end{aligned}"
    )
    
    return {"value": float(std_dev), "latex": f"$$ {latex_str} $$"}

def calculate_range_latex(df, data_type,precision=2):
    """
    Menghitung Range (Jangkauan) dengan langkah detail.
    """
    
    # --- KONDISI 1: DATA TUNGGAL ---
    if data_type == 'tunggal':
        # Rumus: Max - Min
        val_max = df['xi_value'].max()
        val_min = df['xi_value'].min()
        range_val = val_max - val_min
        
        latex_str = (
            r"\begin{aligned}"
            # Langkah 1
            # r"& \text{1. Rumus:}" "\\"
            r"& R = x_{max} - x_{min} \\[1em]"
            
            # Langkah 2
            # r"& \text{2. Substitusi:}" "\\"
            fr"& R = {fmt(val_max,precision)} - {fmt(val_min,precision)} \\[1em]"
            
            # Langkah 3
            # r"& \text{3. Hasil Akhir:}" "\\"
            fr"& \mathbf{{R = {fmt(range_val,precision)}}}"
            r"\end{aligned}"
        )
        
        return {"value": float(range_val), "latex": f"$$ {latex_str} $$"}

    # --- KONDISI 2: DATA KELOMPOK ---
    else:
        # Rumus: Tepi Atas Kelas Terakhir - Tepi Bawah Kelas Pertama
        
        # 1. Identifikasi Kelas Pertama & Tepi Bawah (Tb)
        first_row = df.iloc[0]
        # Parsing "10 - 19"
        first_interval = str(first_row['xi_display']).split(' - ')
        limit_bawah = int(first_interval[0])
        Tb = limit_bawah - 0.5
        
        # 2. Identifikasi Kelas Terakhir & Tepi Atas (Ta)
        last_row = df.iloc[-1]
        last_interval = str(last_row['xi_display']).split(' - ')
        limit_atas = int(last_interval[1])
        Ta = limit_atas + 0.5
        
        # 3. Hitung
        range_val = Ta - Tb
        
        latex_str = (
            r"\begin{aligned}"
            # Langkah 1: Rumus
            # r"& \text{1. Rumus (Data Kelompok):}" "\\"
            r"& R = Ta_{akhir} - Tb_{awal} \\"
            r"& \text{(Tepi Atas Kelas Terakhir - Tepi Bawah Kelas Pertama)} \\[1em]"
            
            # Langkah 2: Identifikasi
            # r"& \text{2. Identifikasi Nilai:}" "\\"
            fr"& \text{{Kelas Pertama: }} \mathbf{{{first_row['xi_display']}}} \rightarrow Tb = {limit_bawah} - 0.5 = {fmt(Tb)} \\"
            fr"& \text{{Kelas Terakhir: }} \mathbf{{{last_row['xi_display']}}} \rightarrow Ta = {limit_atas} + 0.5 = {fmt(Ta)} \\[1em]"
            
            # Langkah 3: Substitusi
            # r"& \text{3. Substitusi:}" "\\"
            fr"& R = {fmt(Ta,precision)} - {fmt(Tb,precision)} \\[1em]"
            
            # Langkah 4: Hasil
            # r"& \text{4. Hasil Akhir:}" "\\"
            fr"& \mathbf{{R = {fmt(range_val,precision)}}}"
            r"\end{aligned}"
        )
        
        return {"value": float(range_val), "latex": f"$$ {latex_str} $$"}