import { resolveImageSrc } from "@/lib/image";
import { uploadService } from "@/services/uploadService";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

type Props = { src?: string; onUpload: any };

function GenericUploadImage({ src, onUpload }: Props) {
    async function handleUpload(e: any) {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const res = await uploadService.uploadFile(file);
            onUpload(resolveImageSrc(res.data.data.path));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {src ? (
                <div className="h-50 w-full">
                    <Image
                        width={500}
                        height={500}
                        src={src}
                        alt="image"
                        className="h-full w-full object-cover"
                    />
                </div>
            ) : (
                <label className="text-md flex h-50 w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-neutral-400">
                    <ImageIcon />
                    Upload your image
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                    />
                </label>
            )}
        </div>
    );
}

export default GenericUploadImage;
