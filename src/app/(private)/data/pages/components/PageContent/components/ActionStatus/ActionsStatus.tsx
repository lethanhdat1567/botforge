type Props = {
    status: string;
};

function ActionStatus({ status }: Props) {
    return <div className="text-sm font-medium text-neutral-500">{status}</div>;
}

export default ActionStatus;
