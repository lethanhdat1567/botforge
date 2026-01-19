"use client";

import { Dispatch, SetStateAction } from "react";
import { Textarea } from "@/components/ui/textarea";
import { VariableData } from "@/components/FlowCanvas/types/node/collection.type";
import FallbackModeSelect from "@/components/FlowCanvas/Nodes/Collection/components/CollectBlock/components/Fallback/FallbackModeSelect";

type Fallback = {
    mode: "default" | "custom";
    value: string;
};

type Props = {
    value: Fallback;
    onChange: Dispatch<SetStateAction<VariableData>>;
    onCommit: (fallback: Fallback) => void;
};

function FallbackField({ value, onChange, onCommit }: Props) {
    const updateFallback = (
        updater: (prev: Fallback) => Fallback,
        commit = false,
    ) => {
        onChange((prev) => {
            const nextFallback = updater(prev.fallback);

            if (commit) {
                onCommit(nextFallback);
            }

            return {
                ...prev,
                fallback: nextFallback,
            };
        });
    };

    return (
        <div className="space-y-2">
            <FallbackModeSelect
                value={value.mode}
                onChange={(mode) =>
                    updateFallback((prev) => ({ ...prev, mode }), true)
                }
            />

            {value.mode === "custom" && (
                <Textarea
                    className="h-40 resize-none"
                    value={value.value}
                    onChange={(e) =>
                        updateFallback(
                            (prev) => ({
                                ...prev,
                                value: e.target.value,
                            }),
                            false,
                        )
                    }
                    onBlur={() => updateFallback((prev) => prev, true)}
                />
            )}
        </div>
    );
}

export default FallbackField;
