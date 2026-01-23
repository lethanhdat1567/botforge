import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { pageService } from "@/services/pageService";

type Page = {
    id: string;
    name: string;
};

type Props = {
    value?: string;
    error?: string;
    onChange: (pageId: string) => void;
};

function PageSelect({ value, error, onChange }: Props) {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setLoading(true);
                const res = await pageService.list({});
                if (mounted) setPages(res.data);
            } catch (e) {
                console.error("Failed to fetch pages", e);
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <Field>
            <FieldLabel>Page</FieldLabel>

            <Select value={value} onValueChange={onChange} disabled={loading}>
                <SelectTrigger aria-invalid={!!error}>
                    <SelectValue
                        placeholder={
                            loading ? "Loading pages..." : "Select page"
                        }
                    />
                </SelectTrigger>
                <SelectContent>
                    {pages.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                            {p.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {error && <FieldError>{error}</FieldError>}
        </Field>
    );
}

export default PageSelect;
