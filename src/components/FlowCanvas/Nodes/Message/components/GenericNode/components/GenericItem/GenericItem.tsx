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
    nodeId: string;
    payload: any;
    setErrors: any;
};

function GenericItem({ generic, nodeId, payload, setErrors }: Props) {
    /**
     * Update current generic only
     */
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

    /**
     * Upload image / media
     */
    async function handleUpload(file: File) {
        try {
            const res = await uploadService.uploadFile(file);

            updateGeneric((g) => ({
                ...g,
                image_url: res.data.path,
            }));
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Remove image
     */
    function handleDestroyImage() {
        updateGeneric((g) => ({
            ...g,
            image_url: "",
        }));
    }

    /**
     * Update title
     */
    function handleUpdateTitle(title: string) {
        updateGeneric((g) => ({
            ...g,
            title,
        }));
    }

    /**
     * Update subtitle
     */
    function handleUpdateSubtitle(subtitle: string) {
        updateGeneric((g) => ({
            ...g,
            subtitle,
        }));
    }

    /**
     * Update default action URL
     */
    function handleUpdateUrl(url: string) {
        updateGeneric((g) => ({
            ...g,
            default_action: {
                ...(g.default_action ?? { type: "web_url" }),
                url,
            },
        }));
    }

    /**
     * Update button list
     */
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
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="w-full shrink-0 space-y-2">
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
            </TooltipTrigger>
            <TooltipContent align="center" side="right">
                <Button
                    size={"icon-sm"}
                    variant={"destructive"}
                    onClick={handleRemoveGeneric}
                >
                    <Trash />
                </Button>
            </TooltipContent>
        </Tooltip>
    );
}

export default GenericItem;
