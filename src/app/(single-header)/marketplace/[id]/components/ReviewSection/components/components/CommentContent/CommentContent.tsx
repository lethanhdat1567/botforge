"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props = {
    content: string;
    isUpdate: boolean;
    setIsUpdate: (value: boolean) => void;
    onUpdateSubmit?: (newContent: string) => Promise<void>;
};

function CommentContent({
    content,
    isUpdate,
    setIsUpdate,
    onUpdateSubmit,
}: Props) {
    const [editValue, setEditValue] = useState(content);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        if (!editValue.trim() || editValue === content) {
            setIsUpdate(false);
            setEditValue(content); // Reset về giá trị cũ nếu không có thay đổi
            return;
        }

        try {
            setIsLoading(true);
            if (onUpdateSubmit) {
                await onUpdateSubmit(editValue);
            }
            setIsUpdate(false);
        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        }
        if (e.key === "Escape") {
            setIsUpdate(false);
            setEditValue(content);
        }
    };

    return isUpdate ? (
        <div className="animate-in fade-in slide-in-from-top-1 mt-2 flex flex-col gap-2 duration-200">
            <Input
                autoFocus
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="bg-background border-border py-5 text-sm focus-visible:ring-1"
                placeholder="Chỉnh sửa bình luận..."
            />
            <div className="flex items-center justify-end gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground h-8 px-3 text-xs"
                    onClick={() => {
                        setIsUpdate(false);
                        setEditValue(content);
                    }}
                    disabled={isLoading}
                >
                    Hủy bỏ
                </Button>
                <Button
                    size="sm"
                    className="h-8 px-4 text-xs font-semibold"
                    onClick={handleSave}
                    disabled={isLoading || !editValue.trim()}
                >
                    {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
            </div>
        </div>
    ) : (
        <p className="text-foreground max-w-2xl text-sm leading-relaxed whitespace-pre-wrap">
            {content}
        </p>
    );
}

export default CommentContent;
