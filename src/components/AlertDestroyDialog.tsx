import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertDestroyDialogProps {
    open: boolean; // trạng thái show/hide
    onOpenChange?: (open: boolean) => void; // callback khi đóng/mở
    onConfirm: () => void; // callback khi nhấn tiếp tục
    itemName?: string; // tên folder/item muốn xóa
}

const AlertDestroyDialog: React.FC<AlertDestroyDialogProps> = ({
    open,
    onOpenChange,
    onConfirm,
    itemName = "folder",
}) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Bạn có chắc chắn muốn xóa {itemName}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này sẽ xóa vĩnh viễn {itemName} và không thể
                        hoàn tác.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Tiếp tục
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDestroyDialog;
