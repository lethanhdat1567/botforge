/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import LikeDialog from "@/app/(single-header)/marketplace/[id]/components/HeadingBlock/components/LikeBtn/LikeDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { flowSharedLikeService } from "@/services/flowSharedLikeService";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    flowShareId: string;
    count: number;
};

function LikeBtn({ flowShareId, count }: Props) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(count);

    useEffect(() => {
        setLikeCount(count);
    }, [count]);

    const fetchCheckStatus = async () => {
        try {
            const res = await flowSharedLikeService.getLikeStatus(flowShareId);
            setIsLiked(res.isLiked);
        } catch (error) {
            console.log("Error checking like status:", error);
        }
    };

    useEffect(() => {
        fetchCheckStatus();
    }, [flowShareId]);

    async function handleToggleLike() {
        try {
            const res = await flowSharedLikeService.toggleLike(flowShareId);

            setIsLiked(res.status);
            setLikeCount(res.status ? likeCount + 1 : likeCount - 1);
        } catch (error) {
            console.log("Error toggling like:", error);
        }
    }

    return (
        <div className="hover:text-foreground flex items-center gap-0.5 transition-colors">
            <Button
                variant="ghost"
                size={"icon-sm"}
                className="rounded-full"
                onClick={handleToggleLike}
            >
                <Heart
                    className={cn(
                        "h-4 w-4 transition-colors",
                        isLiked
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground",
                    )}
                />
            </Button>
            <LikeDialog flowSharedId={flowShareId} count={likeCount}>
                <span className="cursor-pointer text-sm font-medium hover:underline">
                    {likeCount} lượt thích
                </span>
            </LikeDialog>
        </div>
    );
}

export default LikeBtn;
