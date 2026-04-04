import { ArrowLeft, User, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { blogService } from "@/services/blogService";
import { resolveMediaSrc } from "@/lib/image";
import { RenderContent } from "@/components/RenderEditorTextContent/RenderEditorTextContent";
import { timeAgo } from "@/lib/timer";

interface BlogDetailProps {
    params: Promise<{ id: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
    const { id: slug } = await params;
    const article = await blogService.detailBySlug(slug).catch(() => null);

    if (!article) notFound();

    const readTime = Math.max(
        1,
        Math.ceil((article.content || "").split(/\s+/).length / 200),
    );

    const authorName =
        typeof article.author === "object"
            ? article.author.displayName || article.author.username
            : article.author || "Botforge Team";

    const categoryName =
        typeof article.category === "object"
            ? article.category.name
            : article.category;

    return (
        <main className="bg-background min-h-svh w-full min-w-0">
            <div className="mx-auto w-full min-w-0 max-w-[720px] px-4 py-8 sm:px-6 sm:py-10 md:py-14">
                {/* Back */}
                <Link
                    href="/blogs"
                    className="group text-muted-foreground hover:text-foreground mb-12 inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.14em] uppercase transition-colors"
                >
                    <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                    Quay lại
                </Link>

                <article>
                    <header className="mb-12">
                        {/* Category + read time */}
                        <div className="mb-6 flex flex-wrap items-center gap-3">
                            {categoryName && (
                                <span className="border-border text-foreground rounded-sm border px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] uppercase">
                                    {categoryName}
                                </span>
                            )}
                            <span className="bg-border h-[3px] w-[3px] rounded-full" />
                            <span className="text-muted-foreground text-[10px] font-normal tracking-[0.12em] uppercase">
                                {readTime} phút đọc
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-foreground mb-8 font-serif text-[1.625rem] leading-[1.12] font-normal tracking-[-0.02em] sm:text-[2rem] md:text-[3.25rem]">
                            {article.title}
                        </h1>

                        {/* Meta strip */}
                        <div className="divide-border border-border flex flex-col divide-y border-y sm:flex-row sm:divide-x sm:divide-y-0">
                            {/* Author */}
                            <div className="flex items-center gap-2.5 py-3.5 sm:pr-5">
                                <div className="border-border bg-muted h-6 w-6 shrink-0 overflow-hidden rounded-full border">
                                    {article.author?.avatar ? (
                                        <Image
                                            src={resolveMediaSrc(
                                                article.author.avatar,
                                            )}
                                            alt={authorName}
                                            width={24}
                                            height={24}
                                            className="h-full w-full object-cover grayscale"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <User className="text-muted-foreground h-3 w-3" />
                                        </div>
                                    )}
                                </div>
                                <span className="text-foreground text-[11px] font-medium tracking-[0.04em]">
                                    {authorName}
                                </span>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-2 py-3.5 sm:px-5">
                                <Calendar className="text-muted-foreground h-3.5 w-3.5 shrink-0 stroke-[1.5]" />
                                <span className="text-muted-foreground text-[11px] tracking-[0.04em]">
                                    {timeAgo(article.createdAt)}
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* Content — untouched as requested */}
                    <RenderContent html={article.content || ""} />

                    {/* Footer */}
                    <footer className="border-border mt-20 flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-muted-foreground/70 text-[10px] font-normal tracking-[0.2em] uppercase sm:tracking-[0.3em]">
                            Cơ sở kiến thức của Botforge —{" "}
                            {new Date().getFullYear()}
                        </p>
                    </footer>
                </article>
            </div>
        </main>
    );
}
