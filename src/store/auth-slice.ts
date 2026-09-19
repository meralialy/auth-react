import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    lastRegisteredEmail: string | null;
    accessToken: string | null;
    tokenType: string | null;
    status: "idle" | "success" | "error";
    errorMessage: string | null;
    successMessage: string | null;
}

const getStoredToken = () => localStorage.getItem("access_token");
const getStoredTokenType = () => localStorage.getItem("token_type");

const getInitialState = (): AuthState => ({
    isAuthenticated: Boolean(getStoredToken()),
    isLoading: false,
    lastRegisteredEmail: null,
    accessToken: getStoredToken(),
    tokenType: getStoredTokenType(),
    status: "idle",
    errorMessage: null,
    successMessage: null,
});

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setRegisterSuccess: (state, action: PayloadAction<{ email: string; message?: string }>) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.status = "success";
            state.lastRegisteredEmail = action.payload.email;
            state.successMessage = action.payload.message ?? "registration-success";
            state.errorMessage = null;
        },
        setRegisterError: (
            state,
            action: PayloadAction<string | Record<string, unknown> | null>
        ) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.status = "error";
            if (action.payload === null) {
                state.errorMessage = null;
            } else if (typeof action.payload === "string") {
                state.errorMessage = action.payload;
            } else {
                state.errorMessage = JSON.stringify(action.payload);
            }
            state.successMessage = null;
        },
        setLoginSuccess: (
            state,
            action: PayloadAction<{
                email: string;
                message?: string;
                access_token?: string;
                token_type?: string;
            }>
        ) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.status = "success";
            state.lastRegisteredEmail = action.payload.email;
            state.successMessage = action.payload.message ?? "login-success";
            state.errorMessage = null;

            if (action.payload.access_token) {
                state.accessToken = action.payload.access_token;
                localStorage.setItem("access_token", action.payload.access_token);
            }

            if (action.payload.token_type) {
                state.tokenType = action.payload.token_type;
                localStorage.setItem("token_type", action.payload.token_type);
            }
        },
        setLoginError: (state, action: PayloadAction<string | Record<string, unknown>>) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.status = "error";
            if (typeof action.payload === "string") {
                state.errorMessage = action.payload;
            } else {
                state.errorMessage = JSON.stringify(action.payload);
            }
            state.successMessage = null;
            state.accessToken = null;
            state.tokenType = null;
            localStorage.removeItem("access_token");
            localStorage.removeItem("token_type");
        },
        setLogoutSuccess: (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.status = "success";
            state.lastRegisteredEmail = null;
            state.accessToken = null;
            state.tokenType = null;
            state.successMessage = "logout-success";
            state.errorMessage = null;
            localStorage.removeItem("access_token");
            localStorage.removeItem("token_type");
        },
        setLogoutError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.status = "error";
            state.errorMessage = action.payload;
        },
        setAuthLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        clearAuthMessages: (state) => {
            state.successMessage = null;
            state.errorMessage = null;
            state.status = "idle";
        },
        clearAuthState: () => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("token_type");
            return getInitialState();
        },
    },
});

export const {
    setRegisterSuccess,
    setRegisterError,
    setLoginSuccess,
    setLoginError,
    setLogoutSuccess,
    setLogoutError,
    setAuthLoading,
    clearAuthMessages,
    clearAuthState,
} = authSlice.actions;

export default authSlice.reducer;
