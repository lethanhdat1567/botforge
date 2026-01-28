"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { flowCommentService } from "@/services/flowCommentService";
import { useState } from "react";

type Props = { sharedTemplateId: string; parentId?: string };

function CreateComment({ sharedTemplateId, parentId }: Props) {
    const [comment, setComment] = useState("");

    const isDisabled = comment.trim().length === 0;

    async function handleSubmit() {
        if (isDisabled) return;

        // submit comment ở đây
        try {
            const res = await flowCommentService.createComment({
                comment: comment,
                flowShareId: sharedTemplateId,
                parentId: parentId,
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col justify-end space-y-2">
            <Textarea
                className="h-20 resize-none"
                placeholder="What you think..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button
                className="ml-auto"
                disabled={isDisabled}
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </div>
    );
}

export default CreateComment;
