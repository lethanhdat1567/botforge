"use client";

import { Button } from "@/components/ui/button";
import { flowSharedSaveService } from "@/services/flowSharedSaveService";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    sharedTemplateId: string;
};

function SaveBtn({ sharedTemplateId }: Props) {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const fetchIsSaved = async () => {
            try {
                const res =
                    await flowSharedSaveService.getSaveStatus(sharedTemplateId);
                setIsSaved(res.data.data.saved);
            } catch (error) {
                console.log(error);
            }
        };

        fetchIsSaved();
    }, [sharedTemplateId]);

    async function handleSave() {
        try {
            await flowSharedSaveService
                .toggleSave(sharedTemplateId)
                .then((res) => {
                    setIsSaved(res.data.data.saved);
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button variant={"outline"} className="w-30" onClick={handleSave}>
            <Bookmark
                fill={isSaved ? "#2b7fff" : "transparent"}
                className={isSaved ? "text-blue-500" : ""}
            />{" "}
            Save
        </Button>
    );
}

export default SaveBtn;
