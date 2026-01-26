import { resolveMediaSrc } from "@/lib/image";
import Image from "next/image";

type Props = {
    name: string;
    thumbnail?: string | null;
};

function ColumnName({ name, thumbnail }: Props) {
    return (
        <div className="flex items-center gap-4">
            {thumbnail && (
                <Image
                    width={100}
                    height={60}
                    className="h-12 w-12 object-cover"
                    src={resolveMediaSrc(thumbnail)}
                    alt="Image"
                />
            )}
            <span className="text-sm font-medium">{name}</span>
        </div>
    );
}

export default ColumnName;
