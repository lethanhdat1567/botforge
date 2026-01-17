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
import useDebounce from "@/hooks/use-debounce";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";

type Props = {
    variable: VariableData;
    nodeId: string;
    fieldId: string;
};

function CollectSheetContent({ variable, nodeId, fieldId }: Props) {
    /* =====================
     * Local state
     * ===================== */
    const [localVariable, setLocalVariable] = useState<VariableData>(variable);

    // Sync khi đổi node / đổi variable
    useEffect(() => {
        setLocalVariable(variable);
    }, [variable]);

    /* =====================
     * Debounce
     * ===================== */
    const debouncedVariable = useDebounce(localVariable, 500);

    useEffect(() => {
        FlowController.updateNodePayload(nodeId, fieldId, {
            variable: debouncedVariable,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedVariable]);

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

    const handleChangeRegex = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalVariable((prev) => ({
            ...prev,
            regex: e.target.value,
        }));
    };

    const handleChangeTimeoutValue = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        let value = Number(e.target.value);

        // Cho phép rỗng khi đang gõ
        if (Number.isNaN(value)) {
            return;
        }

        // Clamp 1 → 99
        value = Math.max(1, Math.min(99, value));

        setLocalVariable((prev) => ({
            ...prev,
            timeout: {
                ...prev.timeout,
                duration: value,
            },
        }));
    };

    const handleChangeTimeoutUnit = (unit: "second" | "minute" | "hour") => {
        setLocalVariable((prev) => ({
            ...prev,
            timeout: {
                ...prev.timeout,
                unit,
            },
        }));
    };

    const handleChangeFallback = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setLocalVariable((prev) => ({
            ...prev,
            fallback: e.target.value,
        }));
    };

    /* =====================
     * Render
     * ===================== */

    return (
        <div className="space-y-6 px-4">
            {/* Variable */}
            <div>
                <label className="text-md mb-1 block font-medium">Biến</label>
                <Input
                    value={localVariable.key}
                    onChange={handleChangeVariableKey}
                />
            </div>

            {/* Regex */}
            <div>
                <label className="text-md mb-1 block font-medium">Regex</label>
                <Input
                    value={localVariable.regex}
                    onChange={handleChangeRegex}
                />
            </div>

            {/* Timeout */}
            <div className="flex items-center gap-2">
                <label className="text-md w-70 font-medium">Timeout Bot:</label>

                <Input
                    type="number"
                    min={1}
                    max={99}
                    step={1}
                    value={localVariable.timeout.duration}
                    onChange={handleChangeTimeoutValue}
                />

                <Select
                    value={localVariable.timeout.unit}
                    onValueChange={handleChangeTimeoutUnit}
                >
                    <SelectTrigger className="min-w-34">
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
                <label className="text-md mb-1 block font-medium">
                    Fallback
                </label>
                <Textarea
                    className="h-40 resize-none"
                    value={localVariable.fallback}
                    onChange={handleChangeFallback}
                />
                <p className="mt-2 text-sm text-neutral-400 italic">
                    * Đây là tin nhắn sẽ được gửi đi sau khi hết thời gian
                    timeout
                </p>
            </div>
        </div>
    );
}

export default CollectSheetContent;
