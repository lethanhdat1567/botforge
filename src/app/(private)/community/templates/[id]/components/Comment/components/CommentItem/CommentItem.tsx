"use client";

import Actions from "@/app/(private)/community/templates/[id]/components/Comment/components/CommentItem/components/Actions/Actions";
import CreateReply from "@/app/(private)/community/templates/[id]/components/Comment/components/CommentItem/components/CreateReply/CreateReply";
import RepliesSection from "@/app/(private)/community/templates/[id]/components/Comment/components/CommentItem/components/RepliesSection/RepliesSection";
import CreateComment from "@/app/(private)/community/templates/[id]/components/Comment/components/CreateComment/CreateComment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "@/lib/timer";
import { FlowComment, flowCommentService } from "@/services/flowCommentService";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
    comment: FlowComment;
    onRefresh?: () => void;
};

function CommentItem({ comment, onRefresh }: Props) {
    const user = useAuthStore((state) => state.user);
    const [isUpdate, setIsUpdate] = useState(false);

    async function handleDestroy() {
        try {
            await flowCommentService.removeComment(comment.id as any);
            onRefresh && onRefresh();
            toast.success("Comment deleted successfully");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="mb-2 flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-semibold">
                        {comment.user?.displayName}
                    </div>
                    <div className="text-muted-foreground text-xs">
                        {timeAgo(comment.createdAt)}
                    </div>
                </div>
                {user?.id === comment?.user?.id && (
                    <Actions
                        onUpdate={() => setIsUpdate(true)}
                        onDestroy={handleDestroy}
                    />
                )}
            </div>
            <div className="text-sm">{comment.comment}</div>
            <div className="mt-2 space-y-2">
                {!comment.parentId && (
                    <CreateReply
                        sharedTemplateId={comment.flowShareId}
                        parentId={comment.id}
                        onRefresh={onRefresh as any}
                    />
                )}
                <RepliesSection replies={comment.replies || []} />
            </div>
            {isUpdate && (
                <div className="mt-2">
                    <CreateComment
                        onRefresh={onRefresh as any}
                        sharedTemplateId={comment.flowShareId}
                        onCancel={() => setIsUpdate(false)}
                        onSubmit={() => setIsUpdate(false)}
                        commentId={comment.id}
                        commentValue={comment.comment}
                    />
                </div>
            )}
        </div>
    );
}

export default CommentItem;
