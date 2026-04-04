"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

function Navigate({ api }: { api: CarouselApi | null }) {
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(1);

    useEffect(() => {
        if (!api) return;

        const update = () => {
            setTotal(api.scrollSnapList().length);
            setCurrent(api.selectedScrollSnap() + 1);
        };

        update();

        api.on("select", update);
        api.on("reInit", update);

        return () => {
            api.off("select", update);
            api.off("reInit", update);
        };
    }, [api]);

    return (
        <div className="flex items-center gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        variant="outline"
                        className="size-8 shrink-0"
                        onClick={() => api?.scrollPrev()}
                        disabled={!api?.canScrollPrev()}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Mẫu trước</TooltipContent>
            </Tooltip>

            <div className="text-muted-foreground min-w-8 text-center text-xs tabular-nums">
                {current} / {total}
            </div>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        variant="outline"
                        className="size-8 shrink-0"
                        onClick={() => api?.scrollNext()}
                        disabled={!api?.canScrollNext()}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Mẫu sau</TooltipContent>
            </Tooltip>
        </div>
    );
}

export default Navigate;
