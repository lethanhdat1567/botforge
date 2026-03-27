"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";

import changePasswordSchema from "./schema";
import { profileService } from "@/services/profileService";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/authService";

type FormData = z.infer<typeof changePasswordSchema>;

function ChangePassword() {
    const [user, setUser] = useState<any>()
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
    });

    const fetchUser = async () => {
        const user = await authService.me();
        
        setUser(user);
    }

    useEffect(() => {
        fetchUser();
    },[])

    async function onSubmit(data: FormData) {
        if(!user) return
        try {
            console.log(data);
            
            await profileService.changePassword(user?.id, data);
        } catch (error: any) {
            const code = error?.response?.data?.code;

            if (code === "INVALID_OLD_PASSWORD") {
                form.setError("oldPassword", {
                    message: "Mật khẩu cũ không đúng",
                });
                return;
            }

            toast.error(
                error.response?.data?.message ?? "Something went wrong",
            );
        }
    }

    if(user?.isSocialAccount) return null;

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <h3 className="text-lg font-semibold">Đổi mật khẩu</h3>

            {/* Old password */}
            <Field data-invalid={!!form.formState.errors.oldPassword}>
                <FieldLabel>Mật khẩu cũ</FieldLabel>
                <div className="relative">
                    <Input
                        type={showOld ? "text" : "password"}
                        {...form.register("oldPassword")}
                        className="rounded-none pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowOld(!showOld)}
                        className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
                    >
                        {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                <FieldError errors={[form.formState.errors.oldPassword]} />
            </Field>

            {/* New password */}
            <Field data-invalid={!!form.formState.errors.newPassword}>
                <FieldLabel>Mật khẩu mới</FieldLabel>
                <div className="relative">
                    <Input
                        type={showNew ? "text" : "password"}
                        {...form.register("newPassword")}
                        className="rounded-none pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
                    >
                        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                <FieldError errors={[form.formState.errors.newPassword]} />
            </Field>

            <Button
                type="submit"
                className="w-full rounded-none"
                disabled={form.formState.isSubmitting}
            >
                Update password
            </Button>
        </form>
    );
}

export default ChangePassword;
