import { Search } from "lucide-react";

function SearchSection() {
    return (
        <div className="mx-auto mt-10 flex w-4xl items-center gap-3 border border-neutral-200 bg-white px-4 py-3 shadow-[0_10px_18px_-8px_rgba(0,0,0,0.15)] transition focus-within:border-neutral-400 focus-within:shadow-[0_12px_22px_-8px_rgba(0,0,0,0.25)]">
            <Search className="h-5 w-5 text-neutral-400" />
            <input
                className="w-full bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
                placeholder="Tìm kiếm hướng dẫn..."
            />
        </div>
    );
}

export default SearchSection;
