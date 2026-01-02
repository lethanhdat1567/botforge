"use client";

import ButtonItem from "@/components/FlowCanvas/Nodes/BasicComp/Button/Button";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

function ButtonsList() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div>
            {Array.from({ length: 4 }).map((_, index) => (
                <ButtonItem
                    key={index}
                    index={index}
                    openIndex={openIndex}
                    setOpenIndex={setOpenIndex}
                />
            ))}

            <Button className="w-full" variant="outline">
                <Plus /> Thêm Nút
            </Button>
        </div>
    );
}

export default ButtonsList;
