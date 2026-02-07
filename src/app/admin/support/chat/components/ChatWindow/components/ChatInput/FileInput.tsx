import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Paperclip } from "lucide-react";
import { useRef } from "react";

type Props = {
    onSelect?: (file: File) => void;
};

function FileInput({ onSelect }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOpen = () => {
        inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        onSelect?.(file);

        // reset để chọn lại cùng file
        e.target.value = "";
    };

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                hidden
                accept="image/*,video/*"
                onChange={handleChange}
            />

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={handleOpen}
                    >
                        <Paperclip className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Đính kèm ảnh hoặc video</p>
                </TooltipContent>
            </Tooltip>
        </>
    );
}

export default FileInput;
