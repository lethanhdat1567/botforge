import { Input } from "@/components/ui/input";
import { folderService } from "@/services/folderService";
import { ChevronRight, Folder } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function CreateFolder({
    setNewFolderPlatform,
    platform,
    onRefresh,
}: {
    setNewFolderPlatform: any;
    platform: string;
    onRefresh: any;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Unfocus
    async function handleBlur() {
        try {
            if (inputValue) {
                if (errorMsg) return;
                await folderService.createFolder(inputValue, platform);
                onRefresh();
                toast.success("Tạo folder thành công!");
            }

            setNewFolderPlatform("");
        } catch (error: any) {
            console.log(error);
            if (error.response.data.data.code === "NAME_ALREADY_EXISTS") {
                setErrorMsg("Tên folder đã tồn tại");
            }
        }
    }

    // Keydown
    function handleKeydown(e: any) {
        if (e.key === "Enter") {
            handleBlur();
        }
    }

    // Change Input
    function handleChange(e: any) {
        if (e.target.value.trim()) {
            setErrorMsg("");
            setInputValue(e.target.value);
        } else {
            setInputValue("");
        }
    }

    // Focus input when mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className="mt-1 w-full px-2">
            <div className="flex h-8 w-full flex-1 items-center gap-4">
                <ChevronRight
                    className={
                        "h-4 w-4 shrink-0 transition-transform duration-200"
                    }
                />
                <div className="flex h-full w-full items-center gap-2">
                    <Folder size={16} />
                    <Input
                        ref={inputRef}
                        className={`${errorMsg ? "border-red-500!" : ""} h-full flex-1 rounded-xs! ring-0!`}
                        placeholder="Thư mục mới..."
                        onBlur={handleBlur}
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeydown}
                    />
                </div>
            </div>
            {errorMsg && (
                <p className="mt-2 pl-14 text-sm text-red-500">{errorMsg}</p>
            )}
        </div>
    );
}

export default CreateFolder;
