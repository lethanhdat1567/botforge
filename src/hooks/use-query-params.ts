"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryParams = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Hàm nội bộ để build Query String (An toàn cho SSR)
    const createQueryString = useCallback(
        (
            paramsToUpdate: Record<string, string | number | null | undefined>,
        ) => {
            const newParams = new URLSearchParams(searchParams.toString());

            for (const [key, value] of Object.entries(paramsToUpdate)) {
                if (value === null || value === undefined) {
                    newParams.delete(key);
                } else {
                    newParams.set(key, String(value));
                }
            }
            return newParams.toString();
        },
        [searchParams],
    );

    // 1. Hàm SET (hoặc Update nhiều params cùng lúc)
    const setQueryParams = useCallback(
        (
            paramsToUpdate: Record<string, string | number | null | undefined>,
            options?: { scroll?: boolean; replace?: boolean },
        ) => {
            const queryString = createQueryString(paramsToUpdate);
            const url = queryString ? `${pathname}?${queryString}` : pathname;

            if (options?.replace) {
                router.replace(url, { scroll: options?.scroll ?? false });
            } else {
                router.push(url, { scroll: options?.scroll ?? false });
            }
        },
        [createQueryString, pathname, router],
    );

    // 2. Hàm DELETE (Xóa một hoặc nhiều key)
    const deleteQueryParams = useCallback(
        (
            keys: string | string[],
            options?: { scroll?: boolean; replace?: boolean },
        ) => {
            const keysToDelete = Array.isArray(keys) ? keys : [keys];
            const updates: Record<string, null> = {};

            keysToDelete.forEach((key) => {
                updates[key] = null;
            });

            setQueryParams(updates, options);
        },
        [setQueryParams],
    );

    // 3. Hàm GET
    const getQueryParam = (key: string) => searchParams.get(key);

    return {
        getQueryParam,
        setQueryParams,
        deleteQueryParams,
        allParams: searchParams,
        pathname,
    };
};
