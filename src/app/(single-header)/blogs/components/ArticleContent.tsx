import { CodeBlock } from "@/app/(single-header)/blogs/components/CodeBlock";

export function ArticleContent({ content }: { content: string }) {
    const lines = content.split("\n");
    const renderedContent = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (line.startsWith("# ")) {
            renderedContent.push(
                <h1
                    key={i}
                    className="text-foreground mt-2 mb-6 text-4xl font-bold"
                >
                    {line.replace("# ", "")}
                </h1>,
            );
        } else if (line.startsWith("## ")) {
            renderedContent.push(
                <h2
                    key={i}
                    className="text-foreground mt-8 mb-4 text-2xl font-semibold"
                >
                    {line.replace("## ", "")}
                </h2>,
            );
        } else if (line.startsWith("```")) {
            const language = line.replace("```", "") || "json";
            const codeLines = [];
            i++;
            while (i < lines.length && !lines[i].startsWith("```")) {
                codeLines.push(lines[i]);
                i++;
            }
            renderedContent.push(
                <CodeBlock key={i} language={language}>
                    {codeLines.join("\n")}
                </CodeBlock>,
            );
        } else if (line.trim() !== "") {
            renderedContent.push(
                <p key={i} className="text-muted-foreground mb-4 leading-7">
                    {line}
                </p>,
            );
        }
        i++;
    }

    return <div className="max-w-none">{renderedContent}</div>;
}
