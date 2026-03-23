"use client";

import { DelayField } from "@/components/FlowCanvas/types/node/collection.type";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    timeout: DelayField;
    onCommit: (newTimeout: DelayField) => void;
}

function FallbackTimeOut({ timeout, onCommit }: Props) {
    // Hàm helper để update từng phần của DelayField
    const updateTimeout = (updates: Partial<DelayField>) => {
        onCommit({
            ...timeout,
            ...updates,
        });
    };

    return (
        <div className="flex items-center gap-2">
            {/* Input số lượng thời gian */}
            <div className="relative flex-1">
                <Input
                    type="number"
                    min={1}
                    value={timeout.duration}
                    onChange={(e) =>
                        updateTimeout({ duration: Number(e.target.value) || 0 })
                    }
                    className="h-9 pr-7"
                />
            </div>

            {/* Select đơn vị thời gian (Giây, Phút, Giờ) */}
            <Select
                value={timeout.unit}
                onValueChange={(value: "s" | "m" | "h") =>
                    updateTimeout({ unit: value })
                }
            >
                <SelectTrigger className="h-9 w-20 bg-slate-50 font-medium">
                    <SelectValue placeholder="Đơn vị" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="s">Giây</SelectItem>
                    <SelectItem value="m">Phút</SelectItem>
                    <SelectItem value="h">Giờ</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default FallbackTimeOut;
