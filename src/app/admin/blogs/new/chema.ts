import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title is too long"),

    slug: z
        .string()
        .min(1, "Slug is required")
        .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and use '-' only"),

    summary: z
        .string()
        .max(500, "Summary is too long")
        .optional()
        .or(z.literal("")),

    content: z.string().min(1, "Content is required"),

    status: z.enum(["draft", "published", "archived"]),

    thumbnail: z
        .union([
            z.instanceof(File),
            z.string(), // thumbnail cũ khi edit
        ])
        .optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
