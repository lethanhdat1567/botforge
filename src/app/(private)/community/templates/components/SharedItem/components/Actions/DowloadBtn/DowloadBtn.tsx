"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import FolderWrapper from "@/app/(private)/community/templates/components/SharedItem/components/Actions/DowloadBtn/FolderWrapper";
import { flowSharedService } from "@/services/flowSharedService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
    sharedItemId: string;
    flowId: string;
    downloadCount: number;
};

function DowloadBtn({ flowId, sharedItemId, downloadCount }: Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    async function handleDowload(id: string) {
        try {
            await flowSharedService.downloadShared(sharedItemId, {
                flowId,
                folderId: id,
                pageId: null,
            });

            toast.success("Download successfully");
            setOpen(false);
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Failed to download");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-8 w-8 transition-colors duration-200"
                >
                    {downloadCount}
                    <Download className={cn("h-4 w-4 transition-all")} />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Choose your folder</DialogTitle>
                    <DialogDescription>
                        Select a folder to download this flow into.
                    </DialogDescription>
                </DialogHeader>

                <FolderWrapper onDowload={handleDowload} />
            </DialogContent>
        </Dialog>
    );
}

export default DowloadBtn;
