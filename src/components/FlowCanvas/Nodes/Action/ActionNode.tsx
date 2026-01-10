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

import { useEffect, useState } from "react";
import { handleSortableDragEnd } from "@/lib/dnd";
import FilterActionNode from "@/components/FlowCanvas/Nodes/Action/components/FilterActionNode/FilterActionNode";
import { ActionData } from "@/components/FlowCanvas/types/node/action.type";

function ActionNode(props: any) {
    const [items, setItems] = useState(props.data.messages || []);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(props.data.messages || []);
    }, [props.data.messages]);

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
                    items={items.map((i: ActionData) => i.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {/* Base Content List */}
                    {items.map((item: ActionData) => (
                        <FilterActionNode
                            nodeId={props.id}
                            payload={item}
                            key={item.id}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </BaseNode>
    );
}

export default ActionNode;
