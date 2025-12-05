// src/app/(site)/kalkulator/CentralTendencyClient.tsx
"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Latex from "react-latex-next";
import HeroSub3 from "@/app/components/shared/hero-sub3 copy";

// --- TYPE & DATA DUMMY ---
type TableRow = {
  id: number;
  xi: string;
  fi: string;
};

type ApiResult = {
  status: string;
  data_summary: { total_data: number; data_type: string };
  frequency_table: {
    no: number;
    xi_display: string;
    xi_value: number;
    fi: number;
    fk: number;
    percentage: string;
  }[];
  charts: {
    frequency_data: { label: string; value: number; tooltip_info: string }[];
    cumulative_data: { label: string; value: number; tooltip_info: string }[];
  };
  steps: {
    mean: { value: number; latex: string };
    median: { value: number; latex: string };
    mode: { value: number; latex: string };
    range: { value: number; latex: string };
    variance: { value: number; latex: string };
    std_dev: { value: number; latex: string };
    q1: { value: number; latex: string };
    q3: { value: number; latex: string };
  };
};

// --- COMPONENT: ACCORDION ITEM ---
const StepAccordion = ({
  title,
  latexContent,
}: {
  title: string;
  latexContent: string;
}) => {
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
          className={`w-5 h-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-5 bg-gray-50 dark:bg-darkmode text-gray-800 dark:text-gray-200 text-base leading-relaxed border-t border-gray-200 dark:border-gray-700 overflow-x-auto">
          {/* Render LaTeX disini */}
          <Latex>{latexContent}</Latex>
        </div>
      )}
    </div>
  );
};

// --- COMPONENT: SIDEBAR LINK ---
const SidebarLink = ({
  href,
  label,
  icon,
  isExpanded,
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

const parseAndSplitRow = (xiStr: string, freq: number) => {
  const cleanStr = xiStr.replace(/\s/g, "");

  if (cleanStr.includes("-")) {
    const parts = cleanStr.split("-");
    const lower = parseFloat(parts[0]);
    const upper = parseFloat(parts[1]);

    if (!isNaN(lower) && !isNaN(upper)) {
      const countLower = freq - 1;
      const countUpper = 1;

      const result = [];

      if (countLower > 0) {
        result.push({ value: lower, frequency: countLower });
      }

      if (freq > 0) {
        result.push({ value: upper, frequency: countUpper });
      }

      return result;
    }
  }

  return [{ value: parseFloat(cleanStr), frequency: freq }];
};

export default function CentralTendencyClient() {
  const [isTableInput, setIsTableInput] = useState(false);
  const [dataType, setDataType] = useState<"single" | "grouped">("single");
  const [rawInput, setRawInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [intervalSize, setIntervalSize] = useState("");
  const [tableRows, setTableRows] = useState<TableRow[]>([
    { id: 1, xi: "", fi: "" },
  ]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [apiResult, setApiResult] = useState<ApiResult | null>(null);
  const [chartType, setChartType] = useState<"frequency" | "cumulative">(
    "frequency"
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleModeChange = () => {
    setRawInput("");
    setIntervalSize("");
    setTableRows([{ id: 1, xi: "", fi: "" }]);

    // PENTING: Hapus hasil sebelumnya agar form kembali bersih
    // setApiResult(null);
    setErrorMsg(null);
  };

  const addRow = () => {
    const newId =
      tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1;
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

  const handleCalculate = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setApiResult(null);

    try {
      let payload: any = {
        data_type: dataType === "single" ? "tunggal" : "kelompok",
        input_mode: isTableInput ? "table" : "raw",
      };

      if (isTableInput && dataType === "grouped") {
        const firstValidRange = tableRows.find(
          (row) => row.xi && row.xi.includes("-")
        );

        if (firstValidRange) {
          const cleanStr = firstValidRange.xi.replace(/\s/g, "");
          const parts = cleanStr.split("-");

          if (parts.length === 2) {
            const lower = parseFloat(parts[0]);
            const upper = parseFloat(parts[1]);

            if (!isNaN(lower) && !isNaN(upper)) {
              const calculatedInterval = upper - lower + 1;

              payload.class_interval = calculatedInterval;
            }
          }
        }
      }

      // ============================================================
      // SKENARIO A & B: INPUT DERET ANGKA (RAW DATA)
      // ============================================================
      if (!isTableInput) {
        if (!rawInput.trim()) {
          throw new Error("Kolom deret angka tidak boleh kosong.");
        }

        const parsedData = rawInput
          .split(/[\s,]+/)
          .map((s) => parseFloat(s.trim()))
          .filter((n) => !isNaN(n));

        if (parsedData.length === 0) {
          throw new Error(
            "Format data salah. Pastikan hanya memasukkan angka."
          );
        }

        payload.raw_data = parsedData;

        if (dataType === "grouped" && intervalSize) {
          const interval = parseInt(intervalSize);
          if (interval > 0) {
            payload.class_interval = interval;
          }
        }
      }

      // ============================================================
      // SKENARIO C & D: INPUT TABEL DISTRIBUSI
      // ============================================================
      else {
        const validRows = tableRows.filter((row) => row.xi && row.fi);

        if (validRows.length === 0) {
          throw new Error("Mohon isi data pada tabel terlebih dahulu.");
        }

        const parsedTable = validRows.flatMap((row, idx) => {
          const freq = parseInt(row.fi);

          if (isNaN(freq) || freq < 0) {
            throw new Error(
              `Baris ke-${idx + 1}: Frekuensi harus angka valid.`
            );
          }

          if (dataType === "grouped") {
            const splitResult = parseAndSplitRow(row.xi, freq);

            if (splitResult.some((item) => isNaN(item.value))) {
              throw new Error(
                `Baris ke-${idx + 1}: Format rentang salah. Gunakan "Bawah-Atas" (cth: 151-155).`
              );
            }

            return splitResult;
          } else {
            const val = parseFloat(row.xi);
            if (isNaN(val))
              throw new Error(`Baris ke-${idx + 1}: Nilai harus angka.`);

            return [{ value: val, frequency: freq }];
          }
        });

        payload.table_data = parsedTable;
      }
      console.log(JSON.stringify(payload));
      // ============================================================
      // 3. KIRIM KE BACKEND (POST REQUEST)
      // ============================================================
      const res = await fetch(
        "https://ab4621ba733e.ngrok-free.app/calculate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Terjadi kesalahan pada server.");
      }

      setApiResult(data);
      console.log(data);
      setTimeout(() => {
        const element = document.getElementById("solusi");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      console.error("Calculation Error:", err);
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const statItems = [
    { key: "mean", label: "Mean", symbol: "x̄" },
    { key: "median", label: "Median", symbol: "Me" },
    { key: "mode", label: "Modus", symbol: "Mo" },
    { key: "variance", label: "Varian", symbol: "S²" },
    { key: "std_dev", label: "Std. Deviasi", symbol: "S" },
    { key: "range", label: "Range", symbol: "R" },
    { key: "q1", label: "Kuartil 1 (Q1)", symbol: "Q1" },
    { key: "q3", label: "Kuartil 3 (Q3)", symbol: "Q3" },
  ] as const;

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
            <div
              className={`mb-2 flex items-center transition-all duration-300 ${
                isSidebarOpen ? "justify-between px-2" : "justify-center"
              }`}
            >
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="M2 2l7.586 7.586" />
                    <circle cx="11" cy="11" r="2" />
                  </svg>
                }
              />
              {apiResult && (
                <>
                  <SidebarLink
                    href="#solusi"
                    label="Solusi & Hasil"
                    isExpanded={isSidebarOpen}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    }
                  />
                  <SidebarLink
                    href="#stepbystep"
                    label="Step by Step"
                    isExpanded={isSidebarOpen}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                      </svg>
                    }
                  />
                  <SidebarLink
                    href="#grafik"
                    label="Grafik"
                    isExpanded={isSidebarOpen}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                      </svg>
                    }
                  />
                </>
              )}
            </nav>
          </div>
        </aside>

        <main
          className={`col-span-1 flex flex-col gap-6 transition-all duration-300 ease-in-out mt-20
            ${isSidebarOpen ? "lg:col-span-9" : "lg:col-span-11"}
          `}
        >
          {/* 1. BAGIAN INPUT */}
          <section id="input">
            <div className="bg-white dark:bg-semidark rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 space-y-8">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-200 dark:border-gray-700 pb-6">
                  {/* Radio Type */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Jenis Data
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer gap-2">
                        <input
                          type="radio"
                          name="dataType"
                          value="single"
                          checked={dataType === "single"}
                          onChange={() => {
                            setDataType("single");
                            handleModeChange();
                          }}
                          className="w-5 h-5 text-[#DB3F59] focus:ring-[#DB3F59]"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          Data Tunggal
                        </span>
                      </label>
                      <label className="flex items-center cursor-pointer gap-2">
                        <input
                          type="radio"
                          name="dataType"
                          value="grouped"
                          checked={dataType === "grouped"}
                          onChange={() => {
                            setDataType("grouped");
                            handleModeChange();
                          }}
                          className="w-5 h-5 text-[#DB3F59] focus:ring-[#DB3F59]"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          Data Kelompok
                        </span>
                      </label>
                    </div>
                  </div>
                  {/* Switch Input Method */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Metode Input
                    </label>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm ${
                          !isTableInput
                            ? "font-bold text-[#DB3F59]"
                            : "text-gray-500"
                        }`}
                      >
                        Deret Angka
                      </span>
                      <button
                        onClick={() => {
                          setIsTableInput(!isTableInput);
                          handleModeChange();
                        }}
                        className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${
                          isTableInput ? "bg-[#DB3F59]" : "bg-[#dbdbdb]"
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                            isTableInput ? "translate-x-7" : "translate-x-0"
                          }`}
                        />
                      </button>
                      <span
                        className={`text-sm ${
                          isTableInput
                            ? "font-bold text-[#DB3F59]"
                            : "text-gray-500"
                        }`}
                      >
                        Tabel Distribusi
                      </span>
                    </div>
                  </div>
                </div>

                {/* Input Forms */}
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                    Masukkan Data
                  </h3>
                  {!isTableInput && (
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">
                          Masukkan angka dipisahkan dengan koma
                        </label>
                        <textarea
                          rows={4}
                          value={rawInput}
                          onChange={(e) => setRawInput(e.target.value)}
                          placeholder="10, 12, 15, 20..."
                          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-darkmode text-gray-900 dark:text-white focus:ring-2 focus:ring-[#DB3F59] focus:outline-none transition-all"
                        />
                      </div>
                      {dataType === "grouped" && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                          <label className="block text-sm font-medium text-gray-700 dark:text-blue-100 mb-2">
                            Panjang Kelas / Interval (p)
                          </label>
                          <input
                            type="number"
                            value={intervalSize}
                            onChange={(e) => setIntervalSize(e.target.value)}
                            placeholder="Cth: 5"
                            className="w-full md:w-1/3 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkmode text-gray-900 dark:text-white focus:ring-2 focus:ring-[#DB3F59] outline-none"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {isTableInput && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="p-3 text-sm font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 w-[10%] text-center">
                              No
                            </th>
                            <th className="p-3 text-sm font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 w-[40%]">
                              {dataType === "single"
                                ? "Nilai (xi)"
                                : "Rentang Kelas (p-q)"}
                            </th>
                            <th className="p-3 text-sm font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 w-[30%]">
                              Frekuensi (fi)
                            </th>
                            <th className="p-3 text-sm font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 w-[10%] text-center">
                              Aksi
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableRows.map((row, index) => (
                            <tr
                              key={row.id}
                              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            >
                              <td className="p-3 text-center text-gray-500 dark:text-gray-400">
                                {index + 1}
                              </td>
                              <td className="p-3">
                                <input
                                  type="text"
                                  value={row.xi}
                                  onChange={(e) =>
                                    handleRowChange(
                                      row.id,
                                      "xi",
                                      e.target.value
                                    )
                                  }
                                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkmode text-gray-900 dark:text-white focus:border-[#DB3F59] focus:ring-1 focus:ring-[#DB3F59] outline-none"
                                />
                              </td>
                              <td className="p-3">
                                <input
                                  type="number"
                                  value={row.fi}
                                  onChange={(e) =>
                                    handleRowChange(
                                      row.id,
                                      "fi",
                                      e.target.value
                                    )
                                  }
                                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkmode text-gray-900 dark:text-white focus:border-[#DB3F59] focus:ring-1 focus:ring-[#DB3F59] outline-none"
                                />
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => removeRow(row.id)}
                                  disabled={tableRows.length === 1}
                                  className="text-red-500 hover:text-red-700 disabled:opacity-30"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M3 6h18" />
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-4">
                        <button
                          onClick={addRow}
                          className="flex items-center gap-2 text-sm font-medium text-[#DB3F59] hover:text-red-700 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                          </svg>
                          Tambah Baris
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {errorMsg && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{errorMsg}</span>
                  </div>
                )}

                <div className="pt-6">
                  <button
                    onClick={handleCalculate}
                    disabled={isLoading}
                    className={`w-full bg-[#DB3F59] hover:bg-red-700 text-white font-bold py-4 rounded-lg shadow-lg transition-all transform active:scale-[0.98] flex justify-center items-center
                      ${isLoading ? "opacity-75 cursor-not-allowed" : ""}
                    `}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Memproses...
                      </span>
                    ) : (
                      "Hitung Hasil"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {apiResult ? (
            <>
              {/* 2. BAGIAN SOLUSI */}
              <section
                id="solusi"
                className="space-y-6 scroll-mt-32 animate-fade-in"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-[#DB3F59] rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    1. Solusi & Hasil Akhir
                  </h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* A. TABEL DISTRIBUSI FREKUENSI */}
                  <div className="bg-white dark:bg-semidark rounded-xl shadow-lg overflow-hidden h-fit">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#DB3F59] text-white">
                            <th className="p-3 text-sm font-medium text-center">
                              No
                            </th>
                            <th className="p-3 text-sm font-medium">
                              {apiResult.data_summary.data_type === "kelompok"
                                ? "Rentang Kelas"
                                : "Nilai (Xi)"}
                            </th>
                            <th className="p-3 text-sm font-medium text-center">
                              Fi
                            </th>
                            <th className="p-3 text-sm font-medium text-center">
                              FK
                            </th>
                            <th className="p-3 text-sm font-medium text-center">
                              %
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {apiResult.frequency_table.map((row) => (
                            <tr
                              key={row.no}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                              <td className="p-3 text-center text-gray-500 dark:text-gray-400">
                                {row.no}
                              </td>
                              <td className="p-3 font-medium text-gray-800 dark:text-gray-200">
                                {row.xi_display}
                              </td>
                              <td className="p-3 text-center text-gray-600 dark:text-gray-300">
                                {row.fi}
                              </td>
                              <td className="p-3 text-center text-gray-600 dark:text-gray-300">
                                {row.fk}
                              </td>
                              <td className="p-3 text-center text-blue-600 dark:text-blue-400 font-medium">
                                {row.percentage}
                              </td>
                            </tr>
                          ))}
                          {/* FOOTER TOTAL */}
                          <tr className="bg-gray-100 dark:bg-gray-800 font-bold border-t border-gray-200 dark:border-gray-700">
                            <td
                              colSpan={2}
                              className="p-3 text-right text-gray-700 dark:text-white"
                            >
                              Total (Σ)
                            </td>
                            <td className="p-3 text-center text-[#DB3F59]">
                              {apiResult.data_summary.total_data}
                            </td>
                            <td colSpan={2}></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* B. KARTU STATISTIK (Dynamic Rendering) */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 h-fit">
                    {statItems.map((item) => {
                      // Ambil data spesifik dari apiResult berdasarkan key (mean, median, dll)
                      // @ts-ignore (untuk bypass strict type check key akses)
                      const statData = apiResult.steps[item.key];

                      return (
                        <div
                          key={item.key}
                          className="bg-white dark:bg-semidark p-2.5 sm:p-3 rounded-xl shadow-md border-l-[3px] sm:border-l-4 border-[#DB3F59] flex justify-between items-center transform transition-transform hover:scale-[1.02] duration-200"
                        >
                          <div className="min-w-0">
                            <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider truncate">
                              {item.label}
                            </p>
                            <p
                              className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mt-0.5 truncate"
                              title={String(statData.value)}
                            >
                              {/* Format Angka: Maksimal 2 desimal, format Indonesia (koma) */}
                              {Number(statData.value).toLocaleString("id-ID", {
                                maximumFractionDigits: 8,
                              })}
                            </p>
                          </div>
                          <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-50 dark:bg-gray-700 flex items-center justify-center text-[#DB3F59] font-serif font-bold italic text-xs sm:text-sm ml-2">
                            {item.symbol}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* 3. BAGIAN STEP BY STEP */}
              <section
                id="stepbystep"
                className="space-y-4 md:space-y-6 scroll-mt-24 md:scroll-mt-32"
              >
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="w-1 h-6 md:h-8 bg-[#DB3F59] rounded-full"></div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                    2. Step by Step Perhitungan
                  </h2>
                </div>

                <div className="bg-white dark:bg-semidark rounded-xl shadow-lg p-4 md:p-6">
                  {/* Kita gunakan komponen StepAccordion yang sudah dimodifikasi dengan <Latex> sebelumnya */}

                  <StepAccordion
                    title="Cara Mencari Mean (Rata-rata)"
                    latexContent={apiResult.steps.mean.latex}
                  />

                  <StepAccordion
                    title="Cara Mencari Median (Nilai Tengah)"
                    latexContent={apiResult.steps.median.latex}
                  />

                  <StepAccordion
                    title="Cara Mencari Modus"
                    latexContent={apiResult.steps.mode.latex}
                  />

                  <StepAccordion
                    title="Cara Mencari Range (Jangkauan)"
                    latexContent={apiResult.steps.range.latex}
                  />

                  <StepAccordion
                    title="Cara Mencari Varian"
                    latexContent={apiResult.steps.variance.latex}
                  />

                  <StepAccordion
                    title="Cara Mencari Standar Deviasi"
                    latexContent={apiResult.steps.std_dev.latex}
                  />

                  <StepAccordion
                    title="Cara Mencari Kuartil 1 (Q1)"
                    latexContent={apiResult.steps.q1.latex}
                  />

                  <StepAccordion
                    title="Cara Mencari Kuartil 3 (Q3)"
                    latexContent={apiResult.steps.q3.latex}
                  />
                </div>
              </section>

              {/* 4. BAGIAN GRAFIK */}
              <section
                id="grafik"
                className="space-y-4 md:space-y-6 scroll-mt-24 md:scroll-mt-32"
              >
                {/* HEADER SECTION: Judul & Toggle Button */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
                  {/* Judul */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-1 h-6 md:h-8 bg-[#DB3F59] rounded-full"></div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                      3. Visualisasi Grafik
                    </h2>
                  </div>

                  {/* Toggle Button (Frekuensi vs Kumulatif) */}
                  <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded-lg flex text-sm font-medium self-start md:self-auto shadow-inner">
                    <button
                      onClick={() => setChartType("frequency")}
                      className={`px-4 py-2 rounded-md transition-all duration-300 ${
                        chartType === "frequency"
                          ? "bg-white dark:bg-semidark text-[#DB3F59] shadow-sm font-bold"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      }`}
                    >
                      Frekuensi (Bar)
                    </button>
                    <button
                      onClick={() => setChartType("cumulative")}
                      className={`px-4 py-2 rounded-md transition-all duration-300 ${
                        chartType === "cumulative"
                          ? "bg-white dark:bg-semidark text-[#DB3F59] shadow-sm font-bold"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      }`}
                    >
                      Kumulatif (Line)
                    </button>
                  </div>
                </div>

                {/* CHART CONTAINER */}
                <div className="bg-white dark:bg-semidark rounded-xl shadow-lg p-4 md:p-6 h-[350px] md:h-[450px] transition-all duration-300 border border-transparent dark:border-gray-800">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === "frequency" ? (
                      // --- OPSI 1: BAR CHART (FREKUENSI) ---
                      <BarChart
                        data={apiResult.charts.frequency_data}
                        margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#e5e7eb"
                          opacity={0.5}
                          vertical={false}
                        />

                        <XAxis
                          dataKey="label"
                          stroke="#9ca3af"
                          tick={{ fill: "#6b7280", fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          dy={10}
                        />

                        <YAxis
                          stroke="#9ca3af"
                          tick={{ fill: "#6b7280", fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                        />

                        <Tooltip
                          cursor={{ fill: "rgba(219, 63, 89, 0.1)" }} // Highlight bar saat hover
                          contentStyle={{
                            backgroundColor: "#fff",
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                            color: "#374151",
                          }}
                        />

                        <Bar
                          dataKey="value"
                          name="Frekuensi"
                          fill="#DB3F59"
                          radius={[6, 6, 0, 0]} // Rounded top corners
                          barSize={50}
                          animationDuration={1500}
                        />
                      </BarChart>
                    ) : (
                      // --- OPSI 2: LINE CHART (KUMULATIF/OGIVE) ---
                      <LineChart
                        data={apiResult.charts.cumulative_data}
                        margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#e5e7eb"
                          opacity={0.5}
                          vertical={false}
                        />

                        <XAxis
                          dataKey="label"
                          stroke="#9ca3af"
                          tick={{ fill: "#6b7280", fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          dy={10}
                        />

                        <YAxis
                          stroke="#9ca3af"
                          tick={{ fill: "#6b7280", fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                        />

                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                            color: "#374151",
                          }}
                        />

                        <Line
                          type="monotone" // Garis lengkung halus
                          dataKey="value"
                          name="Persentase Kumulatif"
                          stroke="#DB3F59"
                          strokeWidth={4}
                          dot={{
                            r: 5,
                            fill: "#DB3F59",
                            strokeWidth: 2,
                            stroke: "#fff",
                          }}
                          activeDot={{ r: 8, fill: "#DB3F59" }}
                          animationDuration={1500}
                        />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </section>
            </>
          ) : (
            <HeroSub3 />
          )}
        </main>
      </div>
    </div>
  );
}