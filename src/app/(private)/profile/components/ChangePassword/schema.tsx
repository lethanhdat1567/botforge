// schema.ts
import * as z from "zod";

const changePasswordSchema = z
    .object({
        oldPassword: z.string().min(6, "Old password is required"),
        newPassword: z
            .string()
            .min(8, "New password must be at least 8 characters"),
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
        message: "New password must be different from old password",
        path: ["newPassword"],
    });

export default changePasswordSchema;
