"use client";

import { useEffect, useState } from "react";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export type PageFormData = {
    name: string;
    page_uid: string;
    access_token: string;
};

type Props = {
    initialValues?: Partial<PageFormData>;
    onSubmit: (data: PageFormData) => void;
    loading?: boolean;
};

function PageForm({ initialValues, onSubmit, loading }: Props) {
    const [form, setForm] = useState<PageFormData>({
        name: "",
        page_uid: "",
        access_token: "",
    });

    const [showToken, setShowToken] = useState(false);

    // ✅ set data khi edit
    useEffect(() => {
        if (initialValues) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setForm((prev) => ({ ...prev, ...initialValues }));
        }
    }, [initialValues]);

    const handleChange =
        (key: keyof PageFormData) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, [key]: e.target.value });
        };

    const isValid =
        form.name.trim() && form.page_uid.trim() && form.access_token.trim();

    return (
        <form
            className="space-y-4"
            onSubmit={(e) => {
                e.preventDefault();
                if (!isValid || loading) return;
                onSubmit(form);
            }}
        >
            <FieldSet>
                <Field>
                    <FieldLabel htmlFor="name">Page name</FieldLabel>
                    <Input
                        id="name"
                        value={form.name}
                        onChange={handleChange("name")}
                        placeholder="My Facebook Page"
                        autoComplete="off"
                    />
                </Field>

                <Field>
                    <FieldLabel htmlFor="page_uid">Page UID</FieldLabel>
                    <Input
                        id="page_uid"
                        value={form.page_uid}
                        onChange={handleChange("page_uid")}
                        placeholder="123456789012345"
                        autoComplete="off"
                    />
                    <p className="text-muted-foreground text-xs">
                        UID do platform cung cấp (Facebook / Zalo / Instagram)
                    </p>
                </Field>

                <Field>
                    <FieldLabel htmlFor="access_token">Access token</FieldLabel>

                    <div className="relative">
                        <Input
                            id="access_token"
                            type={showToken ? "text" : "password"}
                            value={form.access_token}
                            onChange={handleChange("access_token")}
                            placeholder="EAAG..."
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2"
                            onClick={() => setShowToken((v) => !v)}
                        >
                            {showToken ? (
                                <EyeOff size={16} />
                            ) : (
                                <Eye size={16} />
                            )}
                        </button>
                    </div>

                    <p className="text-muted-foreground text-xs">
                        Token sẽ được mã hoá và không hiển thị lại đầy đủ
                    </p>
                </Field>
            </FieldSet>

            <div className="flex justify-end">
                <Button type="submit" disabled={!isValid || loading}>
                    {loading ? "Saving..." : "Save"}
                </Button>
            </div>
        </form>
    );
}

export default PageForm;
