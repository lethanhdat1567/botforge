"use client";

import ChatSidebar from "@/app/admin/support/chat/components/ChatSidebar/ChatSidebar";
import ChatWindow from "@/app/admin/support/chat/components/ChatWindow/ChatWindow";
import { Separator } from "@/components/ui/separator";

export default function ChatLayout() {
    return (
        <div className="bg-background obert flex h-[calc(100vh-1.5rem-var(--header-h))] w-full rounded-xl border">
            <ChatSidebar />
            <Separator orientation="vertical" />
            <ChatWindow />
        </div>
    );
}
