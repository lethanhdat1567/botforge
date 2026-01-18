"use client";

import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import useDebounce from "@/hooks/use-debounce";
import { useNodeStore } from "@/store/nodeStore";
import { useEffect, useState } from "react";

type Props = {
    nodeTypeData: { color: string; icon: any };
    name: string;
    nodeId: string;
};

function Heading({ nodeTypeData, name, nodeId }: Props) {
    const updateNode = useNodeStore((state) => state.updateNode);
    const [nameInput, setNameInput] = useState(name);
    const debounceValue = useDebounce(nameInput, 500);

    const Icon = nodeTypeData.icon;

    useEffect(() => {
        setNameInput(name);
    }, [name]);

    useEffect(() => {
        FlowController.updateNode(nodeId, { name: debounceValue });
    }, [debounceValue]);

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
                className="focus:border-foreground flex-1 border border-transparent outline-none"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
            />
        </div>
    );
}

export default Heading;
