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
        <div className="bg-background flex min-h-screen">
            {/* Sidebar Categories */}
            <aside className="border-border sticky top-20 hidden h-[calc(100vh-80px)] w-64 border-r p-6 md:block">
                <h3 className="text-muted-foreground mb-4 text-xs font-semibold uppercase">
                    Categories
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
            <main className="flex-1">
                <div className="p-10">
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-foreground mb-4 text-4xl font-bold">
                                Botforge Resources
                            </h1>
                            <div className="relative max-w-md">
                                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                <Input
                                    placeholder="Search guides..."
                                    className="rounded-none border-stone-300 pl-10"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex h-64 items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
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
                                    <div className="col-span-full py-20 text-center text-stone-500">
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
