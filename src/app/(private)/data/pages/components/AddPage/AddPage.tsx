"use client";

import PageForm, {
    PageFormData,
} from "@/app/(private)/data/pages/components/PageForm/PageForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { pageService } from "@/services/pageService";
import { PlugZap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AddPage({ onRefresh }: { onRefresh: () => void }) {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(data: PageFormData) {
        try {
            await pageService.create({
                accessToken: data.access_token,
                name: data.name,
                platform: data.platform,
                pageUid: data.page_uid,
            });

            toast.success("Page created successfully");
            setShowForm(false);
            onRefresh();
        } catch (error: any) {
            if (error.response.data.data.code === "PAGE_EXIST") {
                setError("Page uid already exist");
            }
            toast.error("Failed to create page");
        }
    }

    return (
        <Dialog open={showForm} onOpenChange={setShowForm}>
            <form>
                <DialogTrigger asChild>
                    <Button className="rounded-none">
                        <PlugZap /> Kết nối trang mới
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-130">
                    <DialogHeader>
                        <DialogTitle>Thêm trang mới</DialogTitle>
                        <DialogDescription>
                            Nhập thông tin trang và lưu để hoàn tất việc kết
                            nối.
                        </DialogDescription>
                    </DialogHeader>

                    <PageForm
                        onSubmit={handleSubmit}
                        error={error}
                        setError={setError}
                    />
                </DialogContent>
            </form>
        </Dialog>
    );
}
