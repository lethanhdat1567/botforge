import { ChevronRight } from "lucide-react";

type MenuItem = {
    id: string;
    title: string;
    color: string;
    icon?: React.ElementType;
    children?: MenuItem[];
};

type Props = {
    item: MenuItem;
};

function ContextMenuItem({ item }: Props) {
    const Icon = item.icon;

    return (
        <div
            className="group relative"
            style={{ "--hover": item.color } as React.CSSProperties}
        >
            {/* Item */}
            <div className="text-md flex cursor-pointer items-center justify-between px-3 py-2.5 hover:bg-(--hover) hover:text-white">
                <div className="flex items-center gap-2">
                    {Icon && (
                        <span className="bg-background flex h-6 w-6 items-center justify-center rounded-sm">
                            <Icon size={16} color={item.color} />
                        </span>
                    )}
                    {item.title}
                </div>

                {item.children && <ChevronRight size={16} />}
            </div>

            {/* Sub menu */}
            {item.children && (
                <>
                    {/* Cầu nối */}
                    <div className="absolute top-0 right-0 h-full w-4 translate-x-full" />

                    <div className="bg-background pointer-events-none absolute top-0 -right-2 w-60 translate-x-full border opacity-0 shadow group-hover:pointer-events-auto group-hover:opacity-100">
                        {item.children.map((child) => (
                            <ContextMenuItem key={child.id} item={child} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default ContextMenuItem;
