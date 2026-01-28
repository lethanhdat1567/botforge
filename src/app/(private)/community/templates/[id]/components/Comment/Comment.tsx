"use client";

import { useEffect, useState } from "react";
import CreateComment from "@/app/(private)/community/templates/[id]/components/Comment/components/CreateComment/CreateComment";
import { flowCommentService } from "@/services/flowCommentService";

type Props = { sharedTemplateId: string };

function Comment({ sharedTemplateId }: Props) {
    const [comments, setComments] = useState<any[]>([]);

    useEffect(() => {
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

        fetchComments();
    }, [sharedTemplateId]);

    return (
        <div className="mt-4">
            <h2 className="text-md mb-4 font-bold">Comments</h2>

            <CreateComment sharedTemplateId={sharedTemplateId} />

            <div className="mt-4 space-y-2">
                {comments.map((c) => (
                    <div key={c.id}>{c.comment}</div>
                ))}
            </div>
        </div>
    );
}

export default Comment;
