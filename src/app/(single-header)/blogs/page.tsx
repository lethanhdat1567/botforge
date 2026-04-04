"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { BlogCard } from "@/app/(single-header)/blogs/components/BlogCard";
import { blogService, Post } from "@/services/blogService";
import {
    PostCategory,
    postCategoryService,
} from "@/services/blogCategoryService";

export default function BlogsPage() {
    const [articles, setArticles] = useState<Post[]>([]);
    const [categories, setCategories] = useState<string[]>(["All Topics"]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Topics");

    // 1. Fetch Data
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [postsRes, catsRes] = await Promise.all([
                blogService.listPublic({ status: "active" }),
                postCategoryService.list(),
            ]);

            setArticles(postsRes.posts);

            const catNames = catsRes.postCategories.map(
                (c: PostCategory) => c.name,
            );
            setCategories(["All Topics", ...catNames]);
        } catch (error) {
            console.error("Failed to fetch blog data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredArticles = useMemo(() => {
        return articles.filter((article) => {
            const matchesSearch = article.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

            const matchesCategory =
                selectedCategory === "All Topics" ||
                article.category?.name === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory, articles]);

    return (
        <div className="bg-background flex min-h-0 w-full min-w-0 flex-1 flex-col md:flex-row">
            {/* Sidebar Categories */}
            <aside className="border-border sticky top-16 hidden h-[calc(100svh-4rem)] w-64 shrink-0 border-r p-6 md:block">
                <h3 className="text-muted-foreground mb-4 text-xs font-semibold uppercase">
                    Danh mục bài viết
                </h3>
                <div className="space-y-1">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                selectedCategory === cat
                                    ? "bg-primary text-primary-foreground font-medium"
                                    : "hover:bg-muted text-muted-foreground"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="min-w-0 flex-1">
                <div className="px-4 py-6 sm:px-6 md:p-10">
                    <div className="space-y-8">
                        <div className="flex gap-2 overflow-x-auto pb-1 md:hidden">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                                        selectedCategory === cat
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div>
                            <h1 className="text-foreground mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
                                Bài viết của Botforge
                            </h1>
                            <div className="relative max-w-md min-w-0">
                                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                <Input
                                    placeholder="Tìm kiếm bài viết..."
                                    className="border-input rounded-none pl-10"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex h-64 items-center justify-center">
                                <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
                            </div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-3">
                                {filteredArticles.length > 0 ? (
                                    filteredArticles.map((article) => (
                                        <Link
                                            key={article.id}
                                            href={`/blogs/${article.slug}`}
                                        >
                                            <BlogCard
                                                title={article.title}
                                                description={
                                                    article.description
                                                }
                                                thumbnail={article.thumbnail}
                                                category={
                                                    article.category?.name
                                                }
                                                createdAt={article.createdAt}
                                            />
                                        </Link>
                                    ))
                                ) : (
                                    <div className="text-muted-foreground col-span-full py-20 text-center">
                                        Không tìm thấy bài viết nào phù hợp.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
