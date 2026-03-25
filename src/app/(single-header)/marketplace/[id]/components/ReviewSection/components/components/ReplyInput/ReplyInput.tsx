"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { flowShareCommentService } from "@/services/flowShareCommentService";
import { toast } from "sonner"; // Hoặc library toast bạn đang dùng

interface ReplyInputProps {
    flowShareId: string;
    parentId: string;
    onSuccess?: () => void;
}

export default function ReplyInput({
    flowShareId,
    parentId,
    onSuccess,
}: ReplyInputProps) {
    const [isExpended, setIsExpended] = useState(false);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendReply = async () => {
        if (!content.trim() || isLoading) return;

        try {
            setIsLoading(true);
            await flowShareCommentService.create({
                comment: content,
                flowShareId: flowShareId,
                parentId: parentId,
            });

            setContent("");
            setIsExpended(false);
            if (onSuccess) onSuccess();
            toast.success("Đã gửi phản hồi");
        } catch (error) {
            console.error(error);
            toast.error("Không thể gửi phản hồi");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendReply();
        }
    };

    if (!isExpended) {
        return (
            <button
                onClick={() => setIsExpended(true)}
                className="text-muted-foreground hover:text-foreground text-[12px] font-medium transition-colors"
            >
                Trả lời
            </button>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-top-1 mt-3 w-full duration-200">
            <div className="relative flex flex-col gap-2">
                <div className="relative">
                    <Input
                        autoFocus
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Viết phản hồi..."
                        className="bg-background border-border text-foreground py-4 pr-12 text-sm focus-visible:ring-1"
                        disabled={isLoading}
                    />
                    <Button
                        onClick={handleSendReply}
                        size="icon"
                        variant="ghost"
                        disabled={isLoading || !content.trim()}
                        className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 hover:bg-transparent"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="text-primary h-4 w-4" />
                        )}
                    </Button>
                </div>
                <div className="flex justify-end">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground h-7 text-[11px]"
                        onClick={() => {
                            setIsExpended(false);
                            setContent("");
                        }}
                    >
                        Hủy bỏ
                    </Button>
                </div>
            </div>
        </div>
    );
}
