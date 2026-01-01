import { arrayMove } from "@dnd-kit/sortable";

export function handleSortableDragEnd<T extends { id: string }>(
    event: any,
    setItems: React.Dispatch<React.SetStateAction<T[]>>,
) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return items;

        return arrayMove(items, oldIndex, newIndex);
    });
}
