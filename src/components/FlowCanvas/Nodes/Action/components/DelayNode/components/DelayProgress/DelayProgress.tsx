type Props = {
    rangeValue: number;
    onRangeChange: any;
};

function DelayProgress({ rangeValue, onRangeChange }: Props) {
    return (
        <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={rangeValue || 0}
            onChange={(e) => onRangeChange(e.target.value)}
            className="nodrag mt-4 w-full cursor-pointer"
        />
    );
}

export default DelayProgress;
