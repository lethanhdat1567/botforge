"use client";

import { useEffect, useState } from "react";
import FlowItem from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/FlowItem";
import Options from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/Options";
import { ChevronRight, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { IFolder } from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/type";
import { toast } from "sonner";
import { folderService } from "@/services/folderService";
import EditName from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/EditName";
import CreateFlow from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/CreateFlow";

type Props = {
    folderData: IFolder;
    fetchFolders: any;
};

function FolderItem({ folderData, fetchFolders }: Props) {
    const [flows, setFlows] = useState([]);
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isCreateFlow, setIsCreateFlow] = useState(false);

    async function handleDestroy() {
        try {
            await folderService.destroyFolder(folderData.id);
            fetchFolders();
            toast.success("Xóa folder thành công!");
        } catch (error) {
            console.log(error);
            toast.error("Xóa folder thất bại!");
        }
    }

    function handleRename() {
        setIsEdit(true);
    }

    function handleDuplicate() {
        folderService
            .duplicateFolder(folderData.id)
            .then(() => fetchFolders())
            .catch((error) => console.log(error));
    }

    function handleCreateFlow() {
        setOpen(true);
        setIsCreateFlow(true);
    }

    const fetchFlows = async () => {
        try {
            const res = await folderService.getFlows(folderData.id);
            setFlows(res.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchFlows();
    }, []);

    return (
        <div className="flex w-full flex-col">
            <div
                className="group hover:bg-muted flex h-8 w-full cursor-pointer items-center justify-between rounded-sm px-2 py-5 transition"
                onClick={() => setOpen(!open)}
            >
                {/* Folder name */}
                <div className="flex min-w-0 flex-1 items-center gap-4">
                    <ChevronRight
                        className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-200",
                            open && "rotate-90",
                        )}
                    />
                    <div className="flex items-center gap-2">
                        <Folder size={16} />
                        {isEdit ? (
                            <EditName
                                folderId={folderData.id}
                                value={folderData.name}
                                setIsEdit={setIsEdit}
                                refresh={fetchFolders}
                            />
                        ) : (
                            <h3 className="truncate text-sm font-medium">
                                {folderData.name}
                            </h3>
                        )}
                    </div>
                </div>

                {/* Options */}
                {!isEdit && (
                    <Options
                        onDestroy={handleDestroy}
                        onRename={handleRename}
                        onDuplicate={handleDuplicate}
                        onCreateFlow={handleCreateFlow}
                    />
                )}
            </div>

            {/* Flow list */}
            {open && (
                <div className="pl-8">
                    {flows.length > 0
                        ? flows.map((flow: any) => (
                              <FlowItem
                                  id={flow.id}
                                  name={flow.name}
                                  status={flow.status}
                                  key={flow.id}
                                  onRefresh={fetchFlows}
                              />
                          ))
                        : null}
                    {isCreateFlow && (
                        <CreateFlow
                            folderId={folderData.id}
                            platform={folderData.platform}
                            onRefresh={fetchFlows}
                            setIsCreateFlow={setIsCreateFlow}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default FolderItem;
