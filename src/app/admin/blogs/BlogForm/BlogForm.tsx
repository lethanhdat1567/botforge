/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CustomSelect from "@/app/(private)/components/CustomSelect/CustomSelect";
import UploadThumbnail from "@/app/(private)/components/UploadThumbnail/UploadThumbnail";
import { SimpleEditor } from "@/components/SimpleEditor/SimpleEditor";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { BlogFormSchemaType } from "@/app/admin/blogs/BlogForm/blogSchema";
import { postCategoryService } from "@/services/blogCategoryService";

type Props = {
    form: UseFormReturn<BlogFormSchemaType>;
};

function BlogForm({ form }: Props) {
    const [categoriesSelect, setCategoriesSelect] = useState<
        { label: string; value: string }[]
    >([]);

    const fetchCategories = async () => {
        try {
            const res = await postCategoryService.list();
            const formatCategories = res.postCategories.map((cat: any) => ({
                label: cat.name,
                value: cat.id,
            }));
            setCategoriesSelect(formatCategories);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Logic xử lý Slug với thư viện slugify
    const handleTitleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (...event: any[]) => void,
    ) => {
        const title = e.target.value;
        onChange(title);

        const generatedSlug = slugify(title, {
            replacement: "-",
            remove: /[*+~.()'"!:@]/g,
            lower: true,
            strict: true,
            locale: "vi",
            trim: true,
        });

        form.setValue("slug", generatedSlug, { shouldValidate: true });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4 rounded-sm bg-white">
                <div className="grid grid-cols-2 gap-4">
                    {/* Title */}
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Tiêu đề bài viết
                                </FieldLabel>
                                <Input
                                    {...field}
                                    onChange={(e) =>
                                        handleTitleChange(e, field.onChange)
                                    }
                                    className="rounded-none border-stone-300 focus:border-blue-500"
                                    id={field.name}
                                    placeholder="Nhập tiêu đề bài viết..."
                                    autoComplete="off"
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
                                <FieldLabel htmlFor={field.name}>
                                    Slug (URL)
                                </FieldLabel>
                                <Input
                                    {...field}
                                    className="rounded-none border-stone-300 bg-stone-50"
                                    id={field.name}
                                    placeholder="duong-dan-bai-viet"
                                />
                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Description */}
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
                                placeholder="Tóm tắt nội dung để hiển thị trên card bài viết..."
                                className="min-h-30 rounded-none border-stone-300"
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    {/* Category Selector */}
                    <Controller
                        name="categoryId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Danh mục bài viết</FieldLabel>
                                <div className="py-1">
                                    <CustomSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={categoriesSelect}
                                        placeholder="Chọn danh mục..."
                                    />
                                </div>
                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Status Selector */}
                    <Controller
                        name="status"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Trạng thái hiển thị</FieldLabel>
                                <div className="py-1">
                                    <CustomSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={[
                                            {
                                                label: "Công khai (Active)",
                                                value: "active",
                                            },
                                            {
                                                label: "Bản nháp (Inactive)",
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
                </div>

                {/* Thumbnail */}
                <Controller
                    name="thumbnail"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Ảnh đại diện</FieldLabel>
                            <div className="py-1">
                                <UploadThumbnail
                                    value={field.value}
                                    onChange={(url) => field.onChange(url)}
                                />
                            </div>
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            {/* Content Editor */}
            <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field
                        data-invalid={fieldState.invalid}
                        className="rounded-sm border bg-white p-6"
                    >
                        <FieldLabel>Nội dung bài viết</FieldLabel>
                        <div className="mt-4 min-h-125">
                            <SimpleEditor
                                value={field.value}
                                onChange={field.onChange}
                            />
                        </div>
                        {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
        </div>
    );
}

export default BlogForm;
