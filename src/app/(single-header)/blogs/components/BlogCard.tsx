import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Đảm bảo đã import Badge
import { Calendar, User2, ArrowRight, Eye } from "lucide-react";
import Image from "next/image";
import { resolveMediaSrc } from "@/lib/image";
import { timeAgo } from "@/lib/timer";

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
        <Card className="group border-border bg-card hover:border-border relative flex h-full max-w-sm flex-col gap-3 overflow-hidden py-0 transition-all duration-300 hover:shadow-lg">
            {/* Header Image Section */}
            <div className="border-border bg-muted relative aspect-21/10 w-full overflow-hidden border-b">
                <Image
                    src={resolveMediaSrc(thumbnail)}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="bg-foreground/5 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Overlay Read Time (Tuỳ chọn: nếu muốn chữ rõ hơn có thể để ở đây) */}
                <div className="bg-foreground/85 text-background absolute right-2 bottom-2 rounded px-1.5 py-0.5 text-[9px] font-medium opacity-0 transition-opacity group-hover:opacity-100">
                    {readTime} phút đọc
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-4">
                {/* Meta Row - Đẩy category sang trái dạng Badge */}
                <div className="mb-3 flex items-center justify-between">
                    <Badge
                        variant="secondary"
                        className="border-border bg-muted text-foreground hover:bg-muted rounded-none border px-2 py-0 text-[9px] font-bold tracking-tight uppercase"
                    >
                        {category}
                    </Badge>
                    <div className="text-muted-foreground flex items-center gap-2 text-[9px] font-semibold tracking-wider uppercase">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-2.5 w-2.5 stroke-[2]" />
                            {timeAgo(createdAt)}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-foreground mb-2 line-clamp-2 text-base leading-snug font-bold transition-colors">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-4 line-clamp-2 flex-1 text-[13px] leading-relaxed font-medium">
                    {description}
                </p>

                {/* Footer Section */}
                <div className="border-border mt-auto flex items-center justify-between border-t pt-3">
                    <div className="flex items-center gap-1.5">
                        <div className="border-border bg-muted text-muted-foreground flex h-5 w-5 items-center justify-center rounded-full border">
                            <User2 className="h-3 w-3" />
                        </div>
                        <span className="text-foreground text-[10px] font-bold tracking-tight uppercase">
                            {author}
                        </span>
                    </div>

                    <div className="text-foreground flex items-center gap-1 text-[10px] font-black opacity-0 transition-all duration-300 group-hover:opacity-100">
                        ĐỌC THÊM
                        <ArrowRight className="h-3 w-3" />
                    </div>
                </div>
            </div>
        </Card>
    );
}
