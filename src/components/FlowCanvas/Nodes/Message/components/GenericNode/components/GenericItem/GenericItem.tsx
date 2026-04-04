import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import ButtonList from "@/components/FlowCanvas/Nodes/BasicComp/Button/ButtonList";
import TextArea from "@/components/FlowCanvas/Nodes/BasicComp/TextArea/TextArea";
import ViewUpload from "@/components/FlowCanvas/Nodes/Message/components/GenericNode/components/ViewUpload/ViewUpload";
import { GenericTemplateElement } from "@/components/FlowCanvas/types/node/message.type";
import { uploadService } from "@/services/uploadService";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type Props = {
    generic: GenericTemplateElement;
    itemIndex: number;
    nodeId: string;
    payload: any;
    setErrors: any;
};

function GenericItem({
    generic,
    itemIndex,
    nodeId,
    payload,
    setErrors,
}: Props) {
    function updateGeneric(
        updater: (g: GenericTemplateElement) => GenericTemplateElement,
    ) {
        const newGenerics = payload.fields.elements.map(
            (g: GenericTemplateElement) =>
                g.id === generic.id ? updater(g) : g,
        );

        FlowController.updateNodePayload(nodeId, payload.id, {
            elements: newGenerics,
        });
    }

    async function handleUpload(file: File, genericId: string) {
        if (genericId !== generic.id) return;
        try {
            const uploaded = await uploadService.uploadFile(file);

            updateGeneric((g) => ({
                ...g,
                image_url: uploaded.path,
            }));
        } catch (error) {
            console.error(error);
        }
    }

    function handleDestroyImage(genericId: string) {
        if (genericId !== generic.id) return;
        updateGeneric((g) => ({
            ...g,
            image_url: "",
        }));
    }

    function handleUpdateTitle(title: string) {
        updateGeneric((g) => ({
            ...g,
            title,
        }));
    }

    function handleUpdateSubtitle(subtitle: string) {
        updateGeneric((g) => ({
            ...g,
            subtitle,
        }));
    }

    function handleUpdateUrl(url: string) {
        updateGeneric((g) => ({
            ...g,
            default_action: {
                ...(g.default_action ?? { type: "web_url" }),
                url,
            },
        }));
    }

    function handleUpdateBtnLists(buttons: any[]) {
        updateGeneric((g) => ({
            ...g,
            buttons,
        }));
    }

    function handleRemoveGeneric() {
        const newGenerics = payload.fields.elements.filter(
            (g: GenericTemplateElement) => g.id !== generic.id,
        );

        FlowController.updateNodePayload(nodeId, payload.id, {
            elements: newGenerics,
        });
    }

    return (
        <div className="bg-background w-full shrink-0 space-y-3 rounded-md border p-3 shadow-sm">
            <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground text-xs font-medium tracking-tight">
                    Mục {itemIndex}
                </span>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive size-8 shrink-0"
                            onClick={handleRemoveGeneric}
                        >
                            <Trash className="size-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">Xóa mục</TooltipContent>
                </Tooltip>
            </div>

            <div className="space-y-2">
                <ViewUpload
                    src={generic.image_url}
                    onUpload={handleUpload}
                    onDestroy={handleDestroyImage}
                    genericId={generic.id}
                />

                <TextArea
                    value={generic.title}
                    onCommit={handleUpdateTitle}
                    setErrors={setErrors}
                    placeholder="Tiêu đề..."
                />

                <TextArea
                    value={generic.subtitle || ""}
                    onCommit={handleUpdateSubtitle}
                    placeholder="Tiêu đề phụ..."
                />

                <TextArea
                    value={generic.default_action?.url || ""}
                    onCommit={handleUpdateUrl}
                    placeholder="url..."
                />

                <ButtonList
                    buttonLists={generic.buttons || []}
                    setButtonList={handleUpdateBtnLists}
                    setErrors={setErrors}
                />
            </div>
        </div>
    );
}

export default GenericItem;
