"use client";

import CTA from "@/app/(public)/(home)/components/CTA/CTA";
import Features from "@/app/(public)/(home)/components/Features/Features";
import FounderNote from "@/app/(public)/(home)/components/FounderNote/FouderNode";
import Hero from "@/app/(public)/(home)/components/Hero/Hero";
import HowItWork from "@/app/(public)/(home)/components/HowItWork/page";
import Question from "@/app/(public)/(home)/components/Question/Question";

function Home() {
    return (
        <div>
            <Hero />
            <FounderNote />
            <Features />
            <HowItWork />
            <Question />
            <CTA />
        </div>
    );
}

export default Home;
