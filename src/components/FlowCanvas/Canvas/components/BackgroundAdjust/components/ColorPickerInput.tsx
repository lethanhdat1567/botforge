"use client";

import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type ColorInputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
};

function ColorInput({ label, value, onChange }: ColorInputProps) {
    return (
        <div className="flex items-center justify-between gap-3">
            <Label className="text-sm">{label}</Label>

            <div className="flex items-center gap-2">
                {/* Input nhập mã màu */}
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-8 w-24 text-sm"
                    placeholder="#FFFFFF"
                />

                {/* Color picker */}
                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            className="h-8 w-8 rounded border"
                            style={{ backgroundColor: value }}
                        />
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-2">
                        <HexColorPicker color={value} onChange={onChange} />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}

export default ColorInput;
