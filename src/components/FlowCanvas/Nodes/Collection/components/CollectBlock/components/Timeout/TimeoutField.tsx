"use client";

import TimeoutCustomFields from "@/components/FlowCanvas/Nodes/Collection/components/CollectBlock/components/Timeout/TimeoutCustomFields";
import TimeoutModeSelect from "@/components/FlowCanvas/Nodes/Collection/components/CollectBlock/components/Timeout/TimeoutModeSelect";
import { VariableData } from "@/components/FlowCanvas/types/node/collection.type";
import { Dispatch, SetStateAction } from "react";

type Timeout = {
    duration: number;
    unit: "second" | "minute" | "hour";
    mode: "default" | "custom";
};

type Props = {
    value: Timeout;
    onChange: Dispatch<SetStateAction<VariableData>>;
    onCommit: (timeout: Timeout) => void;
};

function TimeoutField({ value, onChange, onCommit }: Props) {
    const updateTimeout = (
        updater: (prev: Timeout) => Timeout,
        commit = false,
    ) => {
        onChange((prev) => {
            const nextTimeout = updater(prev.timeout);

            if (commit) {
                onCommit(nextTimeout);
            }

            return {
                ...prev,
                timeout: nextTimeout,
            };
        });
    };

    return (
        <div className="space-y-2">
            <TimeoutModeSelect
                value={value.mode}
                onChange={(mode) =>
                    updateTimeout((prev) => ({ ...prev, mode }), true)
                }
            />

            {value.mode === "custom" && (
                <TimeoutCustomFields
                    value={value}
                    onChangeDuration={(duration) =>
                        updateTimeout(
                            (prev) => ({
                                ...prev,
                                duration: Math.max(1, Math.min(99, duration)),
                            }),
                            false,
                        )
                    }
                    onCommitDuration={() => updateTimeout((prev) => prev, true)}
                    onChangeUnit={(unit) =>
                        updateTimeout((prev) => ({ ...prev, unit }), true)
                    }
                />
            )}
        </div>
    );
}

export default TimeoutField;
