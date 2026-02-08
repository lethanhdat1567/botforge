"use client";

import UploadThumbnail from "@/app/(private)/components/UploadThumbnail/UploadThumbnail";
import SelectStatus from "@/app/admin/blogs/new/components/SelectStatus/SelectStatus";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";

type Props = {
    form: any;
};

function GuideForm({ form }: Props) {
    return (
        <div className="space-y-6">
            {/* Main info */}
            <div className="space-y-4 rounded-sm border p-6">
                {/* Title */}
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Tiêu đề
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                placeholder="Tiêu đề"
                                autoComplete="off"
                                className="rounded-none"
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Slug */}
                <Controller
                    name="slug"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                placeholder="huong-dan-hoc-ielts"
                                autoComplete="off"
                                className="rounded-none"
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    {/* Status */}
                    <Controller
                        name="status"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Trạng thái
                                </FieldLabel>
                                <SelectStatus
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Thumbnail */}
                    <Controller
                        name="thumbnail"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Hình ảnh</FieldLabel>
                                <UploadThumbnail
                                    value={
                                        typeof field.value === "string"
                                            ? field.value
                                            : undefined
                                    }
                                    onChange={(file) => {
                                        field.onChange(file);
                                    }}
                                    onRemove={() => {
                                        field.onChange(undefined);
                                    }}
                                />
                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Summary */}
                <Controller
                    name="summary"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Mô tả ngắn
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                placeholder="Mô tả ngắn..."
                                className="rounded-none"
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            {/* Content */}
            <div className="rounded-sm border bg-white p-6">
                <Controller
                    name="content"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Nội dung</FieldLabel>
                            <SimpleEditor
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value);
                                }}
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>
        </div>
    );
}

export default GuideForm;
