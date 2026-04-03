import { Input } from "@/components/ui/input";
import { HttpError } from "@/http/helpers";
import { flowService } from "@/services/flowService";
import { useLayoutEffect, useRef, useState } from "react";

/** Radix Dropdown trả focus về trigger khi đóng; blur ngay sau đó không được coi là hủy rename. */
const RENAME_BLUR_GRACE_MS = 250;

type Props = {
    flowId: string;
    name: string;
    isRename: boolean;
    onRename: () => void;
};

function NameBlock({ flowId, isRename, name, onRename }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const renameOpenedAtRef = useRef(0);
    const [inputName, setInputName] = useState(name);
    const [error, setError] = useState("");

    const handleBlur = async () => {
        if (Date.now() - renameOpenedAtRef.current < RENAME_BLUR_GRACE_MS) {
            queueMicrotask(() => inputRef.current?.focus());
            return;
        }
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

    useLayoutEffect(() => {
        if (!isRename) return;
        renameOpenedAtRef.current = Date.now();

        const focusInput = () => {
            inputRef.current?.focus({ preventScroll: true });
        };

        focusInput();

        const raf1 = requestAnimationFrame(() => {
            requestAnimationFrame(focusInput);
        });

        const t0 = window.setTimeout(focusInput, 0);
        const t1 = window.setTimeout(focusInput, 120);

        return () => {
            cancelAnimationFrame(raf1);
            clearTimeout(t0);
            clearTimeout(t1);
        };
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
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleBlur();
                    }
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
