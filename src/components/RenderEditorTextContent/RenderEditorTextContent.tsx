export function RenderContent({ html }: { html: string }) {
    return (
        <div
            className="prose prose-sm dark:prose-invert tiptap-content max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
