"use client";

import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import { SetVariableActionData } from "@/components/FlowCanvas/types/node/action.type";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type Props = {
    nodeId: string;
    payload: SetVariableActionData;
};

function SetVariableNode({ nodeId, payload }: Props) {
    const [key, setKey] = useState(payload.fields.key);
    const [value, setValue] = useState(payload.fields.value);

    // sync undo / redo
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setKey(payload.fields.key);
    }, [payload.fields.key]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(payload.fields.value);
    }, [payload.fields.value]);

    const commitChange = () => {
        if (key === payload.fields.key && value === payload.fields.value)
            return;

        FlowController.updateNodePayload(nodeId, payload.id, {
            key,
            value,
        });
    };

    return (
        <BaseContent nodeId={nodeId} payloadId={payload.id}>
            <div className="space-y-2">
                <Input
                    placeholder="Biến..."
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    onBlur={commitChange}
                    className="bg-white"
                />
                <Input
                    placeholder="Giá trị..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={commitChange}
                    className="bg-white"
                />
            </div>
        </BaseContent>
    );
}

export default SetVariableNode;
