import { Handle, Position } from "@xyflow/react";

function Handler({ nodeId }: { nodeId: string }) {
    return (
        <div>
            <Handle
                type="target"
                position={Position.Right}
                className="bg-red-500! p-2!"
                id={`node-source-${nodeId}`}
            />
            <Handle
                type="source"
                position={Position.Left}
                className="bg-blue-500! p-2!"
                id={`node-target-${nodeId}`}
            />
        </div>
    );
}

export default Handler;
