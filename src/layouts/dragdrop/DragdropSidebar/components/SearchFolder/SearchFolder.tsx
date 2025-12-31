import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

function SearchFolder() {
    return (
        <InputGroup>
            <InputGroupInput placeholder="Tìm kiếm thư mục..." />
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
        </InputGroup>
    );
}

export default SearchFolder;
