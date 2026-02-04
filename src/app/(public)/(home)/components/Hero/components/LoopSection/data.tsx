import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
} from "react-icons/si";

export const techLogos = [
    {
        node: (
            <div className="flex items-center gap-2 text-neutral-700">
                <SiReact className="text-2xl" />
                <span className="text-sm font-medium">React</span>
            </div>
        ),
        title: "React",
        href: "https://react.dev",
    },
    {
        node: (
            <div className="flex items-center gap-2 text-neutral-700">
                <SiNextdotjs className="text-2xl" />
                <span className="text-sm font-medium">Next.js</span>
            </div>
        ),
        title: "Next.js",
        href: "https://nextjs.org",
    },
    {
        node: (
            <div className="flex items-center gap-2 text-neutral-700">
                <SiTypescript className="text-2xl" />
                <span className="text-sm font-medium">TypeScript</span>
            </div>
        ),
        title: "TypeScript",
        href: "https://www.typescriptlang.org",
    },
    {
        node: (
            <div className="flex items-center gap-2 text-neutral-700">
                <SiTailwindcss className="text-2xl" />
                <span className="text-sm font-medium">Tailwind CSS</span>
            </div>
        ),
        title: "Tailwind CSS",
        href: "https://tailwindcss.com",
    },
];
