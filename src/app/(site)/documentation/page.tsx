
import { Configuration } from "@/app/components/documentation/Configuration";
import { DocNavigation } from "@/app/components/documentation/DocNavigation";
import { Introduction } from "@/app/components/documentation/Introduction";
import { PackageStructure } from "@/app/components/documentation/PackageStructure";
import { QuickStart } from "@/app/components/documentation/QuickStart";
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
                        <Introduction />
                        <PackageStructure />
                        <QuickStart />
                        <Configuration />
                    </div>
                </div>
            </div>
        </div>
    );
};
