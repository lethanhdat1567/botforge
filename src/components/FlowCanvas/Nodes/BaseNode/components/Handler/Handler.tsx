import { Handle, Position } from "@xyflow/react";

function Handler({ nodeId }: { nodeId: string }) {
    return (
        <>
            {/* Target – vào */}
            <Handle
                type="target"
                position={Position.Left}
                id={`node-target-${nodeId}`}
                className="top-4! h-3! w-3! rounded-full! border-2! border-white! bg-slate-400! shadow-md transition hover:scale-125 hover:bg-slate-300"
            />

            {/* Source – ra */}
            <Handle
                type="source"
                position={Position.Right}
                id={`node-source-${nodeId}`}
                className="top-[98%]! right-2! h-3! w-3! rounded-full! border-2! border-white! bg-blue-500! shadow-md transition hover:scale-125 hover:bg-blue-400"
            />
        </>
    );
}

export default Handler;
