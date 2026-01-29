import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import NotificationItem from "@/layouts/private/PrivateHeader/components/Notification/NotificationItem";
import { Bell } from "lucide-react";

function Notification() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}>
                    <Bell />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-100 rounded-none"
                side="bottom"
                align="end"
            >
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-sm font-medium">Notifications</h2>
                    <span className="cursor-pointer text-xs hover:underline">
                        View all
                    </span>
                </div>
                <Separator />
                <div>
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Notification;
