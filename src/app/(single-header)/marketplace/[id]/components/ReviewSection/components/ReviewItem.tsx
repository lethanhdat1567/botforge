import { User, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { resolveMediaSrc } from "@/lib/image";
import {
    flowShareCommentService,
    FlowSharedComment,
} from "@/services/flowShareCommentService";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useState } from "react";
import { cn } from "@/lib/utils"; // Nếu bạn dùng shadcn/ui hoặc tailwind-merge
import { timeAgo } from "@/lib/timer";
import ReplyInput from "@/app/(single-header)/marketplace/[id]/components/ReviewSection/components/components/ReplyInput/ReplyInput";
import Options from "@/app/(single-header)/marketplace/[id]/components/ReviewSection/components/components/Options/Options";
import CommentContent from "@/app/(single-header)/marketplace/[id]/components/ReviewSection/components/components/CommentContent/CommentContent";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { ReplyItem } from "@/app/(single-header)/marketplace/[id]/components/ReviewSection/components/components/ReplyItem/ReplyItem";

type Props = {
    comment: FlowSharedComment;
    onRefresh?: () => void;
};

export const ReviewItem = ({ comment, onRefresh }: Props) => {
    const owner = useAuthStore((state) => state.user);
    const [showReplies, setShowReplies] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const hasReplies = comment.replies && comment.replies.length > 0;

    function handleUpdate() {
        setIsUpdate(true);
    }

    async function handleDestroy() {
        try {
            await flowShareCommentService.remove(comment.id);
            if (onRefresh) onRefresh();
            toast.success("Xóa bình luận thành công");
        } catch (error) {
            console.log(error);
            toast.error("Không thể xóa bình luận");
        }
    }

    async function handleUpdateEdit(newContent: string) {
        try {
            await flowShareCommentService.update(comment.id, newContent);
            setIsUpdate(false);
            toast.success("Cập nhật bình luận thành công");
            if (onRefresh) onRefresh();
        } catch (error) {
            console.log(error);
            toast.error("Không thể cập nhật bình luận");
        }
    }

    return (
        <div className="hover:bg-muted/5 flex items-start gap-4 p-5 transition-colors">
            {/* AVATAR */}
            <Avatar className="border-border/50 h-9 w-9 border">
                <AvatarImage
                    src={resolveMediaSrc(comment.user?.avatar) as string}
                />
                <AvatarFallback>
                    {comment.user?.displayName?.charAt(0) || (
                        <User className="h-4 w-4" />
                    )}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-1 flex-col gap-1.5 text-left">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-foreground text-sm font-bold">
                            {comment.user?.displayName ||
                                comment.user?.username}
                        </span>
                        <span className="text-muted-foreground text-[11px] font-medium italic">
                            {timeAgo(comment.createdAt)}
                        </span>
                    </div>
                    {owner?.id === comment.user.id && (
                        <Options
                            onUpdate={handleUpdate}
                            onDestroy={handleDestroy}
                        />
                    )}
                </div>

                {/* CONTENT */}
                <CommentContent
                    content={comment.comment}
                    isUpdate={isUpdate}
                    onUpdateSubmit={handleUpdateEdit}
                    setIsUpdate={setIsUpdate}
                />

                {/* Replies block */}
                <div className="mt-3 flex flex-col items-start justify-start gap-2">
                    {hasReplies && (
                        <button
                            onClick={() => setShowReplies(!showReplies)}
                            className={cn(
                                "hover:text-primary flex items-center gap-1.5 text-[12px] font-bold transition-colors",
                                showReplies
                                    ? "text-primary"
                                    : "text-foreground",
                            )}
                        >
                            <MessageCircle className="h-3.5 w-3.5" />
                            {showReplies
                                ? "ẨN PHẢN HỒI"
                                : `XEM PHẢN HỒI (${comment.replies?.length})`}
                            {showReplies ? (
                                <ChevronUp className="h-3 w-3" />
                            ) : (
                                <ChevronDown className="h-3 w-3" />
                            )}
                        </button>
                    )}

                    <ReplyInput
                        flowShareId={comment.flowShareId}
                        parentId={comment.id}
                        onSuccess={onRefresh}
                    />
                </div>
                {/* REPLIES SECTION (Toggle dựa trên showReplies) */}
                {hasReplies && showReplies && (
                    <div className="border-border animate-in fade-in slide-in-from-top-1 mt-2 ml-2 space-y-1 border-l-2 pl-4 transition-all">
                        {comment.replies!.map((reply) => (
                            <ReplyItem
                                key={reply.id}
                                reply={reply}
                                onRefresh={onRefresh}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
