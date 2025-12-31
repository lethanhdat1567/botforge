import { Input } from "@/components/ui/input";
import { flowService } from "@/services/flowService";
import { File } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
    folderId: string;
    platform: string;
    onRefresh: any;
    setIsCreateFlow: any;
};

function CreateFlow({ folderId, platform, onRefresh, setIsCreateFlow }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Unfocus
    async function handleBlur() {
        try {
            if (inputValue) {
                if (errorMsg) return;
                await flowService.createFlow({
                    name: inputValue,
                    folderId,
                    platform,
                });
                onRefresh();
                setIsCreateFlow(false);
                toast.success("Tạo folder thành công!");
            }
        } catch (error: any) {
            console.log(error);
            if (error.response.data.data.code === "NAME_ALREADY_EXISTS") {
                setErrorMsg("Tên flow đã tồn tại");
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
                <div className="flex h-full w-full items-center gap-2">
                    <File size={16} />
                    <Input
                        ref={inputRef}
                        className={`${errorMsg ? "border-red-500!" : ""} h-full flex-1 rounded-xs! ring-0!`}
                        placeholder="Flow mới..."
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

export default CreateFlow;
