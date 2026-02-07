"use client";

import { useSearchParams } from "next/navigation";
import ChatHeader from "@/app/admin/support/chat/components/ChatWindow/components/ChatHeader/ChatHeader";
import ChatInput from "@/app/admin/support/chat/components/ChatWindow/components/ChatInput/ChatInput";
import ChatMessages from "@/app/admin/support/chat/components/ChatWindow/components/ChatMessage/ChatMessage";
import { Separator } from "@/components/ui/separator";

function ChatWindow() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");

    // chưa chọn user
    if (!userId) {
        return (
            <div className="text-muted-foreground flex flex-1 items-center justify-center">
                Chọn một cuộc hội thoại
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col">
            <ChatHeader userId={userId} />
            <Separator />
            <ChatMessages userId={userId} />
            <Separator />
            <ChatInput userId={userId} />
        </div>
    );
}

export default ChatWindow;
