"use client";

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
import FilterMessageNode from "@/components/FlowCanvas/Nodes/Message/components/FilterMessageNode/FilterMessageNode";
import { MessageData } from "@/components/FlowCanvas/types/node/message.type";

function MessageNode(props: any) {
    const [items, setItems] = useState(props.data.messages || []);
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
                    items={items.map((i: MessageData) => i.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {/* Base Content List */}
                    <div className="space-y-2">
                        {items.map((item: MessageData) => (
                            <FilterMessageNode node={item} key={item.id} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </BaseNode>
    );
}

export default MessageNode;
