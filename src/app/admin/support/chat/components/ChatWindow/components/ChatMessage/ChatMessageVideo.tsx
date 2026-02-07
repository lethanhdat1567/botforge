import { resolveMediaSrc } from "@/lib/image";

type ChatMessageVideoProps = {
    src: string;
};

function ChatMessageVideo({ src }: ChatMessageVideoProps) {
    return (
        <div className="bg-muted max-w-xs overflow-hidden rounded-lg">
            <video
                src={resolveMediaSrc(src) as string}
                controls
                preload="metadata"
                className="max-h-60 w-full rounded-lg object-cover"
            />
        </div>
    );
}

export default ChatMessageVideo;
