import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Đảm bảo đã import Badge
import { Calendar, User2, ArrowRight, Eye } from "lucide-react";
import Image from "next/image";
import { resolveMediaSrc } from "@/lib/image";
import { formatDate } from "@/lib/format";

interface BlogCardProps {
    title: string;
    description: string;
    category: string;
    author?: string;
    createdAt: string | Date;
    thumbnail: string;
    views?: number;
    content?: string;
}

export function BlogCard({
    title,
    description,
    category,
    author = "Botforge Team",
    createdAt,
    thumbnail,
    views = 124,
    content = "",
}: BlogCardProps) {
    const readTime = Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

    return (
        <Card className="group relative flex h-full max-w-sm flex-col gap-3 overflow-hidden border-stone-200 bg-white py-0 transition-all duration-300 hover:border-stone-400 hover:shadow-lg">
            {/* Header Image Section */}
            <div className="relative aspect-21/10 w-full overflow-hidden border-b border-stone-100 bg-stone-50">
                <Image
                    src={resolveMediaSrc(thumbnail)}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Overlay Read Time (Tuỳ chọn: nếu muốn chữ rõ hơn có thể để ở đây) */}
                <div className="absolute right-2 bottom-2 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {readTime} MIN READ
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-4">
                {/* Meta Row - Đẩy category sang trái dạng Badge */}
                <div className="mb-3 flex items-center justify-between">
                    <Badge
                        variant="secondary"
                        className="rounded-none border border-stone-200 bg-stone-100 px-2 py-0 text-[9px] font-bold tracking-tight text-stone-700 uppercase hover:bg-stone-100"
                    >
                        {category}
                    </Badge>
                    <div className="flex items-center gap-2 text-[9px] font-semibold tracking-wider text-stone-500 uppercase">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-2.5 w-2.5 stroke-[2]" />
                            {formatDate(createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="h-2.5 w-2.5 stroke-[2]" />
                            {views}
                        </span>
                    </div>
                </div>

                {/* Title - Tăng màu lên stone-900 để rõ nét */}
                <h3 className="mb-2 line-clamp-2 text-base leading-snug font-bold text-stone-900 transition-colors group-hover:text-black">
                    {title}
                </h3>

                {/* Description - Tăng màu lên stone-600 để dễ đọc hơn */}
                <p className="mb-4 line-clamp-2 flex-1 text-[13px] leading-relaxed font-medium text-stone-600">
                    {description}
                </p>

                {/* Footer Section */}
                <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-3">
                    <div className="flex items-center gap-1.5">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-stone-600">
                            <User2 className="h-3 w-3" />
                        </div>
                        <span className="text-[10px] font-bold tracking-tight text-stone-700 uppercase">
                            {author}
                        </span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-black text-black opacity-0 transition-all duration-300 group-hover:opacity-100">
                        READ MORE
                        <ArrowRight className="h-3 w-3" />
                    </div>
                </div>
            </div>
        </Card>
    );
}
