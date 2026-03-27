import * as z from "zod";

const formSchema = z.object({
    displayName: z
        .string()
        .min(2, "Display name must be at least 2 characters.")
        .max(50, "Display name must be at most 50 characters.")
        .trim(),

    username: z
        .string()
        .min(3, "Username must be at least 3 characters.")
        .max(20, "Username must be at most 20 characters.")
        .trim(),

    email: z
        .string()
        .email("Invalid email address.")
        .trim(),

    avatar: z
        .string()
        .or(z.literal("")) 
        .nullable()        
        .optional(),       
});

export default formSchema;