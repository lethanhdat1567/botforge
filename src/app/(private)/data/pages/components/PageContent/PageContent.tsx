import PageItem from "@/app/(private)/data/pages/components/PageContent/PageItem";

type Props = {
    platform: "facebook" | "instagram" | "zalo";
};

function PageContent({ platform }: Props) {
    return (
        <div>
            <PageItem />
            <PageItem />
            <PageItem />
        </div>
    );
}

export default PageContent;
