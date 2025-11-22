"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// --- TYPE & DATA DUMMY ---
type TableRow = {
  id: number;
  xi: string;
  fi: string;
};

const tableData = [
  { id: 1, xi: "10 - 14", fi: 5, fk: 5, fkp: "10%" },
  { id: 2, xi: "15 - 19", fi: 8, fk: 13, fkp: "26%" },
  { id: 3, xi: "20 - 24", fi: 12, fk: 25, fkp: "50%" },
  { id: 4, xi: "25 - 29", fi: 15, fk: 40, fkp: "80%" },
  { id: 5, xi: "30 - 34", fi: 10, fk: 50, fkp: "100%" },
];

const chartData = tableData.map((item) => ({
  name: item.xi,
  Frekuensi: item.fi,
}));

const statsData = [
  { label: "Mean", value: "24.5", symbol: "x̄" },
  { label: "Median dan Q2", value: "23.8", symbol: "Me" },
  { label: "Modus", value: "26.2", symbol: "Mo" },
  { label: "Varian", value: "42.3", symbol: "S²" },
  { label: "Std. Deviasi", value: "6.5", symbol: "S" },
  { label: "Jangkauan (Range)", value: "24", symbol: "R" },
  { label: "Kuartil 1 (Q1)", value: "18.5", symbol: "Q1" },
  { label: "Kuartil 3 (Q3)", value: "29.1", symbol: "Q3" },
];

// --- COMPONENT: ACCORDION ITEM ---
const StepAccordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-3 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center p-4 text-left font-medium transition-colors ${
          isOpen
            ? "bg-[#DB3F59] text-white"
            : "bg-white dark:bg-semidark text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-5 bg-gray-50 dark:bg-darkmode text-gray-600 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-200 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};

// --- COMPONENT: SIDEBAR LINK ---
// --- COMPONENT: SIDEBAR LINK (Updated) ---
const SidebarLink = ({ 
  href, 
  label, 
  icon, 
  isExpanded 
}: { 
  href: string; 
  label: string; 
  icon: React.ReactNode; 
  isExpanded: boolean; 
}) => (
  <a
    href={href}
    className={`group flex items-center rounded-lg hover:bg-red-50 hover:text-[#DB3F59] dark:hover:bg-gray-800 dark:hover:text-[#DB3F59] transition-all duration-300
      ${isExpanded ? "px-4 py-3 gap-3 justify-start" : "p-3 justify-center"} 
    `}
    title={!isExpanded ? label : ""} // Tooltip bawaan saat collapsed
  >
    <div className="text-gray-400 group-hover:text-[#DB3F59] transition-colors flex-shrink-0">
      {icon}
    </div>
    {/* Label dengan animasi opacity dan width */}
    <div 
      className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out
        ${isExpanded ? "w-32 opacity-100 ml-0" : "w-0 opacity-0 ml-0"}
      `}
    >
      <span className="font-medium text-sm text-gray-600 dark:text-gray-300 group-hover:text-[#DB3F59]">
        {label}
      </span>
    </div>
  </a>
);

export default function CentralTendencyPage() {
  const [isTableInput, setIsTableInput] = useState(false);
  const [dataType, setDataType] = useState<"single" | "grouped">("single");
  const [rawInput, setRawInput] = useState("");
  const [intervalSize, setIntervalSize] = useState("");
  const [tableRows, setTableRows] = useState<TableRow[]>([{ id: 1, xi: "", fi: "" }]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const addRow = () => {
    const newId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1;
    setTableRows([...tableRows, { id: newId, xi: "", fi: "" }]);
  };

  const removeRow = (id: number) => {
    if (tableRows.length > 1) {
      setTableRows(tableRows.filter((row) => row.id !== id));
    }
  };

  const handleRowChange = (id: number, field: "xi" | "fi", value: string) => {
    const updatedRows = tableRows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setTableRows(updatedRows);
  };

  const handleModeChange = () => {
    setRawInput("");
    setIntervalSize("");
    setTableRows([{ id: 1, xi: "", fi: "" }]);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-darkmode pt-8 px-4 pb-20 transition-colors duration-300">
      
      {/* MAIN GRID LAYOUT: 12 Columns */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-7 items-start transition-all duration-300 ease-in-out">
      <aside 
          className={`hidden lg:block h-full transition-all duration-300 ease-in-out
            ${isSidebarOpen ? "lg:col-span-3" : "lg:col-span-1"}
          `}
        >
          <div className="sticky top-28 bg-white dark:bg-semidark rounded-xl shadow-lg py-4 px-2 dark:border-gray-800 transition-all duration-300">
            
            {/* HEADER SIDEBAR (Tombol Toggle) */}
            <div className={`mb-2 flex items-center transition-all duration-300 ${isSidebarOpen ? "justify-between px-2" : "justify-center"}`}>
              
              {/* Judul Navigasi (Hanya muncul saat Expanded) */}
              <h3 
                className={`text-[#DB3F59] font-bold text-lg whitespace-nowrap overflow-hidden transition-all duration-300
                  ${isSidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0 hidden"}
                `}
              >
                Navigasi
              </h3>

              {/* TOMBOL HAMBURGER / TOGGLE */}
              <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-[#DB3F59] transition-colors focus:outline-none"
              >
                {/* Icon Strip 3 (Menu) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* LINKS */}
            <nav className="flex flex-col gap-1">
              <SidebarLink 
                href="#input" 
                label="Input Data" 
                isExpanded={isSidebarOpen} // Pass state ke link
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>}
              />
              <SidebarLink 
                href="#solusi" 
                label="Solusi & Hasil" 
                isExpanded={isSidebarOpen}
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>}
              />
              <SidebarLink 
                href="#stepbystep" 
                label="Step by Step" 
                isExpanded={isSidebarOpen}
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>}
              />
              <SidebarLink 
                href="#grafik" 
                label="Grafik" 
                isExpanded={isSidebarOpen}
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>}
              />
            </nav>
          </div>
        </aside>

        <main className={`col-span-1 flex flex-col gap-6 transition-all duration-300 ease-in-out mt-20
            ${isSidebarOpen ? "lg:col-span-9" : "lg:col-span-11"}
          `}>
          
          {/* 1. BAGIAN INPUT */}
          <section id="input" >
            <div className="bg-white dark:bg-semidark rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 space-y-8">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-200 dark:border-gray-700 pb-6">
                  {/* Radio Type */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Jenis Data</label>
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer gap-2">
                        <input type="radio" name="dataType" value="single" checked={dataType === "single"} onChange={() => { setDataType("single"); handleModeChange(); }} className="w-5 h-5 text-[#DB3F59] focus:ring-[#DB3F59]" />
                        <span className="text-gray-700 dark:text-gray-300">Data Tunggal</span>
                      </label>
                      <label className="flex items-center cursor-pointer gap-2">
                        <input type="radio" name="dataType" value="grouped" checked={dataType === "grouped"} onChange={() => { setDataType("grouped"); handleModeChange(); }} className="w-5 h-5 text-[#DB3F59] focus:ring-[#DB3F59]" />
                        <span className="text-gray-700 dark:text-gray-300">Data Kelompok</span>
                      </label>
                    </div>
                  </div>
                  {/* Switch Input Method */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Metode Input</label>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm ${!isTableInput ? 'font-bold text-[#DB3F59]' : 'text-gray-500'}`}>Deret Angka</span>
                      <button onClick={() => { setIsTableInput(!isTableInput); handleModeChange(); }} className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${isTableInput ? "bg-[#DB3F59]" : "bg-[#dbdbdb]"}`}>
                        <span className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isTableInput ? "translate-x-7" : "translate-x-0"}`} />
                      </button>
                      <span className={`text-sm ${isTableInput ? 'font-bold text-[#DB3F59]' : 'text-gray-500'}`}>Tabel Distribusi</span>
                    </div>
                  </div>
                </div>

                {/* Input Forms */}
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-4">Masukkan Data</h3>
                  {!isTableInput && (
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">Masukkan angka dipisahkan dengan koma</label>
                        <textarea rows={4} value={rawInput} onChange={(e) => setRawInput(e.target.value)} placeholder="10, 12, 15, 20..." className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-darkmode text-gray-900 dark:text-white focus:ring-2 focus:ring-[#DB3F59] focus:outline-none transition-all" />
                      </div>
                      {dataType === "grouped" && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                          <label className="block text-sm font-medium text-gray-700 dark:text-blue-100 mb-2">Panjang Kelas / Interval (p)</label>
                          <input type="number" value={intervalSize} onChange={(e) => setIntervalSize(e.target.value)} placeholder="Cth: 5" className="w-full md:w-1/3 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkmode text-gray-900 dark:text-white focus:ring-2 focus:ring-[#DB3F59] outline-none" />
                        </div>
                      )}
                    </div>
                  )}
                  {isTableInput && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="p-3 text-sm font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 w-[10%] text-center">No</th>
                            <th className="p-3 text-sm font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 w-[40%]">{dataType === "single" ? "Nilai (xi)" : "Rentang Kelas (p-q)"}</th>
                            <th className="p-3 text-sm font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 w-[30%]">Frekuensi (fi)</th>
                            <th className="p-3 text-sm font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 w-[10%] text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableRows.map((row, index) => (
                            <tr key={row.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                              <td className="p-3 text-center text-gray-500 dark:text-gray-400">{index + 1}</td>
                              <td className="p-3"><input type="text" value={row.xi} onChange={(e) => handleRowChange(row.id, "xi", e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkmode text-gray-900 dark:text-white focus:border-[#DB3F59] focus:ring-1 focus:ring-[#DB3F59] outline-none" /></td>
                              <td className="p-3"><input type="number" value={row.fi} onChange={(e) => handleRowChange(row.id, "fi", e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkmode text-gray-900 dark:text-white focus:border-[#DB3F59] focus:ring-1 focus:ring-[#DB3F59] outline-none" /></td>
                              <td className="p-3 text-center"><button onClick={() => removeRow(row.id)} disabled={tableRows.length === 1} className="text-red-500 hover:text-red-700 disabled:opacity-30"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-4"><button onClick={addRow} className="flex items-center gap-2 text-sm font-medium text-[#DB3F59] hover:text-red-700 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>Tambah Baris</button></div>
                    </div>
                  )}
                </div>
                <div className="pt-6">
                  <button className="w-full bg-[#DB3F59] hover:bg-red-700 text-white font-bold py-4 rounded-lg shadow-lg transition-all transform active:scale-[0.98]">Hitung Hasil</button>
                </div>
              </div>
            </div>
          </section>

          {/* 2. BAGIAN SOLUSI */}
          <section id="solusi" className="space-y-6 scroll-mt-32">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-[#DB3F59] rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">1. Solusi & Hasil Akhir</h2>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Tabel */}
              <div className="bg-white dark:bg-semidark rounded-xl shadow-lg overflow-hidden h-fit">
      
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#DB3F59] text-white">
                        <th className="p-3 text-sm font-medium text-center">No</th>
                        <th className="p-3 text-sm font-medium">Xi</th>
                        <th className="p-3 text-sm font-medium text-center">Fi</th>
                        <th className="p-3 text-sm font-medium text-center">FK</th>
                        <th className="p-3 text-sm font-medium text-center">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="p-3 text-center text-gray-500 dark:text-gray-400">{index + 1}</td>
                          <td className="p-3 font-medium text-gray-800 dark:text-gray-200">{row.xi}</td>
                          <td className="p-3 text-center text-gray-600 dark:text-gray-300">{row.fi}</td>
                          <td className="p-3 text-center text-gray-600 dark:text-gray-300">{row.fk}</td>
                          <td className="p-3 text-center text-blue-600 dark:text-blue-400 font-medium">{row.fkp}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-100 dark:bg-gray-800 font-bold">
                      <td colSpan={2} className="p-3 text-right text-gray-700 dark:text-white">Total (Σ)</td>
                      <td className="p-3 text-center text-[#DB3F59]">50</td>
                      <td colSpan={2}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Kartu Statistik */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 h-fit">
                {statsData.map((stat, idx) => (
                  <div 
                    key={idx} 
                    // UPDATE: Padding diperkecil di HP (p-2.5) dan border kiri sedikit ditipiskan
                    className="bg-white dark:bg-semidark p-2.5 sm:p-3 rounded-xl shadow-md border-l-[3px] sm:border-l-4 border-[#DB3F59] flex justify-between items-center"
                  >
                    <div className="min-w-0"> {/* min-w-0 penting agar truncate berfungsi di dalam flex */}
                      
                      {/* UPDATE: Font size label diperkecil sedikit di HP */}
                      <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider truncate">
                        {stat.label}
                      </p>
                      
                      {/* UPDATE: Font size value disesuaikan agar angka besar tidak pecah layout */}
                      <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mt-0.5 truncate" title={stat.value}>
                        {stat.value}
                      </p>
                    </div>

                    {/* UPDATE: Ukuran lingkaran icon disesuaikan (w-7 h-7 di HP) */}
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-50 dark:bg-gray-700 flex items-center justify-center text-[#DB3F59] font-serif font-bold italic text-xs sm:text-sm ml-2">
                      {stat.symbol}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. BAGIAN STEP BY STEP */}
{/* 3. BAGIAN STEP BY STEP */}
          <section id="stepbystep" className="space-y-4 md:space-y-6 scroll-mt-24 md:scroll-mt-32">
            
            {/* Header Section */}
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <div className="w-1 h-6 md:h-8 bg-[#DB3F59] rounded-full"></div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                2. Step by Step Perhitungan
              </h2>
            </div>

            {/* Content Container */}
            {/* UPDATE: Padding p-4 di HP, p-6 di Desktop */}
            <div className="bg-white dark:bg-semidark rounded-xl shadow-lg p-4 md:p-6">
              {statsData.map((stat, idx) => (
                <StepAccordion key={idx} title={`Cara Mencari ${stat.label}`}>
                  <div className="space-y-3 text-sm md:text-base">
                    <p>Penjelasan rumus dan perhitungan...</p>
                  </div>
                </StepAccordion>
              ))}
            </div>
          </section>

          {/* 4. BAGIAN GRAFIK */}
          <section id="grafik" className="space-y-4 md:space-y-6 scroll-mt-24 md:scroll-mt-32">
            
            {/* Header Section */}
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <div className="w-1 h-6 md:h-8 bg-[#DB3F59] rounded-full"></div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                3. Visualisasi Grafik
              </h2>
            </div>

            {/* Chart Container */}
            {/* UPDATE: Tinggi h-[300px] di HP agar compact, h-[400px] di Desktop */}
            {/* UPDATE: Padding p-4 di HP, p-6 di Desktop */}
            <div className="bg-white dark:bg-semidark rounded-xl shadow-lg p-4 md:p-6 h-[300px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}> 
                  {/* Margin left -20 di Recharts kadang diperlukan di HP untuk menghemat ruang whitespace kiri */}
                  
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} vertical={false} />
                  
                  <XAxis 
                    dataKey="name" 
                    stroke="#6b7280" 
                    tick={{ fill: '#6b7280', fontSize: 12 }} // Font diperkecil agar muat di HP
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  
                  <YAxis 
                    stroke="#6b7280" 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    tickLine={false}
                    axisLine={false}
                  />
                  
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      fontSize: '14px'
                    }} 
                  />
                  
                  <Bar 
                    dataKey="Frekuensi" 
                    fill="#DB3F59" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40} // Ukuran batang optimal agar tidak terlalu kurus di desktop/lebar di HP
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}