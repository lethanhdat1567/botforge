"use client";

import { useEffect, useState } from "react";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    TemplateFormData,
    TemplateStatus,
} from "@/app/(private)/data/templates/components/PlatformContent/components/TemplateForm/type";
import PageSelect from "@/app/(private)/data/templates/components/PlatformContent/components/SelectPage/SelectPage";
import { flowService } from "@/services/flowService";

type Props = {
    initialValues?: Partial<TemplateFormData>;
    loading?: boolean;
    isUpdate?: boolean;
    onRefresh: any;
};

function TemplateForm({
    initialValues,
    loading,
    isUpdate = false,
    onRefresh,
}: Props) {
    const [form, setForm] = useState<TemplateFormData>({
        name: "",
        desc: "",
        status: "draft",
        pageId: "",
    });

    const [errors, setErrors] = useState<
        Partial<Record<keyof TemplateFormData, string>>
    >({});

    // set data khi update
    useEffect(() => {
        if (initialValues) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setForm((prev) => ({ ...prev, ...initialValues }));
        }
    }, [initialValues]);

    const handleChange =
        (key: keyof TemplateFormData) =>
        (e: React.ChangeEvent<HTMLInputElement> | string) => {
            const value = typeof e === "string" ? e : e.target.value;

            setForm({ ...form, [key]: value });
            setErrors((prev) => ({ ...prev, [key]: undefined }));
        };

    const validate = () => {
        const nextErrors: typeof errors = {};

        if (!form.name.trim()) nextErrors.name = "Name is required";
        if (!form.pageId) nextErrors.pageId = "Please select a page";

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate() || loading) return;

        if (isUpdate) {
            // TODO: handle update logic here
            console.log("UPDATE payload:", form);
        } else {
            // TODO: handle create logic here
            try {
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <FieldSet>
                <FieldLegend>Template</FieldLegend>
                <FieldDescription>
                    Create or update template information.
                </FieldDescription>

                <FieldGroup>
                    {/* Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                            id="name"
                            value={form.name}
                            onChange={handleChange("name")}
                            placeholder="Template name"
                            aria-invalid={!!errors.name}
                        />
                        {errors.name && <FieldError>{errors.name}</FieldError>}
                    </Field>

                    <PageSelect
                        value={form.pageId}
                        error={errors.pageId}
                        onChange={handleChange("pageId")}
                    />

                    {/* Status */}
                    <Field>
                        <FieldLabel>Status</FieldLabel>
                        <Select
                            value={form.status}
                            onValueChange={(v) =>
                                handleChange("status")(v as TemplateStatus)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">
                                    Published
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </FieldGroup>

                {/* Description */}
                <Field>
                    <FieldLabel htmlFor="desc">Description</FieldLabel>
                    <Input
                        id="desc"
                        value={form.desc}
                        onChange={handleChange("desc")}
                        placeholder="Short description"
                    />
                </Field>
            </FieldSet>

            <div className="mt-4 flex justify-end">
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </Button>
            </div>
        </form>
    );
}

export default TemplateForm;
