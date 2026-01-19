"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type FallbackMode = "default" | "custom";

type Props = {
    value: FallbackMode;
    onChange: (mode: FallbackMode) => void;
};

function FallbackModeSelect({ value, onChange }: Props) {
    return (
        <div className="flex items-center gap-2">
            <label className="w-32 font-medium">Fallback:</label>

            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="min-w-40">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="default">Không dùng</SelectItem>
                    <SelectItem value="custom">Tuỳ chỉnh</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default FallbackModeSelect;
