import { z } from "zod";

export const blogFormSchema = z.object({
    title: z
        .string()
        .min(5, "Tiêu đề phải ít nhất 5 ký tự")
        .max(255, "Tiêu đề quá dài"),
    slug: z
        .string()
        .min(1, "Slug không được để trống")
        .regex(
            /^[a-z0-9-]+$/,
            "Slug chỉ được chứa chữ cái thường, số và dấu gạch ngang",
        ),
    description: z
        .string()
        .min(10, "Mô tả ngắn phải ít nhất 10 ký tự")
        .max(500, "Mô tả quá dài"),
    content: z.string().min(1, "Nội dung bài viết không được để trống"),
    thumbnail: z.string().min(1, "Vui lòng cung cấp ảnh đại diện"),
    categoryId: z.string().min(1, "Vui lòng chọn danh mục bài viết"),
    status: z
        .enum(["active", "inactive"], {
            error: "Vui lòng chọn trạng thái",
        })
        .default("active"),
});

export type BlogFormSchemaType = z.infer<typeof blogFormSchema>;
