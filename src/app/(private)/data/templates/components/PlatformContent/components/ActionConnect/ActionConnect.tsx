import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlugZap } from "lucide-react";

type Props = {
    onConnect: (pageId: string) => void;
};

function ActionConnect({ onConnect }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    Connect <PlugZap />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Connect to page</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex items-center justify-end gap-3">
                    <Button variant={"destructive"}>Cancel</Button>
                    <Button>Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ActionConnect;
