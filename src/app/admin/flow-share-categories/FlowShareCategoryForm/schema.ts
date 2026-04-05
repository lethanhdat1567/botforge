import { z } from "zod";

const flowShareCategoryFormSchema = z.object({
    name: z
        .string()
        .min(1, "Tên danh mục không được để trống")
        .max(50, "Tên quá dài"),
    slug: z
        .string()
        .min(1, "Slug không được để trống")
        .regex(
            /^[a-z0-9-]+$/,
            "Slug chỉ chứa chữ thường, số và dấu gạch ngang",
        ),
});

export type FlowShareCategoryFormSchemaType = z.infer<
    typeof flowShareCategoryFormSchema
>;

export default flowShareCategoryFormSchema;
