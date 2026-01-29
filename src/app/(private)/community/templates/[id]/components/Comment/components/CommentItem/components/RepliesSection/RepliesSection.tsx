"use client";

import CommentItem from "@/app/(private)/community/templates/[id]/components/Comment/components/CommentItem/CommentItem";
import { Button } from "@/components/ui/button";
import { FlowComment } from "@/services/flowCommentService";
import { useState } from "react";

type Props = {
    replies: FlowComment[];
};

function RepliesSection({ replies }: Props) {
    const [showReply, setShowReply] = useState(false);

    if (replies.length <= 0) return;

    return (
        <div>
            {showReply ? (
                <div className="ml-10 flex flex-col space-y-2">
                    <div className="space-y-4">
                        {replies.map((reply) => (
                            <CommentItem key={reply.id} comment={reply} />
                        ))}
                    </div>
                    <Button
                        onClick={() => setShowReply(false)}
                        className="mr-auto"
                    >
                        Close
                    </Button>
                </div>
            ) : (
                <Button
                    onClick={() => setShowReply(true)}
                    variant={"secondary"}
                >
                    Show replies
                </Button>
            )}
        </div>
    );
}

export default RepliesSection;
