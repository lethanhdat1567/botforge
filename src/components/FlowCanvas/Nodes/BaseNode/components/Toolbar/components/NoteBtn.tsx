import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { StickyNote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

function NoteBtn({ node }: { node: FlowNode }) {
    const [noteValue, setNoteValue] = useState(node.data.note || "");

    const onUpdateNode = useCallback(() => {
        FlowController.updateNode(node.id, { note: noteValue });
    }, [noteValue, node.id]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNoteValue(node.data.note || "");
    }, [node.data.note]);

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button
                            size="icon-lg"
                            variant="ghost"
                            className="rounded-none"
                        >
                            <StickyNote />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>

                <TooltipContent side="top">Add note</TooltipContent>
            </Tooltip>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ghi chú</DialogTitle>
                </DialogHeader>

                <Textarea
                    className="h-40 w-full"
                    placeholder="Ghi chú..."
                    value={noteValue}
                    onChange={(e) => setNoteValue(e.target.value)}
                    onBlur={onUpdateNode}
                />
            </DialogContent>
        </Dialog>
    );
}

export default NoteBtn;
