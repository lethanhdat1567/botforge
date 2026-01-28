import "@/components/tiptap-templates/simple/simple-editor.scss";

function Content({ content }: { content: string }) {
    return (
        <div
            className="mt-6"
            dangerouslySetInnerHTML={{ __html: content }}
        ></div>
    );
}

export default Content;
