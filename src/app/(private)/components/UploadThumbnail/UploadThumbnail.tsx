import { Button } from "@/components/ui/button";
import { resolveMediaSrc } from "@/lib/image";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useState } from "react";

type Props = {
    className?: string;

    /** filename / path từ BE */
    value?: string;

    accept?: string;
    disabled?: boolean;

    /** File mới để upload */
    onChange: (file: File) => void;

    /** remove cả preview + value */
    onRemove?: () => void;
};

function UploadThumbnail({
    className,
    value,
    accept = "image/**",
    disabled,
    onChange,
    onRemove,
}: Props) {
    const id = useId();

    // preview URL (ưu tiên file mới)
    const [preview, setPreview] = useState<string | undefined>(undefined);

    // khi value (filename) đổi → set preview từ server
    useEffect(() => {
        if (value) {
            console.log(value);

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPreview(resolveMediaSrc(value) as string);
        }
    }, [value]);

    // cleanup object URL
    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <div
            className={cn(
                "relative h-50 w-full overflow-hidden border border-dashed",
                className,
            )}
        >
            {preview ? (
                <div className="relative h-full w-full">
                    <Image
                        src={preview}
                        alt="Thumbnail"
                        fill
                        className="object-cover"
                        priority
                    />

                    {onRemove && (
                        <button
                            type="button"
                            onClick={() => {
                                setPreview(undefined);
                                onRemove();
                            }}
                            className="absolute top-2 right-2 z-10 rounded-full bg-white p-1 shadow"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            ) : (
                <label
                    htmlFor={id}
                    className={cn(
                        "flex h-full w-full cursor-pointer flex-col items-center justify-center text-center transition hover:bg-neutral-100",
                        disabled && "pointer-events-none opacity-50",
                    )}
                >
                    <span className="mb-3 inline-block rounded-full border p-3">
                        <ImageIcon size={16} />
                    </span>
                    <h3 className="mb-2 text-sm font-medium">
                        Drop your image here
                    </h3>
                    <span className="text-muted-foreground mb-4 block text-xs">
                        PNG or JPG (max. 5MB)
                    </span>
                    <Button
                        type="button"
                        className="rounded-none"
                        variant="outline"
                        disabled={disabled}
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        Select image
                    </Button>
                </label>
            )}

            <input
                id={id}
                type="file"
                accept={accept}
                className="hidden"
                disabled={disabled}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    // tạo preview từ File
                    const objectUrl = URL.createObjectURL(file);
                    setPreview(objectUrl);

                    // trả File ra ngoài để upload
                    onChange(file);
                }}
            />
        </div>
    );
}

export default UploadThumbnail;
