"use client";

import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import { useCallback, useEffect, useState } from "react";

type Props = {
    nodeTypeData: { color: string; icon: any };
    name: string;
    nodeId: string;
};

function Heading({ nodeTypeData, name, nodeId }: Props) {
    const [nameInput, setNameInput] = useState(name);

    const Icon = nodeTypeData.icon;

    useEffect(() => {
        setNameInput(name);
    }, [name]);

    const commitChange = useCallback(() => {
        if (nameInput === name) return;

        FlowController.updateNode(nodeId, { label: nameInput });
    }, [nameInput, name, nodeId]);

    return (
        <div className="flex items-center gap-1">
            <span
                className={`bg-background flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border`}
                style={{ borderColor: nodeTypeData.color }}
            >
                <Icon
                    size={14}
                    color={nodeTypeData.color}
                    fill={nodeTypeData.color}
                />
            </span>
            <input
                className="focus:border-muted-foreground flex-1 rounded-sm border border-transparent px-2 py-1 outline-none"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onBlur={commitChange}
                placeholder="Nhập tên node..."
            />
        </div>
    );
}

export default Heading;
