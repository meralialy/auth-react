import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./base-query";
import { setUserError, setUserSuccess } from "./user-slice";

export interface UserResponse {
    email?: string;
    firstName?: string;
    lastName?: string;
    [key: string]: unknown;
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getCurrentUser: builder.query<
            {
                email?: string;
                firstName?: string;
                lastName?: string;
                message?: string;
            },
            void
        >({
            query: () => "/api/v1/users/me",
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        setUserSuccess({
                            email: data.email,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            message: data.message,
                        })
                    );
                } catch (error) {
                    dispatch(setUserError("Failed to load user"));
                    console.error("users-me-failed:", error);
                }
            },
        }),
    }),
});

export const { useGetCurrentUserQuery } = userApi;
