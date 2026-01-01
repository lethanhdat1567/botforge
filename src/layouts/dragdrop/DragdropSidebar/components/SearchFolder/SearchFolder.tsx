import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

type Props = {
    searchValue: string;
    setSearchValue: (value: string) => void;
};

function SearchFolder({ searchValue, setSearchValue }: Props) {
    return (
        <InputGroup>
            <InputGroupInput
                placeholder="Tìm kiếm thư mục..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
        </InputGroup>
    );
}

export default SearchFolder;
