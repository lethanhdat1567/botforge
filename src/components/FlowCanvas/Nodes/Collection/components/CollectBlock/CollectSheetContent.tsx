"use client";

import { useEffect, useState } from "react";
import { VariableData } from "@/components/FlowCanvas/types/node/collection.type";
import { Input } from "@/components/ui/input";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import equal from "fast-deep-equal";
import TimeoutField from "@/components/FlowCanvas/Nodes/Collection/components/CollectBlock/components/Timeout/TimeoutField";
import FallbackField from "@/components/FlowCanvas/Nodes/Collection/components/CollectBlock/components/Fallback/FallbackField";
import { Separator } from "@/components/ui/separator";

type Props = {
    variable: VariableData;
    nodeId: string;
    fieldId: string;
    setErrors: any;
};

function CollectSheetContent({ variable, nodeId, fieldId, setErrors }: Props) {
    const [localVariable, setLocalVariable] = useState<VariableData>(variable);

    // Sync khi undo / redo / đổi node
    useEffect(() => {
        setLocalVariable(variable);
    }, [variable]);

    /* =====================
     * Commit helper
     * ===================== */
    const commit = (next: VariableData) => {
        if (equal(next, variable)) return;

        FlowController.updateNodePayload(nodeId, fieldId, {
            variable: next,
        });
    };

    /* =====================
     * Handlers
     * ===================== */

    const handleChangeVariableKey = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setLocalVariable((prev) => ({
            ...prev,
            key: e.target.value,
        }));
    };

    const handleBlurVariableKey = () => {
        commit(localVariable);
    };

    const handleChangeRegex = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalVariable((prev) => ({
            ...prev,
            regex: e.target.value,
        }));
    };

    const handleBlurRegex = () => {
        commit(localVariable);
    };

    return (
        <div className="space-y-6 px-4">
            {/* Variable */}
            <div>
                <label className="mb-1 block font-medium">Biến</label>
                <Input
                    value={localVariable.key}
                    onChange={handleChangeVariableKey}
                    onBlur={handleBlurVariableKey}
                    placeholder="Biến..."
                />
            </div>

            {/* Regex */}
            <div>
                <label className="mb-1 block font-medium">
                    Mẫu kiểm tra (Regex)
                </label>

                <Input
                    value={localVariable.regex}
                    onChange={handleChangeRegex}
                    onBlur={handleBlurRegex}
                />
            </div>

            <Separator />

            {/* Timeout */}
            <TimeoutField
                value={localVariable.timeout}
                onChange={setLocalVariable}
                onCommit={(timeout) =>
                    commit({
                        ...localVariable,
                        timeout,
                    })
                }
            />

            {/* Fallback */}
            <FallbackField
                value={localVariable.fallback}
                onChange={setLocalVariable}
                onCommit={(fallback) =>
                    commit({
                        ...localVariable,
                        fallback,
                    })
                }
            />
        </div>
    );
}

export default CollectSheetContent;
