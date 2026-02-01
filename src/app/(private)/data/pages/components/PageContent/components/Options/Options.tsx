import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import AlertDestroyDialog from "@/components/AlertDestroyDialog";
import { useState } from "react";
import PageForm, {
    PageFormData,
} from "@/app/(private)/data/pages/components/PageForm/PageForm";
import { PageType } from "@/app/(private)/data/pages/type";

type Props = {
    page: PageType;
    onUpdate: (page: PageFormData) => void;
    onDestroy: () => void;
    error: string;
    setError: (error: string) => void;
};

function Options({ onUpdate, onDestroy, page, error, setError }: Props) {
    const [showAlert, setShowAlert] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    function handleUpdate(data: PageFormData) {
        onUpdate(data);
        setShowUpdate(false);
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-none">
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setShowUpdate(true)}>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setShowAlert(true)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDestroyDialog
                onConfirm={onDestroy}
                open={showAlert}
                onOpenChange={setShowAlert}
                itemName="Template"
            />
            <Dialog open={showUpdate} onOpenChange={setShowUpdate}>
                <form>
                    <DialogContent className="sm:max-w-106.25">
                        <DialogHeader>
                            <DialogTitle>Cập nhật thông tin trang</DialogTitle>
                            <DialogDescription>
                                Chỉnh sửa thông tin trang kết nối và lưu để áp
                                dụng thay đổi.
                            </DialogDescription>
                        </DialogHeader>

                        <PageForm
                            onSubmit={handleUpdate}
                            initialValues={{
                                name: page.name,
                                access_token: page.accessToken,
                                page_uid: page.pageUid,
                            }}
                            error={error}
                            setError={setError}
                        />
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}

export default Options;
