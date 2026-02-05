// services/dashboard.service.ts
import api from "@/config/axios";

export type DashboardOverviewParams = {
    from?: Date | string;
    to?: Date | string;
};

// services/dashboard.service.ts
export const dashboardService = {
    overview: async (params?: DashboardOverviewParams) => {
        const res = await api.get("/dashboard/overview", {
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

        return res.data;
    },

    conversationsChart: async (params: {
        from: Date | string;
        to: Date | string;
    }) => {
        const res = await api.get("/dashboard/conversations/chart", {
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

        return res.data;
    },
};
