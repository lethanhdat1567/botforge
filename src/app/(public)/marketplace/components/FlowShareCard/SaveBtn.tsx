/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { flowSharedSaveService } from "@/services/flowSharedSaveService";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function SaveBtn({
    flowSharedId,
    isSavedData,
}: {
    flowSharedId: string;
    isSavedData: boolean;
}) {
    const [isSaved, setIsSaved] = useState(isSavedData);

    async function handleSave() {
        try {
            const res = await flowSharedSaveService.toggleSave(flowSharedId);
            setIsSaved(res.status);

            toast.success(res.status ? "Lưu mẫu thành công" : "Đã hủy lưu mẫu");
        } catch (error) {
            console.log(error);
            toast.error("Lưu mẫu thất bại");
        }
    }

    return (
        <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/90 shadow-sm backdrop-blur-sm hover:bg-white"
            onClick={handleSave}
        >
            <Bookmark
                className={cn(
                    "h-4 w-4 transition-all",
                    isSaved
                        ? "fill-blue-500 text-blue-600"
                        : "text-neutral-600",
                )}
            />
        </Button>
    );
}

export default SaveBtn;
