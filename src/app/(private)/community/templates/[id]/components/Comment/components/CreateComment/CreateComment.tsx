"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { flowCommentService } from "@/services/flowCommentService";
import { useState } from "react";

type Props = {
    sharedTemplateId: string;
    parentId?: string | null;
    commentId?: string | null;
    commentValue?: string;
    onCancel?: () => void;
    onRefresh: () => void;
    onSubmit?: () => void;
};

function CreateComment({
    sharedTemplateId,
    parentId = null,
    commentId,
    commentValue,
    onCancel,
    onRefresh,
    onSubmit,
}: Props) {
    const [comment, setComment] = useState(commentValue || "");

    const isDisabled = comment.trim().length === 0;

    async function handleSubmit() {
        if (isDisabled) return;
        if (commentId) {
            try {
                await flowCommentService.updateComment(commentId as any, {
                    comment: comment,
                    parentId: parentId,
                });
                setComment("");
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                onSubmit && onSubmit();
                onRefresh();
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await flowCommentService.createComment({
                    comment: comment,
                    flowShareId: sharedTemplateId,
                    parentId: parentId as any,
                });
                setComment("");
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                onSubmit && onSubmit();
                onRefresh();
            } catch (error) {
                console.log(error);
            }
        }
        // submit comment ở đây
    }

    return (
        <div className="space-y-2">
            <Textarea
                className="h-20 resize-none"
                placeholder="What you think..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex items-center justify-end gap-4">
                {onCancel && (
                    <Button onClick={onCancel} variant={"destructive"}>
                        Cancel
                    </Button>
                )}
                <Button disabled={isDisabled} onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default CreateComment;
