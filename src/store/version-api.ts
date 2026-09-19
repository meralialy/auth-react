import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./base-query";

export interface VersionResponse {
    version?: string;
    timestamp?: string;
    [key: string]: unknown;
}

export const versionApi = createApi({
    reducerPath: "versionApi",
    baseQuery: publicBaseQuery,
    endpoints: (builder) => ({
        getVersion: builder.query<VersionResponse, void>({
            query: () => ({
                url: "/version",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetVersionQuery } = versionApi;
