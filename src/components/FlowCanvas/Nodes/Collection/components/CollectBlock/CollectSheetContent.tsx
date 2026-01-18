"use client";

import { useEffect, useState } from "react";
import { VariableData } from "@/components/FlowCanvas/types/node/collection.type";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import equal from "fast-deep-equal";

type Props = {
    variable: VariableData;
    nodeId: string;
    fieldId: string;
};

function CollectSheetContent({ variable, nodeId, fieldId }: Props) {
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

    const handleChangeTimeoutValue = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        let value = Number(e.target.value);
        if (Number.isNaN(value)) return;

        value = Math.max(1, Math.min(99, value));

        setLocalVariable((prev) => ({
            ...prev,
            timeout: {
                ...prev.timeout,
                duration: value,
            },
        }));
    };

    const handleBlurTimeoutValue = () => {
        commit(localVariable);
    };

    const handleChangeTimeoutUnit = (unit: "second" | "minute" | "hour") => {
        const next = {
            ...localVariable,
            timeout: {
                ...localVariable.timeout,
                unit,
            },
        };

        setLocalVariable(next);
        commit(next); // Select → commit ngay
    };

    const handleChangeFallback = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setLocalVariable((prev) => ({
            ...prev,
            fallback: e.target.value,
        }));
    };

    const handleBlurFallback = () => {
        commit(localVariable);
    };

    /* =====================
     * Render
     * ===================== */

    return (
        <div className="space-y-6 px-4">
            {/* Variable */}
            <div>
                <label className="mb-1 block font-medium">Biến</label>
                <Input
                    value={localVariable.key}
                    onChange={handleChangeVariableKey}
                    onBlur={handleBlurVariableKey}
                />
            </div>

            {/* Regex */}
            <div>
                <label className="mb-1 block font-medium">Regex</label>
                <Input
                    value={localVariable.regex}
                    onChange={handleChangeRegex}
                    onBlur={handleBlurRegex}
                />
            </div>

            {/* Timeout */}
            <div className="flex items-center gap-2">
                <label className="w-32 font-medium">Timeout Bot:</label>

                <Input
                    type="number"
                    min={1}
                    max={99}
                    step={1}
                    value={localVariable.timeout.duration}
                    onChange={handleChangeTimeoutValue}
                    onBlur={handleBlurTimeoutValue}
                />

                <Select
                    value={localVariable.timeout.unit}
                    onValueChange={handleChangeTimeoutUnit}
                >
                    <SelectTrigger className="min-w-32">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="second">Giây</SelectItem>
                        <SelectItem value="minute">Phút</SelectItem>
                        <SelectItem value="hour">Giờ</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Fallback */}
            <div>
                <label className="mb-1 block font-medium">Fallback</label>
                <Textarea
                    className="h-40 resize-none"
                    value={localVariable.fallback}
                    onChange={handleChangeFallback}
                    onBlur={handleBlurFallback}
                />
            </div>
        </div>
    );
}

export default CollectSheetContent;
