import Button from "@/components/FlowCanvas/Nodes/BasicComp/Button/Button";
import CreateButton from "@/components/FlowCanvas/Nodes/BasicComp/Button/components/CreateButton/CreateButton";
import { ErrorType } from "@/components/FlowCanvas/Nodes/Message/components/TextNode/TextNode";
import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";

type Props = {
    buttonLists: ButtonNode[];
    setButtonList: any;
    setErrors: any;
    variable?: string;
};

function ButtonList({
    buttonLists = [],
    setButtonList,
    setErrors,
    variable,
}: Props) {
    function handleCreateNewBtn(btn: ButtonNode) {
        setButtonList([...buttonLists, btn]);
    }

    function handleCheckError(btnLists: ButtonNode[]) {
        const hasEmptyTitle = btnLists.some(
            (btn: ButtonNode) => !btn.title?.trim(),
        );

        setErrors((prev: ErrorType) => {
            if (hasEmptyTitle) {
                const hasButtonError = prev.some(
                    (err) => err.field === "button",
                );

                if (hasButtonError) {
                    return prev.map((err) =>
                        err.field === "button"
                            ? { ...err, message: "Có Button rỗng" }
                            : err,
                    );
                }

                return [
                    ...prev,
                    { field: "button", message: "Có Button rỗng" },
                ];
            }

            // Nếu tất cả hợp lệ → remove error button
            return prev.filter((err) => err.field !== "button");
        });
    }

    function handleChangeBtn(btn: ButtonNode) {
        const newLists = buttonLists.map((item) => {
            if (item.id === btn.id) {
                return btn;
            }
            return item;
        });
        setButtonList(newLists);

        handleCheckError(newLists);
    }

    function handleDestroyBtn(btnId: string) {
        setButtonList(buttonLists.filter((btn) => btn.id !== btnId));
    }

    return (
        <div className="bg-background space-y-2">
            {buttonLists.map((btn: ButtonNode) => (
                <Button
                    key={btn.id}
                    btn={btn}
                    onChange={handleChangeBtn}
                    onDestroyBtn={handleDestroyBtn}
                    variable={variable}
                />
            ))}
            <CreateButton
                onCreateNewBtn={handleCreateNewBtn}
                variable={variable}
            />
        </div>
    );
}

export default ButtonList;
