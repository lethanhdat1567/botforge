import ChatHeader from "@/app/(private)/chat/components/ChatHeader/ChatHeader";
import ChatSection from "@/app/(private)/chat/components/ChatSection/ChatSection";
import { Separator } from "@/components/ui/separator";

function ChatPage() {
    return (
        <div className="flex min-h-[min(70dvh,36rem)] min-w-0 flex-col sm:min-h-[calc(100dvh-9rem)]">
            <ChatHeader />
            <Separator className="shrink-0" />
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <ChatSection />
            </div>
        </div>
    );
}

export default ChatPage;
