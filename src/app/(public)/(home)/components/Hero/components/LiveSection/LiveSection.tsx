import styles from "./LiveSection.module.css";

function LiveSection() {
    return (
        <div className="flex items-center gap-3 rounded-full bg-neutral-50 p-1 shadow">
            <div className="flex items-center gap-2 rounded-full border border-white bg-white px-2 py-1 text-purple-700 shadow-[0_12px_28px_-8px_rgba(0,0,0,0.45)]">
                {/* Live dot */}
                <span className={styles.liveDot}>
                    <span className={styles.liveDotPulse} />
                    <span className={styles.liveDotCore} />
                </span>

                <span className="text-xs font-semibold">Live now</span>
            </div>
            <p className="pr-2 text-[14px] font-medium">
                Used by SaaS & AI leaders
            </p>
        </div>
    );
}

export default LiveSection;
