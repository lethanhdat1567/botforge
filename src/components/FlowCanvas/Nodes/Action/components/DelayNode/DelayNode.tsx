/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import DelayInput from "@/components/FlowCanvas/Nodes/Action/components/DelayNode/components/DelayInput/DelayInput";
import DelayProgress from "@/components/FlowCanvas/Nodes/Action/components/DelayNode/components/DelayProgress/DelayProgress";
import DelaySelect from "@/components/FlowCanvas/Nodes/Action/components/DelayNode/components/DelaySelect/DelaySelect";
import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import { DelayActionData } from "@/components/FlowCanvas/types/node/action.type";
import { useEffect, useState } from "react";

type Props = { nodeId: any; payload: DelayActionData };

function DelayNode({ nodeId, payload }: Props) {
    const [errors, setErrors] = useState<any>([]);
    const [rangeValue, setRangeValue] = useState(
        Number(payload.fields.duration),
    );

    // sync undo / redo
    useEffect(() => {
        setRangeValue(Number(payload.fields.duration));
    }, [payload.fields.duration]);

    function handleCommitRange(value: number) {
        if (value === payload.fields.duration) return;

        FlowController.updateNodePayload(nodeId, payload.id, {
            duration: value,
        });
    }

    function handleChangeUnit(unit: "second" | "minute" | "hour") {
        FlowController.updateNodePayload(nodeId, payload.id, { unit });
    }

    useEffect(() => {
        if (rangeValue == null) {
            setErrors([
                {
                    field: "duration",
                    message: "Vui lòng nhập thời gian",
                },
            ]);
        } else {
            setErrors([]);
        }
    }, [rangeValue]);

    return (
        <BaseContent nodeId={nodeId} payloadId={payload.id} errors={errors}>
            <div className="p-2">
                <div className="flex items-center justify-center gap-2">
                    <DelayInput
                        rangeInput={rangeValue}
                        setRangeInput={setRangeValue}
                    />
                    <DelaySelect
                        unit={payload.fields.unit}
                        onChangeUnit={handleChangeUnit}
                    />
                </div>

                <DelayProgress
                    rangeValue={rangeValue}
                    onChange={setRangeValue}
                    onCommit={handleCommitRange}
                />
            </div>
        </BaseContent>
    );
}

export default DelayNode;
