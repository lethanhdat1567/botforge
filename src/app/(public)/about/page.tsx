import CoreValue from "@/app/(public)/about/components/CoreValue/CoreValue";
import FounderSection from "@/app/(public)/about/components/FounderSection/FounderSection";
import StartNow from "@/app/(public)/about/components/StartNow/StartNow";
import Technology from "@/app/(public)/about/components/Technology/Technology";

function AboutPage() {
    return (
        <div>
            <div className="mx-auto w-5xl pt-40">
                <FounderSection />
                <CoreValue />
                <Technology />
            </div>
            <StartNow />
        </div>
    );
}

export default AboutPage;
