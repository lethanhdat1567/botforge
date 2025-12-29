function ErrorText({ message }: { message?: string }) {
    if (!message) return;

    return <p className="mt-1 text-sm text-red-500">{message}</p>;
}

export default ErrorText;
