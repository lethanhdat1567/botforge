"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ARTICLES } from "@/app/(single-header)/blogs/data";
import Link from "next/link";
import { BlogCard } from "@/app/(single-header)/blogs/components/BlogCard";

const CATEGORIES = [
    "All Topics",
    "Get Started",
    "How-to Guides",
    "Tech News",
    "Flow Sharing",
];

export default function BlogsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Topics");

    const filteredArticles = useMemo(() => {
        return ARTICLES.filter((article) => {
            const matchesSearch = article.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === "All Topics" ||
                article.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="bg-background flex min-h-screen">
            <aside className="border-border sticky top-20 hidden h-[calc(100vh-80px)] w-64 border-r p-6 md:block">
                <h3 className="text-muted-foreground mb-4 text-xs font-semibold uppercase">
                    Categories
                </h3>
                <div className="space-y-1">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                selectedCategory === cat
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted text-muted-foreground"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </aside>

            <main className="flex-1">
                <div className="mx-auto max-w-5xl px-6 py-10">
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-foreground mb-4 text-4xl font-bold">
                                Botforge Resources
                            </h1>
                            <div className="relative max-w-md">
                                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                <Input
                                    placeholder="Search guides..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {filteredArticles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/blogs/${article.id}`}
                                >
                                    <BlogCard {...article} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
