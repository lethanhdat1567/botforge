"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { flowService } from "@/services/flowService"; // giả sử bạn có service này
import { toast } from "sonner";

interface RenameFlowProps {
    flowId: string;
    name: string;
    onRefresh: () => void;
    setIsRename: (value: boolean) => void;
}

function RenameFlow({ flowId, name, onRefresh, setIsRename }: RenameFlowProps) {
    const [newName, setNewName] = useState(name);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const initialNameRef = useRef(name);

    // auto focus
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // handle change
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewName(e.target.value);
        setError(null);
    }

    // check & update
    async function handleCheck() {
        const trimmed = newName.trim();
        if (!trimmed || trimmed === initialNameRef.current) {
            setIsRename(false);
            return;
        }
        if (error) return;

        try {
            await flowService.updateFlow(flowId, { name: trimmed });
            setError(null);
            setIsRename(false);
            toast.success("Tạo flow thành công!");
            onRefresh();
        } catch (err: any) {
            if (err?.response?.data?.data?.code === "NAME_ALREADY_EXISTS") {
                setError("Tên flow đã tồn tại.");
            } else {
                setError("Có lỗi xảy ra. Vui lòng thử lại.");
            }
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            handleCheck();
        }
    }

    function handleBlur() {
        handleCheck();
    }

    return (
        <div className="flex h-full w-full flex-col gap-1">
            <Input
                ref={inputRef}
                value={newName}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}

export default RenameFlow;
