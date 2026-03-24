/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormSchemaType } from "@/app/(private)/community/store/new/form";
import CustomSelect from "@/app/(private)/components/CustomSelect/CustomSelect";
import { useEffect, useState } from "react";
import { flowService } from "@/services/flowService";
import UploadThumbnail from "@/app/(private)/components/UploadThumbnail/UploadThumbnail";
import { SimpleEditor } from "@/components/SimpleEditor/SimpleEditor";

type Props = {
    form: UseFormReturn<FormSchemaType>;
};

function SharedForm({ form }: Props) {
    const [flowsSelect, setFlowsSelect] = useState<
        { label: string; value: string }[]
    >([]);

    const fetchFlows = async () => {
        const res = await flowService.getFlows({});

        const formatFlows = res.flows.map((flow) => ({
            label: flow.name,
            value: flow.id,
        }));

        setFlowsSelect(formatFlows);
    };

    useEffect(() => {
        fetchFlows();
    }, []);

    return (
        <div className="space-y-6">
            <div className="space-y-4 rounded-sm border bg-white p-6">
                {/* 1. Name - Dùng Input */}
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Tiêu đề
                            </FieldLabel>
                            <Input
                                {...field}
                                className="w-full! rounded-none"
                                id={field.name}
                                placeholder="Enter flow name..."
                                autoComplete="off"
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* 2. Description - Dùng Textarea cho nhẹ nhàng */}
                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Mô tả ngắn
                            </FieldLabel>
                            <Textarea
                                {...field}
                                id={field.name}
                                placeholder="Short description about this flow..."
                                className="min-h-25 rounded-none"
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    {/* 3. Status - Ruột tự handle */}
                    <Controller
                        name="status"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Trạng thái</FieldLabel>
                                <div className="py-1">
                                    <CustomSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={[
                                            {
                                                label: "Hoạt động",
                                                value: "active",
                                            },
                                            {
                                                label: "Tạm dừng",
                                                value: "inactive",
                                            },
                                        ]}
                                    />
                                </div>
                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* 4. FlowId - Ruột tự handle */}
                    <Controller
                        name="flowId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Mẫu muốn chia sẻ</FieldLabel>
                                {/* Code logic SelectFlow của bạn ở đây */}
                                <div className="py-1">
                                    {/* Ví dụ: <YourSelectFlowComponent value={field.value} onChange={field.onChange} /> */}
                                    <CustomSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={flowsSelect}
                                    />
                                </div>
                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* 5. Thumbnail - Ruột tự handle */}
                <Controller
                    name="thumbnail"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Ảnh giới thiệu</FieldLabel>
                            <div className="py-1">
                                {/* Code logic Upload component của bạn ở đây */}
                                <UploadThumbnail
                                    value={field.value}
                                    onChange={(path) => {
                                        field.onChange(path);
                                    }}
                                />
                            </div>
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field
                        data-invalid={fieldState.invalid}
                        className="rounded-sm border bg-white p-6"
                    >
                        <FieldLabel>Nội dung mô tả</FieldLabel>
                        <SimpleEditor
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
    );
}

export default SharedForm;
