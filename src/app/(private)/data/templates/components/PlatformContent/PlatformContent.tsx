import PlatformItem from "@/app/(private)/data/templates/components/PlatformContent/PlatformItem";

type Props = {
    platform: "facebook" | "instagram" | "zalo";
};

function PlatformContent({ platform }: Props) {
    return (
        <div>
            <PlatformItem />
            <PlatformItem />
            <PlatformItem />
            <PlatformItem />
        </div>
    );
}

export default PlatformContent;
