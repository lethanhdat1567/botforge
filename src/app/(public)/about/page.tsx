import CoreValue from "@/app/(public)/about/components/CoreValue/CoreValue";
import FounderSection from "@/app/(public)/about/components/FounderSection/FounderSection";
import StartNow from "@/app/(public)/about/components/StartNow/StartNow";
import Technology from "@/app/(public)/about/components/Technology/Technology";

function AboutPage() {
    return (
        <div className="bg-muted pb-30">
            <div className="mx-auto w-full max-w-5xl px-4 pt-28 sm:px-6 sm:pt-40">
                <FounderSection />
                <CoreValue />
                <Technology />
            </div>
            <StartNow />
        </div>
    );
}

export default AboutPage;
