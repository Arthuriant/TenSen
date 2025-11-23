"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

export const DocNavigation = () => {

    const [navItem, setNavItem] = useState("tensen");

    function getNavItem(item:string){
        setNavItem(item)
    }

    useEffect(() => {
     console.log(navItem);
    },[navItem])

    const DocsNav = [
        {
            id:1,
            navItem:"Tendensi Sentral",
            hash:"tensen"
        },
        {
            id:2,
            navItem:"Mean",
            hash:"mean"
        },
        {
            id:3,
            navItem:"Median",
            hash:"median"
        },
        {
            id:4,
            navItem:"Modus",
            hash:"modus"
        },
        {
            id:5,
            navItem:"Jangkauan (Range)",
            hash:"range"
        },
        {
            id:6,
            navItem:"Varian",
            hash:"varian"
        },
        {
            id:7,
            navItem:"Deviasi",
            hash:"deviasi"
        },
        {
            id:8,
            navItem:"Kuartil",
            hash:"kuartil"
        },        
    ]

    return (
        <div className="flex flex-col gap-0.5 mt-4 items-start sticky top-28 pe-4" >
          {
            DocsNav.map((item) => {
                return (
                    <Link key={item.id} href={`#${item.hash}`} onClick={() => getNavItem(item.hash)} className={`py-2.5 hover:bg-primary/20 hover:text-primary dark:hover:text-primary xl:min-w-60 lg:min-w-52 min-w-full px-4 rounded-md text-midnight_text text-base font-medium  ${item.hash === navItem ? "bg-primary text-white hover:!bg-primary hover:!text-white dark:!text-opacity-100 dark:hover:text-white" : "dark:text-gray"}`}>{item.navItem}</Link>
                )
            })
          }
        </div>
    )
}