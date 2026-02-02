type Props = {
    value: string;
    onSelect: (value: string) => void;
};

function SuggestItem({ value, onSelect }: Props) {
    return (
        <div
            className="cursor-pointer p-2 hover:bg-blue-500 hover:text-white"
            onMouseDown={() => {
                onSelect(value);
            }}
        >
            {value}
        </div>
    );
}

export default SuggestItem;
