"use client";

import Features from "@/app/(public)/(home)/components/Features/Features";
import FounderNote from "@/app/(public)/(home)/components/FounderNote/FouderNode";
import Hero from "@/app/(public)/(home)/components/Hero/Hero";

function Home() {
    return (
        <div>
            <Hero />
            <FounderNote />
            <Features />
        </div>
    );
}

export default Home;
