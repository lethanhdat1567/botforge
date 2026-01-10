/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import DelayInput from "@/components/FlowCanvas/Nodes/Action/components/DelayNode/components/DelayInput/DelayInput";
import DelayProgress from "@/components/FlowCanvas/Nodes/Action/components/DelayNode/components/DelayProgress/DelayProgress";
import DelaySelect from "@/components/FlowCanvas/Nodes/Action/components/DelayNode/components/DelaySelect/DelaySelect";
import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import { DelayActionData } from "@/components/FlowCanvas/types/node/action.type";
import useDebounce from "@/hooks/use-debounce";
import { useEffect, useState } from "react";

type Props = { nodeId: any; payload: DelayActionData };

function DelayNode({ nodeId, payload }: Props) {
    const [errors, setErrors] = useState<any>([]);

    const [rangeValue, setRangeValue] = useState(
        Number(payload.fields.duration),
    );
    const rangeDebounce = Number(useDebounce(rangeValue, 500));

    function handleChangeUnit(unit: "second" | "minute" | "hour") {
        FlowController.updateNodePayload(nodeId, payload.id, {
            unit,
        });
    }

    function handleRangeChange(value: number) {
        setRangeValue(value);
    }

    useEffect(() => {
        FlowController.updateNodePayload(nodeId, payload.id, {
            duration: rangeDebounce,
        });
    }, [rangeDebounce]);

    useEffect(() => {
        if (rangeValue === null) {
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
        <BaseContent id={nodeId} errors={errors}>
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
                    onRangeChange={handleRangeChange}
                />
            </div>
        </BaseContent>
    );
}

export default DelayNode;
