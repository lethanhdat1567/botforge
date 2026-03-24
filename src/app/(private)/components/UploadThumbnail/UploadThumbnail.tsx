"use client";

import { Button } from "@/components/ui/button";
import { resolveMediaSrc } from "@/lib/image";
import { cn } from "@/lib/utils";
import { uploadService } from "@/services/uploadService";
import { Loader2, X, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";
import { toast } from "sonner";

type Props = {
    className?: string;
    value?: string | null;
    disabled?: boolean;
    onChange: (path?: string | null) => void;
};

function UploadThumbnail({ className, value, disabled, onChange }: Props) {
    const id = useId();
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            const res = await uploadService.uploadFile(file);
            onChange(res.path);
        } catch (error) {
            toast.error("Upload failed!");
        } finally {
            setLoading(false);
        }
    };
    console.log(value);

    return (
        <div className={cn("group relative w-full", className)}>
            <div
                className={cn(
                    "border-input bg-background relative h-70 w-full overflow-hidden rounded-md border transition-all duration-200",
                    !value &&
                        "hover:border-primary/50 hover:bg-accent/50 border-dashed",
                    (disabled || loading) && "cursor-not-allowed opacity-50",
                )}
            >
                {value ? (
                    <div className="relative h-full w-full">
                        <Image
                            src={resolveMediaSrc(value)}
                            alt="Thumbnail"
                            fill
                            className="object-contain"
                        />
                        {/* Overlay dọn dẹp nút xóa cho gọn */}
                        {!disabled && (
                            <Button
                                variant={"destructive"}
                                size={"icon-sm"}
                                className="absolute top-2 right-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onChange(null);
                                }}
                                type="button"
                            >
                                <X />
                            </Button>
                        )}
                    </div>
                ) : (
                    <label
                        htmlFor={id}
                        className={cn(
                            "flex h-full w-full cursor-pointer items-center justify-center gap-4 px-6",
                            disabled && "pointer-events-none",
                        )}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
                                <span className="text-muted-foreground text-xs font-medium italic">
                                    Processing...
                                </span>
                            </div>
                        ) : (
                            <>
                                <UploadCloud className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
                                <div className="text-left">
                                    <p className="text-xs font-medium">
                                        Upload thumbnail
                                    </p>
                                    <p className="text-muted-foreground text-[10px] tracking-tight uppercase">
                                        PNG, JPG (Max 5MB)
                                    </p>
                                </div>
                            </>
                        )}
                        <input
                            id={id}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={disabled || loading}
                        />
                    </label>
                )}
            </div>
        </div>
    );
}

export default UploadThumbnail;
