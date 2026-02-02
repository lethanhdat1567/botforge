export function extractVariableKeys(nodes: any[]): string[] {
    const keys: string[] = [];

    for (const node of nodes) {
        const messages = Array.isArray(node.data.messages)
            ? node.data.messages
            : [node.data.messages];

        for (const message of messages) {
            if (message.type === "condition") {
                message.fields?.items?.forEach((item: any) => {
                    if (item.field?.trim()) keys.push(item.field.trim());
                });
            }

            if (message.type === "set_variable") {
                const key = message.fields?.key;
                if (key?.trim()) keys.push(key.trim());
            }

            if (message.type === "collection") {
                const key = message.fields?.variable?.key;
                if (key?.trim()) keys.push(key.trim());
            }
        }
    }

    return Array.from(new Set(keys));
}
