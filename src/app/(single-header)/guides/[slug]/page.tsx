import { timeAgo } from "@/lib/timer";
import { guideService } from "@/services/guideService";

type Props = {
    params: {
        slug: string;
    };
};

async function GuideDetailPage({ params }: Props) {
    const { slug } = await params;
    const res = await guideService.publicDetail(slug);
    const guide = res.data;

    return (
        <article className="mx-auto min-h-screen w-2xl px-4 pt-10 pb-32">
            {/* Title */}
            <h1 className="text-foreground text-4xl leading-tight font-bold">
                {guide.title}
            </h1>

            {/* Meta time */}
            <time className="text-muted-foreground mt-3 block text-sm">
                {timeAgo(guide.createdAt)}
            </time>

            {/* Divider */}
            <hr className="border-border my-4" />

            {/* Content */}
            <div
                className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-ol:list-decimal"
                dangerouslySetInnerHTML={{ __html: guide.content }}
            />
        </article>
    );
}

export default GuideDetailPage;
