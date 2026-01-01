import { useState, useEffect } from "react";

/**
 * useDebounce
 * @param value Giá trị muốn debounce
 * @param delay Thời gian debounce (ms)
 * @returns giá trị đã debounce
 */
function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup nếu value thay đổi trước khi timeout xong
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
