"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { flowSharedSaveService } from "@/services/flowSharedSaveService";
import { cn } from "@/lib/utils";

function SaveBtn({ sharedItemId }: { sharedItemId: string }) {
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    const lockRef = useRef(false); // 🔒 chống spam click nhanh

    // tránh hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // load trạng thái ban đầu
    useEffect(() => {
        if (!mounted) return;

        let alive = true;

        async function fetchStatus() {
            try {
                const res =
                    await flowSharedSaveService.getSaveStatus(sharedItemId);

                if (!alive) return;
                setSaved(res.data.data.saved);
            } catch (err) {
                console.log(err);
            }
        }

        fetchStatus();

        return () => {
            alive = false;
        };
    }, [sharedItemId, mounted]);

    async function handleSave() {
        if (loading || lockRef.current) return;

        lockRef.current = true;
        setLoading(true);

        // optimistic toggle
        setSaved((prev) => !prev);

        try {
            const res = await flowSharedSaveService.toggleSave(sharedItemId);

            // sync lại từ BE cho chắc
            setSaved(res.data.data.saved);
        } catch (error) {
            console.log(error);

            // rollback
            setSaved((prev) => !prev);
        } finally {
            setLoading(false);
            lockRef.current = false;
        }
    }

    if (!mounted) {
        return (
            <Button size="icon" variant="ghost" className="h-8 w-8" disabled>
                <Bookmark className="h-4 w-4 opacity-40" />
            </Button>
        );
    }

    return (
        <Button
            size="icon"
            variant="ghost"
            onClick={handleSave}
            disabled={loading}
            className="h-8 w-8 transition-colors duration-200"
        >
            <Bookmark
                className={cn(
                    "h-4 w-4 transition-all",
                    saved && "fill-primary text-primary",
                    loading && "opacity-60",
                )}
            />
        </Button>
    );
}

export default SaveBtn;
