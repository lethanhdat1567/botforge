"use client";

import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import BaseNode from "@/components/FlowCanvas/Nodes/BaseNode/BaseNode";
import { DndContext } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
    restrictToVerticalAxis,
    restrictToParentElement,
} from "@dnd-kit/modifiers";

import { useState } from "react";
import { handleSortableDragEnd } from "@/lib/dnd";

function MessageNode(props: any) {
    const [items, setItems] = useState([
        { id: "a", content: "a" },
        { id: "b", content: "b" },
        { id: "c", content: "c" },
        { id: "d", content: "d" },
    ]);
    const [isDragging, setIsDragging] = useState(false);

    return (
        <BaseNode childProps={props} isContentDragging={isDragging}>
            <DndContext
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(event) => {
                    handleSortableDragEnd(event, setItems);
                    setIsDragging(false);
                }}
                onDragCancel={() => setIsDragging(false)}
            >
                <SortableContext
                    items={items.map((i) => i.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {/* Base Content List */}
                    {items.map((item) => (
                        <BaseContent
                            key={item.id}
                            id={item.id}
                            isContentDragging={isDragging}
                        >
                            {item.content}
                        </BaseContent>
                    ))}
                </SortableContext>
            </DndContext>
        </BaseNode>
    );
}

export default MessageNode;
