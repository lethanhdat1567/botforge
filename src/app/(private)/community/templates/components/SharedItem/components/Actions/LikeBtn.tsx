"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { flowSharedLikeService } from "@/services/flowSharedLikeService";
import { cn } from "@/lib/utils";

function LikeBtn({ sharedItemId }: { sharedItemId: string }) {
    const [mounted, setMounted] = useState(false);

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const lockRef = useRef(false);

    // 🔹 Load trạng thái ban đầu
    useEffect(() => {
        let mounted = true;

        async function fetchStatus() {
            try {
                const [statusRes, countRes] = await Promise.all([
                    flowSharedLikeService.getLikeStatus(sharedItemId),
                    flowSharedLikeService.getLikeCount(sharedItemId),
                ]);

                if (!mounted) return;

                setLiked(statusRes.data.data.liked);
                setLikeCount(countRes.data.data.likeCount);
            } catch (err) {
                console.log(err);
            }
        }

        fetchStatus();

        return () => {
            mounted = false;
        };
    }, [sharedItemId]);

    async function handleLike() {
        if (loading || lockRef.current) return;

        lockRef.current = true;
        setLoading(true);

        // ✅ dùng prev để tránh stale state
        setLiked((prevLiked) => {
            setLikeCount((prevCount) =>
                prevCount === null
                    ? prevCount
                    : prevCount + (prevLiked ? -1 : 1),
            );
            return !prevLiked;
        });

        try {
            const res = await flowSharedLikeService.toggleLike(sharedItemId);

            // ✅ sync lại từ BE
            setLiked(res.data.data.liked);
            setLikeCount(res.data.data.likeCount);
        } catch (error) {
            console.log(error);

            // rollback
            setLiked((prevLiked) => {
                setLikeCount((prevCount) =>
                    prevCount === null
                        ? prevCount
                        : prevCount + (prevLiked ? -1 : 1),
                );
                return !prevLiked;
            });
        } finally {
            setLoading(false);
            lockRef.current = false;
        }
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button size="icon" variant="ghost" className="h-8 w-8" disabled>
                <Heart className="h-4 w-4 opacity-40" />
            </Button>
        );
    }

    return (
        <Button
            size="icon"
            variant="ghost"
            disabled={loading}
            onClick={handleLike}
            className="h-8 w-8 gap-1 transition-colors duration-200"
        >
            {likeCount}
            <Heart
                className={cn(
                    "h-4 w-4 transition-all",
                    liked && "fill-red-500 text-red-500",
                    loading && "opacity-60",
                )}
            />
        </Button>
    );
}

export default LikeBtn;
