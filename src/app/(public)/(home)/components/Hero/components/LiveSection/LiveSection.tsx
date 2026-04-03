import styles from "./LiveSection.module.css";

function LiveSection() {
    return (
        <div className="flex items-center gap-3 rounded-full bg-muted p-1 shadow-sm">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1 text-violet-700 shadow-[0_12px_28px_-8px_rgba(0,0,0,0.2)] dark:text-violet-400 dark:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.55)]">
                {/* Live dot */}
                <span className={styles.liveDot}>
                    <span className={styles.liveDotPulse} />
                    <span className={styles.liveDotCore} />
                </span>

                <span className="text-xs font-semibold">Live now</span>
            </div>
            <p className="pr-2 text-[14px] font-medium">
                Sử dụng hoàn toàn miễn phí
            </p>
        </div>
    );
}

export default LiveSection;
