"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { resolveMediaSrc } from "@/lib/image";
import {
    flowShareCommentService,
    FlowSharedComment,
} from "@/services/flowShareCommentService";
import { timeAgo } from "@/lib/timer";
import { User } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import Options from "../Options/Options";
import CommentContent from "../CommentContent/CommentContent";

export const ReplyItem = ({
    reply,
    onRefresh,
}: {
    reply: FlowSharedComment;
    onRefresh?: () => void;
}) => {
    const owner = useAuthStore((state) => state.user);
    const [isUpdate, setIsUpdate] = useState(false);

    async function handleDestroy() {
        try {
            await flowShareCommentService.remove(reply.id);
            if (onRefresh) onRefresh();
            toast.success("Xóa phản hồi thành công");
        } catch (error) {
            toast.error("Không thể xóa phản hồi");
        }
    }

    async function handleUpdateEdit(newContent: string) {
        try {
            await flowShareCommentService.update(reply.id, newContent);
            setIsUpdate(false);
            toast.success("Cập nhật bình luận thành công");
            if (onRefresh) onRefresh();
        } catch (error) {
            console.log(error);
            toast.error("Không thể cập nhật bình luận");
        }
    }

    return (
        <div className="group flex flex-col gap-1 py-2">
            <div className="flex items-start gap-3">
                <Avatar className="border-border/50 h-7 w-7 border">
                    <AvatarImage
                        src={resolveMediaSrc(reply.user?.avatar) as string}
                    />
                    <AvatarFallback>
                        <User className="text-muted-foreground h-3 w-3" />
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-foreground text-[13px] font-bold">
                                {reply.user?.displayName ||
                                    reply.user?.username}
                            </span>
                            <span className="text-muted-foreground text-[10px] italic">
                                {timeAgo(reply.createdAt)}
                            </span>
                        </div>

                        {owner?.id === reply.user?.id && (
                            <Options
                                onUpdate={() => setIsUpdate(true)}
                                onDestroy={handleDestroy}
                            />
                        )}
                    </div>

                    <CommentContent
                        content={reply.comment}
                        isUpdate={isUpdate}
                        setIsUpdate={setIsUpdate}
                        onUpdateSubmit={handleUpdateEdit}
                    />
                </div>
            </div>
        </div>
    );
};
