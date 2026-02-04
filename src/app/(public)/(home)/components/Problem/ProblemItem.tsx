import Image from "next/image";

type ProblemItemProps = {
    title: string;
    description: string;
    image: any;
};

function ProblemItem({ title, description, image }: ProblemItemProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-white shadow-2xl">
            <Image
                alt="fallback"
                src={image}
                width={100}
                height={100}
                className="h-60 w-full object-contain p-4 pb-0"
            />
            <div className="px-8 py-4">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-md mt-2 text-neutral-600">{description}</p>
            </div>
        </div>
    );
}

export default ProblemItem;
