import { Button } from "@/components/ui/button";
import { resolveImageSrc } from "@/lib/image";
import Image from "next/image";

type Props = {
    type: "image" | "video" | "audio";
    src: string;
    onDestroy: any;
};

function View({ type, src, onDestroy }: Props) {
    console.log(resolveImageSrc(src));

    return (
        <div className="group/attachment relative">
            {type === "image" && (
                <Image
                    src={resolveImageSrc(src)}
                    alt="image"
                    className="h-auto w-full object-cover"
                    width={500}
                    height={500}
                />
            )}
            {type === "audio" && (
                <audio
                    controls
                    className="bg-background w-full rounded-md shadow-sm"
                >
                    <source src={resolveImageSrc(src) as string} />
                </audio>
            )}

            <div
                className={`absolute inset-0 hidden items-center justify-center bg-black/50 transition ${type !== "audio" ? "group-hover/attachment:flex" : ""}`}
            >
                <Button variant={"destructive"} onClick={onDestroy}>
                    Xoa
                </Button>
            </div>
        </div>
    );
}

export default View;
