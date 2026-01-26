"use client";

import SelectFlow from "@/app/(private)/community/store/components/SharedForm/components/SelectFlow/SelectFlow";
import SelectStatus from "@/app/(private)/community/store/components/SharedForm/components/SelectStatus/SelectStatus";
import UploadThumbnail from "@/app/(private)/components/UploadThumbnail/UploadThumbnail";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";

type Props = {
    form: any;
};

function SharedForm({ form }: Props) {
    return (
        <div>
            <div className="space-y-4 rounded-sm border bg-white p-6">
                {/* Name */}
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                            <Input
                                {...field}
                                className="w-full! rounded-none"
                                id={field.name}
                                placeholder="Flow name"
                                autoComplete="off"
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
                                    Status
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
                    {/* FlowId  */}
                    <Controller
                        name="flowId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Flow
                                </FieldLabel>

                                <SelectFlow
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Thumbnail */}
                <Controller
                    name="thumbnail"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Thumbnail</FieldLabel>

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
            <Controller
                name="desc"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <SimpleEditor
                            onChange={(value) => {
                                field.onChange(value);
                            }}
                            value={field.value}
                        />

                        {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
        </div>
    );
}

export default SharedForm;
