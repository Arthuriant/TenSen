import React from 'react';
import { Metadata } from "next";
import Hero from './components/home/hero';
import Fiture from './components/home/fiture';
import NavigationCard from './components/home/cardview';
import NavigationCard2 from './components/home/cardview2';
export const metadata: Metadata = {
  title: "Property",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Fiture />
      <NavigationCard />
      <NavigationCard2 />
    </main>
  )
}
