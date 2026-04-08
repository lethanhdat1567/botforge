import { http } from "@/http/fetch";

export type AdminDashboardParams = {
    from?: Date | string;
    to?: Date | string;
};

export const adminDashboardService = {
    /**
     * Overview dashboard cho admin
     * GET /admin/dashboard/overview
     */
    overview: async (params?: AdminDashboardParams) => {
        const res = await http.get("/api/admin-dashboard/overview", {
            params: params
                ? {
                      from:
                          params.from instanceof Date
                              ? params.from.toISOString()
                              : params.from,
                      to:
                          params.to instanceof Date
                              ? params.to.toISOString()
                              : params.to,
                  }
                : undefined,
        });

        return res;
    },

    /**
     * Chart dashboard cho admin
     * GET /admin/dashboard/chart
     */
    chart: async (params: { from: Date | string; to: Date | string }) => {
        const res = await http.get("/api/admin-dashboard/chart", {
            params: {
                from:
                    params.from instanceof Date
                        ? params.from.toISOString()
                        : params.from,
                to:
                    params.to instanceof Date
                        ? params.to.toISOString()
                        : params.to,
            },
        });

        return res;
    },
};
