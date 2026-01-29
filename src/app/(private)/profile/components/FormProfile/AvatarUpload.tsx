"use client";

import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

type Props = {
    value: File | string | null;
    onChange: (value: File | null) => void;
    src?: string;
};

function AvatarUpload({ value, onChange, src }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | undefined>(src);

    useEffect(() => {
        // Khi load từ BE (string)
        if (typeof value === "string") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPreview(value);
        }

        // Khi upload file mới
        if (value instanceof File) {
            const blobUrl = URL.createObjectURL(value);
            setPreview(blobUrl);

            return () => URL.revokeObjectURL(blobUrl);
        }

        // Khi xóa
        if (!value) {
            setPreview(undefined);
        }
    }, [value]);

    function handleFileChange(file?: File) {
        if (!file) return;
        onChange(file);
    }

    return (
        <div className="mb-4 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-neutral-200">
                {preview ? (
                    <Image
                        src={preview}
                        alt="avatar"
                        className="h-full w-full object-cover"
                        width={100}
                        height={100}
                    />
                ) : (
                    <User className="text-neutral-400" />
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFileChange(e.target.files?.[0])}
            />

            <Button
                type="button"
                className="rounded-none"
                onClick={() => inputRef.current?.click()}
            >
                Upload Image
            </Button>
        </div>
    );
}

export default AvatarUpload;
