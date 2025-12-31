"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { folderService } from "@/services/folderService"; // giả sử bạn có service này

interface EditNameProps {
    value: string;
    folderId: string;
    setIsEdit: (value: boolean) => void;
    refresh: () => void;
}

function EditName({ value, folderId, setIsEdit, refresh }: EditNameProps) {
    const [newValue, setNewValue] = useState(value);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const initialValueRef = useRef(value); // lưu value init

    // focus khi mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // xử lý change
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewValue(e.target.value);
        setError(null);
    }

    // kiểm tra và fetch
    async function handleCheck() {
        const trimmed = newValue.trim();

        if (!trimmed || trimmed === initialValueRef.current) {
            setIsEdit(false);
            return;
        }
        if (error) return;

        try {
            await folderService.updateFolder(folderId, trimmed);
            setIsEdit(false);
            setError(null);
            refresh();
        } catch (err: any) {
            // giả sử BE trả { code: 'DUPLICATE_NAME' }
            if (err?.response?.data?.data?.code === "NAME_ALREADY_EXISTS") {
                setError("Tên folder đã tồn tại.");
            } else {
                setError("Có lỗi xảy ra. Vui lòng thử lại.");
            }
        }
    }

    // enter
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            handleCheck();
            inputRef.current?.blur(); // blur sau khi enter
        }
    }

    // blur
    function handleBlur() {
        handleCheck();
    }

    return (
        <div className="flex w-full flex-col gap-1">
            <Input
                ref={inputRef}
                value={newValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`${error ? "border-red-500" : ""} w-full flex-1`}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}

export default EditName;
