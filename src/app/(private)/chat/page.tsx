import ChatHeader from "@/app/(private)/chat/components/ChatHeader/ChatHeader";
import ChatSection from "@/app/(private)/chat/components/ChatSection/ChatSection";
import { Separator } from "@/components/ui/separator";

function ChatPage() {
    return (
        <div>
            <ChatHeader />
            <Separator />
            <ChatSection />
        </div>
    );
}

export default ChatPage;
