// src/app/(site)/kalkulator/page.tsx

import CentralTendencyClient from "@/app/components/kalkulator";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Tensen | Hitungan",
};

export default function CentralTendencyPage() {
  return <CentralTendencyClient />;
}