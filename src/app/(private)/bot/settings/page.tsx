"use client";

import { useEffect, useState } from "react";
import FallbackMessage from "./components/FallbackMessage/FallbackMessage";
import { fallbackService } from "@/services/fallbackService";
import Timeout from "@/app/(private)/bot/settings/components/Timeout/Timeout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export type FallbackData = {
    timeoutDuration: number;
    timeoutUnit: "second" | "minute" | "hour" | "day";
    fallbackMessage: string;
};

function SettingsPage() {
    const [fallback, setFallback] = useState<FallbackData | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fallbackService.getFallback().then((res) => {
            setFallback(res.data);
        });
    }, []);

    if (!fallback) return null;

    const updateFallback = (patch: Partial<FallbackData>) => {
        setFallback((prev) => (prev ? { ...prev, ...patch } : prev));
    };

    const saveFallback = async () => {
        if (!fallback) return;

        try {
            setSaving(true);
            await fallbackService.updateFallback(fallback);
            toast.success("Lưu cấu hình thành công");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <Timeout
                duration={fallback.timeoutDuration}
                unit={fallback.timeoutUnit}
                onChange={updateFallback}
            />

            <FallbackMessage
                value={fallback.fallbackMessage}
                onChange={(msg) => updateFallback({ fallbackMessage: msg })}
            />

            <div className="flex justify-end">
                <Button onClick={saveFallback} disabled={saving}>
                    {saving ? "Đang lưu..." : "Lưu cấu hình"}
                </Button>
            </div>
        </div>
    );
}

export default SettingsPage;
