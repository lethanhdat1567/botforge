import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

type BackgroundVariant = "lines" | "dots" | "cross";

type VariantSelectProps = {
    value: BackgroundVariant;
    onChange: Dispatch<SetStateAction<BackgroundVariant>>;
};

function VariantSelect({ value, onChange }: VariantSelectProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Kiểu nền:</span>

            <Button
                size="sm"
                variant={value === "lines" ? "default" : "outline"}
                onClick={() => onChange("lines")}
            >
                Đường kẻ
            </Button>

            <Button
                size="sm"
                variant={value === "dots" ? "default" : "outline"}
                onClick={() => onChange("dots")}
            >
                Chấm
            </Button>

            <Button
                size="sm"
                variant={value === "cross" ? "default" : "outline"}
                onClick={() => onChange("cross")}
            >
                Lưới
            </Button>
        </div>
    );
}

export default VariantSelect;
