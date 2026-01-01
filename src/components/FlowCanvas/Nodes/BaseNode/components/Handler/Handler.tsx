import { Handle, Position } from "@xyflow/react";

function Handler() {
    return (
        <div>
            <Handle type="target" position={Position.Right} />
            <Handle type="source" position={Position.Left} />
        </div>
    );
}

export default Handler;
