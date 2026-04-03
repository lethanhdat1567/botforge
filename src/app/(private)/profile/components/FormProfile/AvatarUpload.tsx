"use client";

import { Button } from "@/components/ui/button";
import { User, Loader2 } from "lucide-react"; // Thêm Loader để user biết đang upload
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { uploadService } from "@/services/uploadService"; // Giả sử bạn có service upload riêng
import { resolveMediaSrc } from "@/lib/image";

type Props = {
    value?: string | null; 
    onChange: (url: string) => void; 
};

function AvatarUpload({ value, onChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | undefined>(value ?? undefined);
    const [isUploading, setIsUploading] = useState(false);

    // Đồng bộ preview khi value từ props thay đổi (ví dụ khi load dữ liệu user)
    useEffect(() => {
        setPreview(value ?? undefined);
    }, [value]);

    async function handleFileChange(file?: File) {
        if (!file) return;

        try {
            setIsUploading(true);
            

            const response = await uploadService.uploadFile(file); 
            
            const uploadedUrl = response.path;
            setPreview(uploadedUrl)
            onChange(uploadedUrl);
            
        } catch (error) {
            console.error("Upload failed:", error);
            setPreview(value ?? undefined);
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className="mb-4 flex items-center gap-4">
            <div className="bg-muted relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full">
                {preview ? (
                    <Image
                        src={resolveMediaSrc(preview)}
                        alt="avatar"
                        className={`h-full w-full object-cover ${isUploading ? "opacity-50" : ""}`}
                        width={100}
                        height={100}
                    />
                ) : (
                    <User className="text-muted-foreground" />
                )}
                
                {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFileChange(e.target.files?.[0])}
                disabled={isUploading}
            />

            <Button
                type="button"
                variant="outline"
                className="rounded-md"
                onClick={() => inputRef.current?.click()}
                disabled={isUploading}
            >
                {isUploading ? "Uploading..." : "Change Avatar"}
            </Button>
        </div>
    );
}

export default AvatarUpload;