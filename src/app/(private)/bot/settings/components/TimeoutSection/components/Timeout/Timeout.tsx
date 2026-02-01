"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export type TimeoutUnit = "second" | "minute" | "hour" | "day";

type Props = {
    duration: number;
    unit: TimeoutUnit;
    onChange: (data: {
        timeoutDuration?: number;
        timeoutUnit?: TimeoutUnit;
    }) => void;
};

function Timeout({ duration, unit, onChange }: Props) {
    const [localDuration, setLocalDuration] = useState(String(duration));

    useEffect(() => {
        setLocalDuration(String(duration));
    }, [duration]);

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;
        setLocalDuration(value);
    };

    const handleDurationBlur = () => {
        let value = Number(localDuration);

        if (Number.isNaN(value) || value < 1) value = 1;
        if (value > 99) value = 99;

        setLocalDuration(String(value));
        onChange({ timeoutDuration: value });
    };

    const unitLabel = {
        second: "giây",
        minute: "phút",
        hour: "giờ",
        day: "ngày",
    }[unit];

    return (
        <div className="space-y-3">
            <h3 className="text-md mb-2 block font-medium">
                Thời gian chờ phản hồi
            </h3>
            <div className="flex max-w-sm items-center gap-2">
                <Input
                    type="text"
                    inputMode="numeric"
                    value={localDuration}
                    onChange={handleDurationChange}
                    onBlur={handleDurationBlur}
                    className="w-24"
                    placeholder="1–99"
                />

                <Select
                    value={unit}
                    onValueChange={(value) =>
                        onChange({
                            timeoutUnit: value as TimeoutUnit,
                        })
                    }
                >
                    <SelectTrigger className="w-32">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="second">Giây</SelectItem>
                        <SelectItem value="minute">Phút</SelectItem>
                        <SelectItem value="hour">Giờ</SelectItem>
                        <SelectItem value="day">Ngày</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <p className="text-muted-foreground text-sm">
                Sau <b>{localDuration || "…"}</b> {unitLabel} nếu không có phản
                hồi, bot sẽ gửi <b>tin nhắn khi hết thời gian chờ</b>.
            </p>
        </div>
    );
}

export default Timeout;
