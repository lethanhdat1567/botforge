import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

function Notification() {
    return (
        <Button variant={"ghost"}>
            <Bell />
        </Button>
    );
}

export default Notification;
