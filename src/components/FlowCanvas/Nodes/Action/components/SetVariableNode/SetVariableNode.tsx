import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import { SetVariableActionData } from "@/components/FlowCanvas/types/node/action.type";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { useEffect, useState } from "react";

type Props = {
    nodeId: string;
    payload: SetVariableActionData;
};

function SetVariableNode({ nodeId, payload }: Props) {
    const [key, setKey] = useState(payload.fields.key);
    const [value, setValue] = useState(payload.fields.value);

    const debouncedKey = useDebounce(key, 500);
    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        FlowController.updateNodePayload(nodeId, payload.id, {
            key: debouncedKey,
            value: debouncedValue,
        });
    }, [debouncedKey, debouncedValue]);

    return (
        <BaseContent id={nodeId}>
            <div>
                <Input
                    placeholder="key"
                    onChange={(e) => setKey(e.target.value)}
                    value={key}
                />
                <Input
                    placeholder="value"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
            </div>
        </BaseContent>
    );
}

export default SetVariableNode;
