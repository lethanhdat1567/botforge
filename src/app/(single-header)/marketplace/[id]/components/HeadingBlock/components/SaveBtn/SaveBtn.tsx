"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import { Button } from "@/components/ui/button";
import { flowSharedSaveService } from "@/services/flowSharedSaveService";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
            className={cn(
                "flex-1",
                isSaved &&
                    "border-primary bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
            )}
            variant={"outline"}
            onClick={handleToggleSave}
        >
            {isSaved ? "Bỏ lưu mẫu" : "Lưu mẫu"}
            <Bookmark
                className={cn(
                    "ml-2 h-4 w-4",
                    isSaved && "fill-primary text-primary",
                )}
            />
        </Button>
    );
}

export default SaveBtn;
