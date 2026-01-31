"use client";

import ColorInput from "@/components/FlowCanvas/Canvas/components/BackgroundAdjust/components/ColorPickerInput";
import VariantSelect from "@/components/FlowCanvas/Canvas/components/BackgroundAdjust/components/VariantSelect";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useBackgroundAdjustStore } from "@/store/backgroundAdjustStore";

import { Settings } from "lucide-react";

function BackgroundAdjust() {
    const { variant, color, bgColor, setVariant, setColor, setBgColor } =
        useBackgroundAdjustStore();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Settings size={16} />
                    Điều chỉnh nền
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-72 space-y-4 p-4">
                {/* Kiểu nền */}
                <VariantSelect value={variant} onChange={setVariant as any} />

                <Separator />

                {/* Màu grid / line */}
                <ColorInput
                    label="Màu đường"
                    value={color}
                    onChange={setColor}
                />

                {/* Màu nền */}
                <ColorInput
                    label="Màu nền"
                    value={bgColor}
                    onChange={setBgColor}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default BackgroundAdjust;
