"use client";

import { useEffect, useState } from "react";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PageConfig {
    pageId: string;
    pageAccessToken: string;
}

function ConfigToken() {
    const [pageId, setPageId] = useState("");
    const [pageAccessToken, setPageAccessToken] = useState("");

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEdit, setIsEdit] = useState(false);

    // 🔹 Fetch config nếu đã tồn tại
    useEffect(() => {
        async function fetchConfig() {
            setLoading(true);
            try {
                const res = await fetch("/api/pages/current");
                if (!res.ok) return;

                const data: PageConfig = await res.json();
                setPageId(data.pageId);
                setPageAccessToken(data.pageAccessToken);
                setIsEdit(true);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchConfig();
    }, []);

    // 🔹 Save / Update
    async function handleSubmit() {
        setSaving(true);
        setError(null);

        try {
            setIsEdit(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <FieldSet>
            <FieldLegend>Facebook Page Configuration</FieldLegend>
            <FieldDescription>
                Configure your Facebook Page ID and Page Access Token.
            </FieldDescription>

            {loading ? (
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading configuration...
                </div>
            ) : (
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="pageId">Page ID</FieldLabel>
                        <Input
                            id="pageId"
                            value={pageId}
                            onChange={(e) => setPageId(e.target.value)}
                            placeholder="1234567890"
                            autoComplete="off"
                            disabled={isEdit} // ⚠️ PageId thường không cho sửa
                        />
                        <FieldDescription>
                            Facebook Page ID associated with your bot.
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="pageAccessToken">
                            Page Access Token
                        </FieldLabel>
                        <Input
                            id="pageAccessToken"
                            type="password"
                            value={pageAccessToken}
                            onChange={(e) => setPageAccessToken(e.target.value)}
                            placeholder="EAAG..."
                            autoComplete="off"
                        />
                        <FieldDescription>
                            Used to send messages via Facebook Messenger API.
                        </FieldDescription>
                        {error && <FieldError>{error}</FieldError>}
                    </Field>

                    <div className="flex justify-end">
                        <Button
                            onClick={handleSubmit}
                            disabled={saving || !pageId || !pageAccessToken}
                        >
                            {saving && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {isEdit ? "Update" : "Save"}
                        </Button>
                    </div>
                </FieldGroup>
            )}
        </FieldSet>
    );
}

export default ConfigToken;
