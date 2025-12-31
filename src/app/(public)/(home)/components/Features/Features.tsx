import { Rocket } from "lucide-react";

const jobs = [
    {
        name: "Appoli",
        description:
            "Applio is a next-generation AI company building smarter tools for tomorrow’s world for today's workforce.",
        icon: <Rocket className="text-neutral-200" />,
    },
    {
        name: "AI Labs",
        description:
            "AI Labs is creating intelligent systems that learn and adapt for future challenges.",
        icon: <Rocket className="text-neutral-200" />,
    },
    {
        name: "NeuroTech",
        description:
            "NeuroTech develops neural network solutions to optimize everyday tasks.",
        icon: <Rocket className="text-neutral-200" />,
    },
    {
        name: "NeuroTech",
        description:
            "NeuroTech develops neural network solutions to optimize everyday tasks.",
        icon: <Rocket className="text-neutral-200" />,
    },
    {
        name: "NeuroTech",
        description:
            "NeuroTech develops neural network solutions to optimize everyday tasks.",
        icon: <Rocket className="text-neutral-200" />,
    },
    {
        name: "NeuroTech",
        description:
            "NeuroTech develops neural network solutions to optimize everyday tasks.",
        icon: <Rocket className="text-neutral-200" />,
    },
];

function Features() {
    return (
        <div className="relative bg-[#0e0d0d] pt-30">
            <div className="app-container relative z-10 text-center">
                <h2 className="mb-4 text-4xl font-bold">Featured Jobs</h2>
                <p className="mb-10 text-xl text-neutral-400">
                    Top AI companies are now recruiting with JobHub
                </p>
                <div className="grid grid-cols-3 gap-6">
                    {jobs.map((job, index) => (
                        <div
                            key={index}
                            className="box rounded-xl border-2 bg-[#222] p-8 text-left"
                        >
                            <span className="mb-2 inline-block rounded-sm border-2 p-4">
                                {job.icon}
                            </span>
                            <h3 className="mb-3 text-xl font-semibold">
                                {job.name}
                            </h3>
                            <p className="text-md text-neutral-400">
                                {job.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Layer hồng chủ đạo */}
            <div className="pointer-events-none absolute -top-20 -left-40 z-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#d50274]/30 via-[#ff66a1]/20 to-[#ffffff]/10 blur-[150px]" />

            {/* Layer highlight phụ */}
            <div className="pointer-events-none absolute -right-40 -bottom-20 z-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-[#ff66a1]/20 via-[#d50274]/10 to-[#ffffff]/5 blur-[120px]" />
        </div>
    );
}

export default Features;
