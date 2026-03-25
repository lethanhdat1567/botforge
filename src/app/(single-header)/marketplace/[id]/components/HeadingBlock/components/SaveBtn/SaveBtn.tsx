"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import { Button } from "@/components/ui/button";
import { flowSharedSaveService } from "@/services/flowSharedSaveService";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = { flowSharedId: string };

function SaveBtn({ flowSharedId }: Props) {
    const [isSaved, setIsSaved] = useState(false);

    const fetchSaveStatus = async () => {
        try {
            const res = await flowSharedSaveService.getSaveStatus(flowSharedId);
            setIsSaved(res.isSaved);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSaveStatus();
    }, [flowSharedId]);

    async function handleToggleSave() {
        try {
            const res = await flowSharedSaveService.toggleSave(flowSharedId);
            setIsSaved(res.status);
            toast.success(
                isSaved ? "Bỏ lưu mẫu thành công" : "Lưu mẫu thành công",
            );
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button
            className={`flex-1 ${isSaved ? "border-blue-400 bg-blue-100 text-blue-500" : ""}`}
            variant={"outline"}
            onClick={handleToggleSave}
        >
            {isSaved ? "Bỏ lưu mẫu" : "Lưu mẫu"}
            <Bookmark
                className="ml-2 h-4 w-4"
                fill={isSaved ? "blue" : ""}
                color={isSaved ? "blue" : ""}
            />
        </Button>
    );
}

export default SaveBtn;
