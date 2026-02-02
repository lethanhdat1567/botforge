// helpers/highlightVariable.ts
export function highlightVariable(text: string) {
    return [
        {
            highlight: /\{\{[^}]*\}\}/g,
            className: "text-blue-500 font-medium",
        },
    ];
}
