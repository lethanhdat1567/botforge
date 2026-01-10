import { useNodeStore } from "@/store/nodeStore";
import { X } from "lucide-react";

function Note({ nodeId, noteData }: { nodeId: string; noteData: string }) {
    const updateNode = useNodeStore((state) => state.updateNode);

    function handleDestroyNote() {
        updateNode(nodeId, { note: "" });
    }

    return (
        <div className="relative bg-yellow-50 p-4 break-all whitespace-pre-wrap">
            {noteData}
            <span
                className="absolute top-1 right-1 cursor-pointer rounded-sm p-1 hover:bg-gray-100"
                onClick={handleDestroyNote}
            >
                <X size={14} />
            </span>
        </div>
    );
}

export default Note;
