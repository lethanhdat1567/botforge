"use client";

import PageItem from "@/app/(private)/data/pages/components/PageContent/PageItem";
import { PageFormData } from "@/app/(private)/data/pages/components/PageForm/PageForm";
import { PageType } from "@/app/(private)/data/pages/type";
import { pageService } from "@/services/pageService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
    platform: "facebook" | "instagram" | "zalo";
};

function PageContent({ platform }: Props) {
    const [pages, setPages] = useState<PageType[]>([]);
    const [error, setError] = useState("");

    const fetchPage = async () => {
        try {
            const res = await pageService.list({ platform });
            setPages(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    async function handleDestroy(pageId: string) {
        try {
            await pageService.remove(pageId);
            toast.success("Deleled successfully");
            fetchPage();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete page");
        }
    }

    async function handleUpdate(pageId: string, page: PageFormData) {
        try {
            await pageService.update(pageId, {
                name: page.name,
                accessToken: page.access_token,
                pageUid: page.page_uid,
            });
            toast.success("Updated successfully");
            fetchPage();
        } catch (error: any) {
            if (error.response.data.data.code === "PAGE_EXIST") {
                setError("Page uid already exist");
                toast.error("Page uid already exist");
            } else {
                toast.error("Failed to create page");
            }
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchPage();
    }, [platform]);

    return (
        <div>
            {pages.map((p) => (
                <PageItem
                    key={p.id}
                    onUpdate={handleUpdate}
                    onDestroy={handleDestroy}
                    page={p}
                    error={error}
                    setError={setError}
                />
            ))}
        </div>
    );
}

export default PageContent;
