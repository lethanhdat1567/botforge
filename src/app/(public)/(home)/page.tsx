"use client";

import Analysh from "@/app/(public)/(home)/components/Analysh/Analysh";
import Hero from "@/app/(public)/(home)/components/Hero/Hero";
import Problem from "@/app/(public)/(home)/components/Problem/Problem";
import Questions from "@/app/(public)/(home)/components/Questions/Questions";
import WhyChoiceUs from "@/app/(public)/(home)/components/WhyChoiceUs/WhyChoiceUs";

function Home() {
    return (
        <div className="bg-[#f6f6f6]">
            <Hero />
            <Problem />
            <WhyChoiceUs />
            <Analysh />
            <Questions />
            <div className="pb-30" />
        </div>
    );
}

export default Home;
