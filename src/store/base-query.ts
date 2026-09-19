import { fetchBaseQuery, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { clearAuthState, setLoginSuccess } from "./auth-slice";
import { clearUserState } from "./user-slice";

export const isLocalHost =
    typeof window !== "undefined" &&
    ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);

export const API_BASE_URL = isLocalHost
    ? "http://localhost:9001"
    : "https://auth-fastapi.ajalialy.workers.dev/";

export const prepareAuthHeaders = (
    headers: Headers,
    {
        getState,
    }: {
        getState: () => { auth?: { accessToken?: string | null; tokenType?: string | null } };
    }
) => {
    const state = getState();
    const token = state.auth?.accessToken;
    const tokenType = state.auth?.tokenType ?? "Bearer";

    if (token) {
        headers.set("Authorization", `${tokenType} ${token}`);
    }

    return headers;
};

export const createBaseQuery = (baseUrl = API_BASE_URL, withAuth = false) =>
    fetchBaseQuery({
        baseUrl,
        credentials: "include",
        prepareHeaders: withAuth ? prepareAuthHeaders : undefined,
    });

export const publicBaseQuery = createBaseQuery();
export const authBaseQuery = createBaseQuery(API_BASE_URL, true);

export const baseQueryWithAuth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await authBaseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshResult = await publicBaseQuery(
            {
                url: "/api/v1/auth/refresh",
                method: "POST",
            },
            api,
            extraOptions
        );

        if (refreshResult.data) {
            const data = refreshResult.data as { access_token?: string; token_type?: string };
            if (data.access_token) {
                api.dispatch(
                    setLoginSuccess({
                        email: "",
                        access_token: data.access_token,
                        token_type: data.token_type,
                    })
                );

                result = await authBaseQuery(args, api, extraOptions);
            } else {
                api.dispatch(clearAuthState());
                api.dispatch(clearUserState());
            }
        } else {
            api.dispatch(clearAuthState());
            api.dispatch(clearUserState());
        }
    }

    return result;
};
