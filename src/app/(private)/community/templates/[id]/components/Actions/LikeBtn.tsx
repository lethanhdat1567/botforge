"use client";

import { Button } from "@/components/ui/button";
import { flowSharedLikeService } from "@/services/flowSharedLikeService";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    sharedTemplateId: string;
};

function LikeBtn({ sharedTemplateId }: Props) {
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const fetchLikeCount = async () => {
            try {
                const res =
                    await flowSharedLikeService.getLikeCount(sharedTemplateId);
                setLikeCount(res.data.data.likeCount);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLikeCount();
    }, [sharedTemplateId]);

    useEffect(() => {
        const fetchIsLiked = async () => {
            try {
                const res =
                    await flowSharedLikeService.getLikeStatus(sharedTemplateId);

                setIsLiked(res.data.data.liked);
            } catch (error) {
                console.log(error);
            }
        };

        fetchIsLiked();
    }, [sharedTemplateId]);

    async function handleLike() {
        try {
            const res =
                await flowSharedLikeService.toggleLike(sharedTemplateId);

            setLikeCount(res.data.data.likeCount);
            setIsLiked(res.data.data.liked);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button variant={"outline"} className={"w-30"} onClick={handleLike}>
            {isLiked ? (
                <Heart className="text-red-500" fill="red" />
            ) : (
                <Heart />
            )}{" "}
            {likeCount} Like
        </Button>
    );
}

export default LikeBtn;
