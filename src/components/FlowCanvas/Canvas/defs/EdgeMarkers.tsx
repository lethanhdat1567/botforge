function EdgeMarkers() {
    return (
        <svg
            style={{
                position: "absolute",
                width: 0,
                height: 0,
            }}
        >
            <defs>
                <marker
                    id="arrow-right"
                    viewBox="0 0 10 10"
                    refX="10"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8" />
                </marker>
            </defs>
        </svg>
    );
}

export default EdgeMarkers;
