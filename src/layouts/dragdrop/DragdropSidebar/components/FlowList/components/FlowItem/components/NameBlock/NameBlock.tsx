import { Input } from "@/components/ui/input";
import { HttpError } from "@/http/helpers";
import { flowService } from "@/services/flowService";
import { useEffect, useRef, useState } from "react";

type Props = {
    flowId: string;
    name: string;
    isRename: boolean;
    onRename: () => void;
};

function NameBlock({ flowId, isRename, name, onRename }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputName, setInputName] = useState(name);
    const [error, setError] = useState("");

    const handleBlur = async () => {
        if (inputName === name || !inputName.trim()) return onRename();
        try {
            await flowService.updateFlow(flowId, { name: inputName });
            onRename();
        } catch (error) {
            console.log(error);
            if (error instanceof HttpError) {
                if (error.status === 409) {
                    setError("Tên flow đã tồn tại");
                }
            }
        }
    };

    useEffect(() => {
        if (isRename) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isRename]);

    return isRename ? (
        <div className="w-full">
            <Input
                ref={inputRef}
                value={inputName}
                onChange={(e) => {
                    setError("");
                    setInputName(e.target.value);
                }}
                onBlur={handleBlur}
                aria-invalid={Boolean(error)}
                className="w-full"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    ) : (
        <div className="text-foreground/80 group-hover:text-foreground truncate text-sm font-medium transition-colors">
            {name}
        </div>
    );
}

export default NameBlock;
