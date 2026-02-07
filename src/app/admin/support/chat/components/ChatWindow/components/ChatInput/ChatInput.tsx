"use client";

import FileInput from "@/app/admin/support/chat/components/ChatWindow/components/ChatInput/FileInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatService } from "@/services/livechatService";
import { uploadService } from "@/services/uploadService";
import { Send } from "lucide-react";
import { useState } from "react";

function ChatInput({ userId }: { userId?: string }) {
    const [input, setInput] = useState("");

    const handleSubmit = async () => {
        try {
            if (!input.trim()) return;

            await chatService.sendMessage({
                userId,
                content: input,
            });

            setInput("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    async function handleSelect(file: File) {
        try {
            const res = await uploadService.uploadFile(file);

            await chatService.sendMessage({
                userId,
                content: res.data.path,
                type: res.data.type,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex items-start gap-2 p-3">
            <FileInput onSelect={handleSelect} />

            <Textarea
                placeholder="Nhập tin nhắn…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-4 flex-1 resize-none"
            />

            <Button onClick={handleSubmit} disabled={!input.trim()}>
                <Send className="mr-2 h-4 w-4" />
                Gửi
            </Button>
        </div>
    );
}

export default ChatInput;
