
import { Range } from "@/app/components/documentation/Range";
import { DocNavigation } from "@/app/components/documentation/DocNavigation";
import { TendensiSentral } from "@/app/components/documentation/TendensiSentral";
import { Mean } from "@/app/components/documentation/Mean";
import { Median } from "@/app/components/documentation/Median";
import { Modus } from "@/app/components/documentation/Modus";
import { Varian } from "@/app/components/documentation/Varian";
import { Deviasi } from "@/app/components/documentation/Deviasi";
import { Kuartil } from "@/app/components/documentation/Kuartil";
import HeroSub2 from "@/app/components/shared/hero-sub2";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Documentation | Property-pro",
};

export default function Page() {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/contact", text: "Contact" },
    ];

    return (
        <div className="dark:bg-darkmode" >
            <HeroSub2/>
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md p-6 pt-24 lg:mt-0 mt-16 ">
                <div className="grid grid-cols-12 gap-6">
                    <div className="lg:col-span-3 col-span-12 lg:block hidden">
                        <DocNavigation />
                    </div>
                    <div className="lg:col-span-9 col-span-12">
                        <TendensiSentral />
                        <Mean />
                        <Median />
                        <Modus />
                        <Range />
                        <Varian />
                        <Deviasi />
                        <Kuartil />
                    </div>
                </div>
            </div>
        </div>
    );
};