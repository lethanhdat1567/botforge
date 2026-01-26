"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import PlatformFolder from "@/app/(private)/community/templates/components/SharedItem/components/Actions/DowloadBtn/PlatformFolder";
import { useEffect, useState } from "react";
import { folderService } from "@/services/folderService";

function FolderWrapper({ onDowload }: { onDowload: (id: string) => void }) {
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        const getFolders = async () => {
            try {
                const res = await folderService.getFolders();
                setFolders(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        getFolders();
    }, []);

    return (
        <div>
            <Accordion type="multiple" className="w-full">
                {Object.entries(folders).map(([platform, items]) => (
                    <AccordionItem key={platform} value={platform}>
                        <AccordionTrigger>
                            <PlatformFolder platform={platform as any} />
                        </AccordionTrigger>

                        <AccordionContent>
                            <ul className="space-y-2">
                                {(items as any).map((folder: any) => (
                                    <li
                                        key={folder.id}
                                        className="cursor-pointer rounded border p-2 hover:bg-neutral-100"
                                        onClick={() => onDowload(folder.id)}
                                    >
                                        {folder.name}
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default FolderWrapper;
