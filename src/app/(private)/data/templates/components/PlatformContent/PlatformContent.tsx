"use client";

import PlatformItem from "@/app/(private)/data/templates/components/PlatformContent/PlatformItem";
import { flowService } from "@/services/flowService";
import { useEffect, useState } from "react";

type Props = {
    platform: "facebook" | "instagram" | "zalo";
};

function PlatformContent({ platform }: Props) {
    const [templates, setTemplates] = useState([]);

    const fetchTemplate = async () => {
        try {
            const res = await flowService.getFlows({ platform });

            setTemplates(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTemplate();
    }, [platform]);

    return (
        <div>
            {templates.map((template: any) => (
                <PlatformItem
                    key={template.id}
                    template={template}
                    onRefresh={fetchTemplate}
                />
            ))}
        </div>
    );
}

export default PlatformContent;
