"use client";

import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import BaseNode from "@/components/FlowCanvas/Nodes/BaseNode/BaseNode";
import { DndContext } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
    restrictToVerticalAxis,
    restrictToParentElement,
} from "@dnd-kit/modifiers";

import { useState } from "react";
import { handleSortableDragEnd } from "@/lib/dnd";
import FilterActionNode from "@/components/FlowCanvas/Nodes/Action/components/FilterActionNode/FilterActionNode";

function ActionNode(props: any) {
    const [items, setItems] = useState([
        { id: "a", content: "Delay 1", type: "delay" },
        { id: "b", content: "Delay 2", type: "delay" },
        { id: "c", content: "Delay 3", type: "delay" },
        { id: "d", content: "Delay 4", type: "delay" },
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
                        <FilterActionNode node={item} key={item.id} />
                    ))}
                </SortableContext>
            </DndContext>
        </BaseNode>
    );
}

export default ActionNode;
