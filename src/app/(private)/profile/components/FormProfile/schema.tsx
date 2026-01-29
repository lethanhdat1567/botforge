import * as z from "zod";

const formSchema = z.object({
    displayName: z
        .string()
        .min(2, "Display name must be at least 2 characters.")
        .max(50, "Display name must be at most 50 characters.")
        .trim(),

    avatar: z
        .union([
            z.instanceof(File), // khi user upload mới
            z.string().url(), // khi load từ BE (avatar cũ)
            z.null(),
        ])
        .optional(),
});

export default formSchema;
