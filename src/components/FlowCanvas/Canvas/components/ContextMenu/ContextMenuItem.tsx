import { useState } from "react";
import { ChevronRight } from "lucide-react";

type MenuItem = {
    id: string;
    title: string;
    category?: string; // parent có category
    type?: string; // child có type
    color: string;
    icon?: React.ElementType;
    children?: MenuItem[];
};

type Props = {
    item: MenuItem;
    onSelectNode?: (payload: { category: string; type: string }) => void;
    parentCategory?: string; // category của parent
    isChild?: boolean;
};

function ContextMenuItem({
    item,
    onSelectNode,
    parentCategory,
    isChild = false,
}: Props) {
    const [open, setOpen] = useState(false); // state để mở submenu
    const Icon = item.icon;

    const handleClick = () => {
        if (item.type && onSelectNode) {
            onSelectNode({
                category: parentCategory || "",
                type: item.type,
            });
        }
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {/* Item */}
            <div
                onClick={handleClick}
                className="flex cursor-pointer items-center justify-between px-3 py-2.5 transition-colors hover:bg-gray-100"
                style={{ color: isChild ? "#000" : item.color }}
            >
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
            {item.children && open && (
                <div className="bg-background absolute top-0 right-0 z-50 w-60 translate-x-full border shadow-md">
                    {item.children.map((child: MenuItem) => (
                        <ContextMenuItem
                            key={child.id}
                            item={child}
                            onSelectNode={onSelectNode}
                            parentCategory={item.category || parentCategory} // truyền đúng category
                            isChild={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ContextMenuItem;
