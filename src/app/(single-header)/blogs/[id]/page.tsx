import { ArrowLeft, User, Calendar, Eye, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { blogService } from "@/services/blogService";
import { formatDate } from "@/lib/format";
import { resolveMediaSrc } from "@/lib/image";
import { RenderContent } from "@/components/RenderEditorTextContent/RenderEditorTextContent";

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
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-[720px] px-6 py-10 md:py-14">
                {/* Back */}
                <Link
                    href="/blogs"
                    className="group mb-12 inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.14em] text-stone-400 uppercase transition-colors hover:text-black"
                >
                    <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                    Back to Library
                </Link>

                <article>
                    <header className="mb-12">
                        {/* Category + read time */}
                        <div className="mb-6 flex items-center gap-3">
                            {categoryName && (
                                <span className="rounded-sm border border-stone-200 px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] text-black uppercase">
                                    {categoryName}
                                </span>
                            )}
                            <span className="h-[3px] w-[3px] rounded-full bg-stone-200" />
                            <span className="text-[10px] font-normal tracking-[0.12em] text-stone-400 uppercase">
                                {readTime} min read
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="mb-8 font-serif text-[2rem] leading-[1.08] font-normal tracking-[-0.02em] text-black md:text-[3.25rem]">
                            {article.title}
                        </h1>

                        {/* Meta strip */}
                        <div className="flex flex-wrap items-stretch divide-x divide-stone-100 border-y border-stone-100">
                            {/* Author */}
                            <div className="flex items-center gap-2.5 py-3.5 pr-5">
                                <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full border border-stone-100 bg-stone-50">
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
                                            <User className="h-3 w-3 text-stone-400" />
                                        </div>
                                    )}
                                </div>
                                <span className="text-[11px] font-medium tracking-[0.04em] text-black">
                                    {authorName}
                                </span>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-2 px-5 py-3.5">
                                <Calendar className="h-3.5 w-3.5 shrink-0 stroke-[1.5] text-stone-400" />
                                <span className="text-[11px] tracking-[0.04em] text-stone-500">
                                    {formatDate(article.createdAt)}
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* Content — untouched as requested */}
                    <RenderContent html={article.content || ""} />

                    {/* Footer */}
                    <footer className="mt-20 flex items-center justify-between border-t border-stone-100 pt-8">
                        <p className="text-[10px] font-normal tracking-[0.3em] text-stone-300 uppercase">
                            Botforge Knowledge Base — {new Date().getFullYear()}
                        </p>
                    </footer>
                </article>
            </div>
        </main>
    );
}
