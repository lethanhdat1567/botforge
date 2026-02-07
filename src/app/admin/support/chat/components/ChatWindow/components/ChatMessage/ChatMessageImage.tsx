import { resolveMediaSrc } from "@/lib/image";
import Image from "next/image";

type ChatMessageImageProps = {
    src: string;
    alt?: string;
};

function ChatMessageImage({ src, alt = "image" }: ChatMessageImageProps) {
    return (
        <div className="relative max-h-60 max-w-xs overflow-hidden rounded-lg">
            <Image
                src={resolveMediaSrc(src)}
                alt={alt}
                width={400}
                height={300}
                className="h-auto w-full object-cover"
                sizes="(max-width: 768px) 70vw, 400px"
                priority={false}
            />
        </div>
    );
}

export default ChatMessageImage;
