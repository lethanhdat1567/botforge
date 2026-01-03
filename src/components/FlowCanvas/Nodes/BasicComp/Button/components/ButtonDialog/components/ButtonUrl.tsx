import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDebounce from "@/hooks/use-debounce";
import { useEffect, useState } from "react";

function ButtonUrl({
    onChange,
    urlValue,
}: {
    onChange: any;
    urlValue: string;
}) {
    const [urlInput, setUrlInput] = useState(urlValue);
    const debouncedUrlInput = useDebounce(urlInput, 500);

    useEffect(() => {
        onChange(debouncedUrlInput);
    }, [debouncedUrlInput]);

    return (
        <div className="pt-2">
            <Label className="mb-3">Truyền Url của bạn:</Label>
            <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full"
                placeholder="Url..."
            />
        </div>
    );
}

export default ButtonUrl;
