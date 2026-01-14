import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NodeType } from "@/components/FlowCanvas/Nodes/BaseNode/data";
import { getMenuByNodeType } from "@/components/FlowCanvas/Nodes/BaseNode/components/AddFieldFooter/helpers";
import { getDefaultMessageData } from "@/components/FlowCanvas/Utils/defaultMessageData";
import { getDefaultActionData } from "@/components/FlowCanvas/Utils/defaultActionData";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";

type Props = {
    node: FlowNode;
    type: NodeType;
};

function AddFieldFooter({ node, type }: Props) {
    const menu = getMenuByNodeType(type);

    function handleCreateField(item: any) {
        let newData;

        switch (node.type) {
            case "message": {
                newData = getDefaultMessageData(item.type);
                break;
            }
            case "action": {
                newData = getDefaultActionData(item.type);
                break;
            }
            default:
                return;
        }

        FlowController.updateNode(node.id, {
            messages: [...(node.data.messages ?? []), newData],
        });
    }

    if (!menu) return null;

    return (
        <div className="w-full">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full gap-2">
                        <Plus size={16} />
                        Thêm trường mới
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    className="w-70!"
                    align="center"
                    side="top"
                >
                    <DropdownMenuLabel>{menu.title}</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {menu.children.map((item) => {
                        const Icon = item.icon;

                        return (
                            <DropdownMenuItem
                                key={item.id}
                                className="flex items-center gap-2"
                                onClick={() => {
                                    handleCreateField(item);
                                }}
                            >
                                <Icon size={16} />
                                {item.title}
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default AddFieldFooter;
