import { menuData } from "./data";
import ContextMenuItem from "./ContextMenuItem";

function ContextMenu() {
    return (
        <div className="bg-background w-70 border shadow">
            {menuData.map((item) => (
                <ContextMenuItem key={item.id} item={item} />
            ))}
        </div>
    );
}

export default ContextMenu;
