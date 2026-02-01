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
import ExpandBtn from "@/components/FlowCanvas/Nodes/Message/components/GenericNode/components/ExpandBtn/ExpandBtn";
import Navigate from "@/components/FlowCanvas/Nodes/Message/components/GenericNode/components/Navigate/Navigate";

type Props = {
    nodeId: string;
    payload: GenericTemplateData;
};

function GenericNode({ nodeId, payload }: Props) {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [errors, setErrors] = useState([]);
    const [isExpand, setIsExpand] = useState(false);

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
        <div>
            {/* Heading */}
            <div className="my-2 flex items-center gap-4">
                <ExpandBtn
                    isExpand={isExpand}
                    onToggleExpand={() => setIsExpand(!isExpand)}
                />
                {!isExpand && <Navigate api={api} />}
            </div>
            <AddGeneric onAddGeneric={handleAddNewGeneric} />
            {/* Lists */}
            <BaseContent nodeId={nodeId} payloadId={payload.id} errors={errors}>
                <div>
                    {isExpand ? (
                        <div className="flex items-center gap-4">
                            {payload.fields.elements.map((generic) => (
                                <GenericItem
                                    key={generic.id}
                                    generic={generic}
                                    nodeId={nodeId}
                                    payload={payload}
                                    setErrors={setErrors}
                                />
                            ))}
                        </div>
                    ) : (
                        <Carousel
                            setApi={setApi}
                            opts={{
                                watchDrag: false,
                            }}
                        >
                            <CarouselContent className="overflow-visible">
                                {payload.fields.elements.map((generic) => (
                                    <CarouselItem key={generic.id}>
                                        <GenericItem
                                            generic={generic}
                                            nodeId={nodeId}
                                            payload={payload}
                                            setErrors={setErrors}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    )}
                </div>
            </BaseContent>
        </div>
    );
}

export default GenericNode;
