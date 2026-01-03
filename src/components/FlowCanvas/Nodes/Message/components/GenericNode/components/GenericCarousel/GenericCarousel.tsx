import GenericItem from "@/components/FlowCanvas/Nodes/Message/components/GenericNode/components/GenericItem/GenericItem";
import {
    GenericTemplateData,
    GenericTemplateElement,
} from "@/components/FlowCanvas/types/node/message.type";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
    nodeId: string;
    genericLists: GenericTemplateData["fields"];
};

function GenericCarousel({ nodeId, genericLists }: Props) {
    function handleUpdateGeneric(generic: GenericTemplateElement) {}

    return (
        <Carousel
            opts={{
                watchDrag: false,
            }}
        >
            <CarouselContent>
                {genericLists.elements.map((item: any, index: number) => (
                    <CarouselItem key={index}>
                        <GenericItem
                            nodeId={nodeId}
                            generic={item}
                            onUpdateGeneric={handleUpdateGeneric}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}

export default GenericCarousel;
