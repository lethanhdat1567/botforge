/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import slugify from "slugify";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { BlogCategoryFormSchemaType } from "@/app/admin/blog-category/BlogCategoryForm/schema";

type Props = {
    form: UseFormReturn<BlogCategoryFormSchemaType>;
};

function BlogCategoryForm({ form }: Props) {
    const { watch, setValue } = form;

    // Theo dõi giá trị của trường 'name'
    const categoryName = watch("name");

    useEffect(() => {
        if (categoryName) {
            const generatedSlug = slugify(categoryName, {
                lower: true, // Chuyển về chữ thường
                strict: true, // Loại bỏ ký tự đặc biệt
                locale: "vi", // Xử lý tiếng Việt chuẩn
                trim: true,
            });

            // Cập nhật giá trị cho trường slug
            setValue("slug", generatedSlug, {
                shouldValidate: true, // Validate lại ngay khi auto-fill
                shouldDirty: true,
            });
        }
    }, [categoryName, setValue]);

    return (
        <div className="space-y-6">
            <div className="space-y-4 rounded-sm border bg-white p-6">
                {/* 1. Name */}
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Tên danh mục
                            </FieldLabel>
                            <Input
                                {...field}
                                className="w-full! rounded-none"
                                id={field.name}
                                placeholder="Ví dụ: Công nghệ, Đời sống..."
                                autoComplete="off"
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* 2. Slug */}
                <Controller
                    name="slug"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Đường dẫn (Slug)
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                placeholder="vi-du-cong-nghe"
                                className="w-full! rounded-none bg-stone-50 font-mono text-sm"
                            />
                            <p className="mt-1 text-[11px] text-stone-400">
                                * Slug được tự động tạo từ tên danh mục.
                            </p>
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

export default BlogCategoryForm;
