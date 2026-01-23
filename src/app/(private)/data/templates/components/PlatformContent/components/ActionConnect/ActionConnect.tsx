import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlugZap } from "lucide-react";
import PageSelect from "@/app/(private)/data/templates/components/PlatformContent/components/SelectPage/SelectPage";

type Props = {
    onConnect: (pageId: string) => void;
    pageId?: string;
};

function ActionConnect({ onConnect, pageId: initialPageId = "" }: Props) {
    const [open, setOpen] = useState(false);
    const [pageId, setPageId] = useState(initialPageId);
    const [error, setError] = useState<string | undefined>();

    const resetState = () => {
        setPageId(initialPageId);
        setError(undefined);
    };

    const handleSave = () => {
        if (!pageId) {
            setError("Please select a page");
            return;
        }

        onConnect(pageId);
        setOpen(false);
    };

    const handleCancel = () => {
        resetState();
        setOpen(false);
    };

    // 🔹 mỗi lần mở dialog → sync lại pageId
    useEffect(() => {
        if (open) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPageId(initialPageId);
            setError(undefined);
        }
    }, [open, initialPageId]);

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                setOpen(value);
                if (!value) resetState();
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline">
                    {initialPageId ? "Update connection" : "Connect"}
                    <PlugZap />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {initialPageId
                            ? "Update page connection"
                            : "Connect to page"}
                    </DialogTitle>
                    <DialogDescription>
                        Select a page to connect this flow.
                    </DialogDescription>
                </DialogHeader>

                <PageSelect
                    value={pageId}
                    error={error}
                    onChange={(value) => {
                        setPageId(value);
                        setError(undefined);
                    }}
                />

                <div className="flex items-center justify-end gap-3">
                    <Button variant="ghost" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!pageId || pageId === initialPageId}
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ActionConnect;
