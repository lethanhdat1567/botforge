import { GripVertical, Plus, Trash } from "lucide-react";

type Props = {
    dragListeners?: any;
    dragAttributes?: any;
};

function ContentToolbar({ dragListeners, dragAttributes }: Props) {
    return (
        <div className="bg-background absolute top-1/2 -left-3 z-9999 hidden w-10 -translate-x-full -translate-y-1/2 flex-col items-center gap-1 rounded-sm border p-1 shadow-md group-hover:flex">
            {/* DRAG HANDLE */}
            <button
                {...dragListeners}
                {...dragAttributes}
                className="hover:bg-muted cursor-grab rounded-sm p-2"
            >
                <GripVertical size={16} />
            </button>

            <button className="hover:bg-muted cursor-pointer rounded-sm p-2">
                <Plus size={16} />
            </button>

            <button className="cursor-pointer rounded-sm p-2 transition hover:bg-red-100">
                <Trash color="red" size={16} />
            </button>
        </div>
    );
}

export default ContentToolbar;
