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
            <h1 className="text-4xl leading-tight font-bold text-neutral-900">
                {guide.title}
            </h1>

            {/* Meta time */}
            <time className="mt-3 block text-sm text-neutral-500">
                {timeAgo(guide.createdAt)}
            </time>

            {/* Divider */}
            <hr className="my-4 border-neutral-200" />

            {/* Content */}
            <div
                className="prose prose-neutral prose-headings:font-semibold prose-headings:text-neutral-900 prose-p:leading-relaxed prose-p:text-neutral-800 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-ol:list-decimal max-w-none"
                dangerouslySetInnerHTML={{ __html: guide.content }}
            />
        </article>
    );
}

export default GuideDetailPage;
