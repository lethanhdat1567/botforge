import { Skeleton } from "@/components/ui/skeleton";

export function FlowShareSkeleton() {
    return (
        <div className="border-border/40 space-y-3 rounded-xl border p-4">
            {/* Image Placeholder */}
            <Skeleton className="aspect-video w-full rounded-lg bg-neutral-100" />

            <div className="space-y-2">
                {/* Title Placeholder */}
                <Skeleton className="h-5 w-2/3 bg-neutral-100" />
                {/* Description Placeholder */}
                <Skeleton className="h-4 w-full bg-neutral-100" />
                <Skeleton className="h-4 w-4/5 bg-neutral-100" />
            </div>

            <div className="flex items-center justify-between pt-2">
                {/* Stats Placeholder */}
                <div className="flex gap-2">
                    <Skeleton className="h-4 w-10 bg-neutral-100" />
                    <Skeleton className="h-4 w-10 bg-neutral-100" />
                </div>
                {/* Author Placeholder */}
                <Skeleton className="h-6 w-20 rounded-full bg-neutral-100" />
            </div>
        </div>
    );
}
