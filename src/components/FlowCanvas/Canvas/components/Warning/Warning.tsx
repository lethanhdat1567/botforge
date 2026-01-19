"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNodeStore } from "@/store/nodeStore";
import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";

function Warning() {
    const [isWarning, setIsWarning] = useState(true);
    const nodes = useNodeStore((s) => s.nodes);

    useEffect(() => {
        if (nodes.length === 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsWarning(false);
            return;
        } else {
            setIsWarning(true);
            nodes.forEach((node) => {
                if (node.data.markStart) {
                    setIsWarning(false);
                    return;
                }
            });
        }
    }, [nodes]);

    return (
        isWarning && (
            <Alert variant="destructive">
                <CircleAlert />
                <AlertTitle>Bạn chưa setup nơi bắt đầu chạy node!.</AlertTitle>
            </Alert>
        )
    );
}

export default Warning;
