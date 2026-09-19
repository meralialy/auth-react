import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth-api";
import authReducer from "./auth-slice";
import { userApi } from "./user-api";
import userReducer from "./user-slice";
import { versionApi } from "./version-api";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [versionApi.reducerPath]: versionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            userApi.middleware,
            versionApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
