import { ArrowLeft, User, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleContent } from "@/app/(single-header)/blogs/components/ArticleContent";
import { ARTICLES } from "@/app/(single-header)/blogs/data";

interface BlogDetailProps {
    params: { id: string };
}

export async function generateStaticParams() {
    return ARTICLES.map((article) => ({
        id: article.id,
    }));
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
    const { id } = await params;

    const article = ARTICLES.find((a) => a.id === id);

    if (!article) {
        return <div>asd</div>;
    }

    return (
        <main className="bg-background min-h-screen">
            <div className="mx-auto max-w-4xl px-6 py-10 pt-10">
                <Link href="/blogs">
                    <Button variant="ghost" className="mb-8 -ml-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Library
                    </Button>
                </Link>

                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <Badge className="mb-4">{article.category}</Badge>
                    <h1 className="text-foreground mb-6 text-5xl font-extrabold tracking-tight">
                        {article.title}
                    </h1>

                    <div className="text-muted-foreground mb-8 flex gap-6 border-b pb-6 text-sm font-medium">
                        <span className="flex items-center gap-2">
                            <User className="text-primary h-4 w-4" />{" "}
                            {article.author}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="text-primary h-4 w-4" />{" "}
                            {article.date}
                        </span>
                    </div>

                    <ArticleContent content={article.content} />
                </div>
            </div>
        </main>
    );
}
