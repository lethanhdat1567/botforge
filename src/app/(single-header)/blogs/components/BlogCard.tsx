import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface BlogCardProps {
    title: string;
    excerpt: string;
    category: string;
    author: string;
    readTime: number;
    thumbnail: string;
}

export function BlogCard({
    title,
    excerpt,
    category,
    author,
    readTime,
    thumbnail,
}: BlogCardProps) {
    return (
        <Card className="group border-border bg-card hover:border-primary/50 flex h-full flex-col overflow-hidden shadow-sm transition-all">
            <div
                className={`h-40 w-full ${thumbnail} opacity-80 transition-opacity group-hover:opacity-100`}
            />
            <div className="flex flex-1 flex-col space-y-3 p-5">
                <Badge variant="secondary" className="w-fit font-normal">
                    {category}
                </Badge>
                <h3 className="group-hover:text-primary line-clamp-2 text-xl font-bold transition-colors">
                    {title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 flex-1 text-sm">
                    {excerpt}
                </p>
                <div className="border-border text-muted-foreground flex items-center justify-between border-t pt-4 text-xs font-medium">
                    <span>By {author}</span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {readTime} min
                    </span>
                </div>
            </div>
        </Card>
    );
}
