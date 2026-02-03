import LogoLoop from "@/components/LogoLoop";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
} from "react-icons/si";

function LoopSection() {
    const techLogos = [
        { node: <SiReact />, title: "React", href: "https://react.dev" },
        { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
        {
            node: <SiTypescript />,
            title: "TypeScript",
            href: "https://www.typescriptlang.org",
        },
        {
            node: <SiTailwindcss />,
            title: "Tailwind CSS",
            href: "https://tailwindcss.com",
        },
    ];

    return (
        <div className="mx-auto mt-14 w-[50vw]">
            <div className="text-md mb-4 font-medium">
                Trusted by the world leaders
            </div>
            <LogoLoop
                logos={techLogos}
                speed={50}
                direction="left"
                logoHeight={36}
                gap={60}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor="#ffffff"
                ariaLabel="Technology partners"
            />
        </div>
    );
}

export default LoopSection;
