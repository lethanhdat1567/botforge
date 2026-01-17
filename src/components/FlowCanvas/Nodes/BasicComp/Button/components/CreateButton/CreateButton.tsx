import { v4 as uuid } from "uuid";
import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
    variable?: string;
    onCreateNewBtn: (newBtn: ButtonNode) => void;
};

function CreateButton({ onCreateNewBtn, variable }: Props) {
    function handleCreateBtn() {
        let btnData: ButtonNode = {
            id: uuid(),
            type: "continue",
            title: "New Button",
        };

        if (variable) {
            btnData = {
                ...btnData,
                type: "postback",
                payload: {
                    variable,
                    value: "",
                },
            };
        }

        onCreateNewBtn(btnData);
    }

    return (
        <div>
            <Button
                variant={"outline"}
                className="w-full"
                onClick={handleCreateBtn}
            >
                <Plus />
                Thêm nút
            </Button>
        </div>
    );
}

export default CreateButton;
