import { createApi } from "@reduxjs/toolkit/query/react";
import {
    clearAuthState,
    setLoginError,
    setLoginSuccess,
    setLogoutError,
    setLogoutSuccess,
    setRegisterError,
    setRegisterSuccess,
} from "./auth-slice";
import { publicBaseQuery } from "./base-query";
import { userApi } from "./user-api";
import { clearUserState } from "./user-slice";

export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LogoutResponse {
    message?: string;
    [key: string]: unknown;
}

export interface RegisterResponse {
    message?: string;
    [key: string]: unknown;
}

export interface LoginResponse {
    access_token?: string;
    token_type?: string;
    [key: string]: unknown;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: publicBaseQuery,
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (body) => ({
                url: "/api/v1/auth/register",
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        setRegisterSuccess({
                            email: _args.email,
                            message: data?.message ?? "registration-success",
                        })
                    );
                } catch (error: unknown) {
                    const errObj = error as {
                        data?: { detail?: unknown };
                        error?: { data?: { detail?: unknown } };
                    };
                    const errorDetail =
                        errObj?.data?.detail ??
                        errObj?.error?.data?.detail ??
                        "registration-failed";
                    dispatch(setRegisterError(null));
                    dispatch(setRegisterError(errorDetail as string | Record<string, unknown>));
                    console.error("registration-failed:", error);
                }
            },
        }),
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: "/api/v1/auth/login",
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        setLoginSuccess({
                            email: _args.email,
                            message: "login-success",
                            access_token: data?.access_token,
                            token_type: data?.token_type,
                        })
                    );
                } catch (error: unknown) {
                    const errObj = error as {
                        data?: { detail?: unknown };
                        error?: { data?: { detail?: unknown } };
                        message?: string;
                    };
                    const errorDetail =
                        errObj?.data?.detail ??
                        errObj?.error?.data?.detail ??
                        errObj?.message ??
                        "login-failed";
                    dispatch(setLoginError(errorDetail as string | Record<string, unknown>));
                    console.error("login-failed:", error);
                }
            },
        }),
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: "/api/v1/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(setLogoutSuccess());
                    dispatch(clearAuthState());
                    dispatch(clearUserState());
                    dispatch(userApi.util.resetApiState());
                } catch (error) {
                    dispatch(setLogoutError("logout-failed"));
                    console.error("logout-failed:", error);
                }
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi;
