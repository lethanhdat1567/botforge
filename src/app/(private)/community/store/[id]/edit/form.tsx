import * as z from "zod";

export const statusEnum = z.enum(["active", "inactive"]);

const formSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters.")
        .max(50, "Name must be at most 50 characters."),

    desc: z.string().min(10, "Description must be at least 10 characters."),

    thumbnail: z.union([z.string(), z.instanceof(File)]).optional(),

    status: statusEnum,

    flowId: z.string().uuid("Invalid Flow ID"),
});

export default formSchema;
