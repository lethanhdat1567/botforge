type Props = {
    onUpdateStatus: (value: string) => void;
};

function ActionStatus({ onUpdateStatus }: Props) {
    return <div className="text-sm font-medium text-neutral-500">Revokle</div>;
}

export default ActionStatus;
