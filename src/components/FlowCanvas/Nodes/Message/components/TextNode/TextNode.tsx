import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import ButtonsList from "@/components/FlowCanvas/Nodes/BasicComp/Button/ButtonList";
import TextArea from "@/components/FlowCanvas/Nodes/BasicComp/TextArea/TextArea";

function TextNode({ node }: { node: any }) {
    return (
        <BaseContent id={node.id}>
            <div className="p-2">
                <TextArea
                    value="Test"
                    onChange={() => {}}
                    setError={(error) => {}}
                />
                <div className="mt-4 space-y-1">
                    <ButtonsList />
                </div>
            </div>
        </BaseContent>
    );
}

export default TextNode;
