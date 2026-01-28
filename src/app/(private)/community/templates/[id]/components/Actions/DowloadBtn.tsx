"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import FolderWrapper from "@/app/(private)/community/templates/components/SharedItem/components/Actions/DowloadBtn/FolderWrapper";
import { flowSharedService } from "@/services/flowSharedService";
import { toast } from "sonner";

type Props = { sharedTemplateId: string; flowId: string };

function DowloadBtn({ sharedTemplateId, flowId }: Props) {
    const [open, setOpen] = useState(false);

    async function handleDowload(id: string) {
        try {
            await flowSharedService.downloadShared(sharedTemplateId, {
                flowId,
                folderId: id,
                pageId: null,
            });

            toast.success("Download successfully");
            setOpen(false);
        } catch (error) {
            console.log(error);
            toast.error("Failed to download");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"default"} className="w-30">
                    <Download /> Dowload
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
