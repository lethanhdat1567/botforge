type Props = {
    rangeValue: number;
    onChange: (value: number) => void; // local preview
    onCommit: (value: number) => void; // push command
};

function DelayProgress({ rangeValue, onChange, onCommit }: Props) {
    return (
        <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={rangeValue}
            onChange={(e) => onChange(Number(e.target.value))}
            onMouseUp={(e) =>
                onCommit(Number((e.target as HTMLInputElement).value))
            }
            onTouchEnd={(e) =>
                onCommit(Number((e.target as HTMLInputElement).value))
            }
            className="nodrag mt-4 w-full cursor-pointer accent-black"
        />
    );
}

export default DelayProgress;
