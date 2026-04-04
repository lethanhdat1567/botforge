/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReviewItem } from "@/app/(single-header)/marketplace/[id]/components/ReviewSection/components/ReviewItem";
import { resolveMediaSrc } from "@/lib/image";
import { useEffect, useState, useCallback } from "react";
import { authService } from "@/services/authService";
import {
    flowShareCommentService,
    FlowSharedComment,
} from "@/services/flowShareCommentService";

export default function ReviewSection({
    flowSharedId,
}: {
    flowSharedId: string;
}) {
    const [me, setMe] = useState<any>(null);
    const [commentInput, setCommentInput] = useState<string>("");
    const [comments, setComments] = useState<FlowSharedComment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMe = async () => {
        try {
            const res: any = await authService.me();
            setMe(res.data);
        } catch (error) {
            console.error("Fetch Me Error:", error);
        }
    };

    const loadComments = useCallback(
        async (page: number, shouldReset = false) => {
            if (isLoading) return;
            try {
                setIsLoading(true);
                const res = await flowShareCommentService.listByFlowShare(
                    flowSharedId,
                    {
                        limit: 10,
                        page: page,
                    },
                );

                if (shouldReset || res.meta.isFirstPage) {
                    setComments(res.comments);
                } else {
                    setComments((prev) => [...prev, ...res.comments]);
                }

                setCurrentPage(res.meta.currentPage);
                setTotalPages(res.meta.pageCount);
            } catch (error) {
                console.error("Load Comments Error:", error);
            } finally {
                setIsLoading(false);
            }
        },
        [flowSharedId],
    );

    const handleComment = async () => {
        if (!commentInput.trim() || isLoading) return;
        try {
            await flowShareCommentService.create({
                comment: commentInput,
                flowShareId: flowSharedId,
            });
            setCommentInput("");
            // Reset về trang 1 để thấy comment mới nhất ngay lập tức
            await loadComments(1, true);
        } catch (error) {
            console.error("Create Comment Error:", error);
        }
    };

    const handleLoadMore = () => {
        if (currentPage < totalPages) {
            loadComments(currentPage + 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleComment();
        }
    };

    const onRefresh = async () => await loadComments(currentPage, true);

    useEffect(() => {
        fetchMe();
        loadComments(1, true);
    }, [loadComments]);

    return (
        <div>
            <div className="mb-4">
                <h2 className="text-foreground text-2xl font-bold tracking-tight">
                    Bình luận
                </h2>
                <p className="text-muted-foreground text-sm font-medium">
                    Chia sẻ ý kiến của bạn hoặc đặt câu hỏi về sản phẩm này.
                </p>
            </div>

            <div className="bg-background mx-auto w-full min-w-0 max-w-5xl">
                <div className="flex flex-col">
                    <div className="border-border bg-muted/20 flex items-start gap-3 p-3 sm:gap-4 sm:p-5">
                        <Avatar className="border-border h-9 w-9 shrink-0 border">
                            <AvatarImage
                                src={resolveMediaSrc(me?.avatar) as string}
                            />
                            <AvatarFallback>
                                {me?.displayName?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <div className="relative min-w-0">
                                <Input
                                    value={commentInput}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) =>
                                        setCommentInput(e.target.value)
                                    }
                                    placeholder="Viết phản hồi hoặc bình luận..."
                                    className="bg-background border-border text-foreground py-5 pr-12 text-sm focus-visible:ring-1"
                                />
                                <Button
                                    onClick={handleComment}
                                    size="icon"
                                    variant="ghost"
                                    disabled={isLoading || !commentInput.trim()}
                                    className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                        {comments.map((comment) => (
                            <ReviewItem
                                key={comment.id}
                                comment={comment}
                                onRefresh={onRefresh}
                            />
                        ))}

                        {currentPage < totalPages && (
                            <div className="mt-4 flex justify-center">
                                <Button
                                    variant="ghost"
                                    onClick={handleLoadMore}
                                    disabled={isLoading}
                                    className="text-muted-foreground hover:underline"
                                >
                                    {isLoading
                                        ? "Đang tải..."
                                        : "Xem thêm bình luận"}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
