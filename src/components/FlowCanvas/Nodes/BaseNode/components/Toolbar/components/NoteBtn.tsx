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
import useDebounce from "@/hooks/use-debounce";
import { StickyNote } from "lucide-react";
import { useEffect, useState } from "react";

function NoteBtn({ node }: { node: FlowNode }) {
    const [noteValue, setNoteValue] = useState(node.data.note || "");
    const debouceValue = useDebounce(noteValue, 300);

    useEffect(() => {
        FlowController.updateNode(node.id, { note: debouceValue });
    }, [debouceValue]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNoteValue(node.data.note || "");
    }, [node.data.note]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size={"icon-lg"}
                    variant={"ghost"}
                    className="rounded-none"
                >
                    <StickyNote />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ghi chú</DialogTitle>
                </DialogHeader>
                <Textarea
                    className="h-40! w-full"
                    placeholder="Ghi chu..."
                    value={noteValue}
                    onChange={(e) => setNoteValue(e.target.value)}
                />
            </DialogContent>
        </Dialog>
    );
}

export default NoteBtn;
