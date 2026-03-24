import * as z from "zod";

export const statusEnum = z.enum(["active", "inactive"]).default("active");

const formSchema = z.object({
    name: z.string().min(1, "Vui lòng nhập tên").max(255, "Tên quá dài"),

    description: z.string().optional().or(z.literal("")),

    thumbnail: z.any().optional(),

    status: statusEnum,

    flowId: z.string().min(1, "Vui lòng chọn một Flow"),

    content: z.string().optional().or(z.literal("")),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export default formSchema;
