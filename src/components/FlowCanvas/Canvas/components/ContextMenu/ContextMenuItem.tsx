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
    const Icon = item.icon;

    const handleClick = () => {
        // Nếu item là child (có type) thì gọi callback với { category, type }
        if (item.type && onSelectNode) {
            onSelectNode({
                category: parentCategory || "",
                type: item.type,
            });
        }
    };

    return (
        <div className="group relative">
            {/* Item */}
            <div
                onClick={handleClick}
                className="flex cursor-pointer items-center justify-between px-3 py-2.5 hover:bg-gray-100"
                style={{
                    color: isChild ? "#000" : item.color,
                }}
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
            {item.children && (
                <div className="bg-background absolute top-0 right-0 w-60 translate-x-full border opacity-0 shadow group-hover:pointer-events-auto group-hover:opacity-100">
                    {item.children.map((child) => (
                        <ContextMenuItem
                            key={child.id}
                            item={child}
                            onSelectNode={onSelectNode}
                            parentCategory={item.category} // truyền category parent xuống child
                            isChild={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ContextMenuItem;
