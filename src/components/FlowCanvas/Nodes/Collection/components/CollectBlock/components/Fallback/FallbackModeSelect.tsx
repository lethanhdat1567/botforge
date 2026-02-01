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
        <div>
            <div className="flex items-center gap-2">
                <label className="w-32 font-medium">Phản hồi:</label>

                <Select value={value} onValueChange={onChange}>
                    <SelectTrigger className="min-w-40">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Dùng Mặc định</SelectItem>
                        <SelectItem value="custom">Tự Tuỳ chỉnh</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default FallbackModeSelect;
