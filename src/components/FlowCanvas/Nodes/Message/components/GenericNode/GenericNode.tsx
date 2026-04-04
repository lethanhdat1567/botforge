"use client";

import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import AddGeneric from "@/components/FlowCanvas/Nodes/Message/components/GenericNode/components/AddGeneric/AddGeneric";
import {
    GenericTemplateData,
    GenericTemplateElement,
} from "@/components/FlowCanvas/types/node/message.type";
import { useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import GenericItem from "@/components/FlowCanvas/Nodes/Message/components/GenericNode/components/GenericItem/GenericItem";
import { v4 as uuid } from "uuid";
import Navigate from "@/components/FlowCanvas/Nodes/Message/components/GenericNode/components/Navigate/Navigate";

type Props = {
    nodeId: string;
    payload: GenericTemplateData;
};

function GenericNode({ nodeId, payload }: Props) {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [errors, setErrors] = useState([]);

    function handleAddNewGeneric() {
        const newGeneric = {
            id: uuid(),
            title: "",
            subtitle: "",
            image_url: "",
            default_action: {
                type: "web_url",
                url: "",
                webview_height_ratio: "full",
            },
            buttons: [],
        } as GenericTemplateElement;
        const newGenerics = [...payload.fields.elements, newGeneric];

        FlowController.updateNodePayload(nodeId, payload.id, {
            elements: newGenerics,
        });
    }

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <AddGeneric onAddGeneric={handleAddNewGeneric} />
                    <div className="flex justify-end">
                        <Navigate api={api} />
                    </div>
                </div>
            </div>

            <BaseContent nodeId={nodeId} payloadId={payload.id} errors={errors}>
                <div className="rounded-md py-1">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            watchDrag: false,
                        }}
                    >
                        <CarouselContent className="overflow-visible py-1">
                            {payload.fields.elements.map((generic, index) => (
                                <CarouselItem key={generic.id}>
                                    <GenericItem
                                        generic={generic}
                                        itemIndex={index + 1}
                                        nodeId={nodeId}
                                        payload={payload}
                                        setErrors={setErrors}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </BaseContent>
        </div>
    );
}

export default GenericNode;
