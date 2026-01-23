"use client";

import PageForm from "@/app/(private)/data/pages/components/PageForm/PageForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export function AddPage() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className="rounded-none">
                        <Plus /> Add Page
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Add Your New Page</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when
                            you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <PageForm onSubmit={(data) => console.log(data)} />
                </DialogContent>
            </form>
        </Dialog>
    );
}
