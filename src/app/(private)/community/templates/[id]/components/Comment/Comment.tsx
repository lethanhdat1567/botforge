"use client";

import { useEffect, useState } from "react";
import CreateComment from "@/app/(private)/community/templates/[id]/components/Comment/components/CreateComment/CreateComment";
import { flowCommentService } from "@/services/flowCommentService";
import CommentItem from "@/app/(private)/community/templates/[id]/components/Comment/components/CommentItem/CommentItem";

type Props = { sharedTemplateId: string };

function Comment({ sharedTemplateId }: Props) {
    const [comments, setComments] = useState<any[]>([]);
    const fetchComments = async () => {
        try {
            const res =
                await flowCommentService.getCommentsByFlowShare(
                    sharedTemplateId,
                );
            setComments(res.data ?? res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchComments();
    }, [sharedTemplateId]);

    return (
        <div className="mt-4 w-[60vw]">
            <h2 className="text-md mb-4 font-bold">Comments</h2>

            <CreateComment
                sharedTemplateId={sharedTemplateId}
                onRefresh={fetchComments}
            />

            <div className="mt-4 space-y-2">
                {comments.map((c) => (
                    <CommentItem
                        comment={c}
                        key={c.id}
                        onRefresh={fetchComments}
                    />
                ))}
            </div>
        </div>
    );
}

export default Comment;
