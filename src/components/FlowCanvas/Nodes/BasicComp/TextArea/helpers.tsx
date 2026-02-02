export function getQueryAfterMustache(value: string) {
    const lastIndex = value.lastIndexOf("{{");
    if (lastIndex === -1) return "";

    return value.slice(lastIndex + 2).trim();
}

export function renderHighlightedText(text: string) {
    const parts = text.split(/(\{\{|\}\})/g);
    let inside = false;

    return parts.map((part, i) => {
        if (part === "{{") {
            inside = true;
            return (
                <span key={i} className="font-medium text-blue-500">
                    {part}
                </span>
            );
        }

        if (part === "}}") {
            inside = false;
            return (
                <span key={i} className="font-medium text-blue-500">
                    {part}
                </span>
            );
        }

        if (inside) {
            return (
                <span key={i} className="font-medium text-blue-500">
                    {part}
                </span>
            );
        }

        return <span key={i}>{part}</span>;
    });
}
