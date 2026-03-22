import { Field, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { HttpError } from "@/http/helpers";
import { flowService } from "@/services/flowService";
import { useState } from "react";

function CreateInput({ onCreate }: { onCreate: () => void }) {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    async function handleBlur() {
        if (!value) {
            return onCreate();
        }
        try {
            await flowService.createFlow({ name: value });
            onCreate();
            setValue("");
        } catch (error) {
            console.log(error);
            if (error instanceof HttpError) {
                if (error.status === 409) {
                    setError("Tên flow của bạn đã bị trùng");
                }
            }
        }
    }

    return (
        <Field>
            <Input
                placeholder="Tên flow..."
                className="mt-2"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    setError("");
                }}
                onBlur={handleBlur}
                aria-invalid={Boolean(error)}
                autoFocus
            />
            {error && (
                <FieldDescription className="text-red-500">
                    Tên flow của bạn đã tồn tại
                </FieldDescription>
            )}
        </Field>
    );
}

export default CreateInput;
