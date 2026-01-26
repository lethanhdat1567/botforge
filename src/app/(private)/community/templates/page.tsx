import SharedItem from "@/app/(private)/community/templates/components/SharedItem/SharedItem";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { flowSharedService, SharedType } from "@/services/flowSharedService";
import { SearchIcon } from "lucide-react";

async function TemplatesPage() {
    const res = await flowSharedService.getAllShared();

    return (
        <div>
            {/* Heading */}
            <div className="mt-4 flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Kanban Board</h1>
                <InputGroup className="max-w-xl rounded-none">
                    <InputGroupInput placeholder="Search..." />
                    <InputGroupAddon>
                        <SearchIcon className="text-muted-foreground" />
                    </InputGroupAddon>
                </InputGroup>
            </div>
            {/* Content */}
            <div className="mt-10 grid grid-cols-4 gap-4">
                {res.data.data.map((item: SharedType) => (
                    <SharedItem key={item.id} sharedItem={item} />
                ))}
            </div>
        </div>
    );
}

export default TemplatesPage;
