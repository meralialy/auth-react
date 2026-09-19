import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    isLoading: boolean;
    status: "idle" | "success" | "error";
    errorMessage: string | null;
    successMessage: string | null;
}

const initialState: UserState = {
    email: null,
    firstName: null,
    lastName: null,
    isLoading: false,
    status: "idle",
    errorMessage: null,
    successMessage: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserSuccess: (
            state,
            action: PayloadAction<{
                email?: string;
                firstName?: string;
                lastName?: string;
                message?: string;
            }>
        ) => {
            state.email = action.payload.email ?? state.email;
            state.firstName = action.payload.firstName ?? state.firstName;
            state.lastName = action.payload.lastName ?? state.lastName;
            state.isLoading = false;
            state.status = "success";
            state.successMessage = action.payload.message ?? "user-loaded";
            state.errorMessage = null;
        },
        setUserError: (state, action: PayloadAction<string>) => {
            state.email = null;
            state.firstName = null;
            state.lastName = null;
            state.isLoading = false;
            state.status = "error";
            state.errorMessage = action.payload;
            state.successMessage = null;
        },
        setUserLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        clearUserState: () => initialState,
    },
});

export const { setUserSuccess, setUserError, setUserLoading, clearUserState } = userSlice.actions;

export default userSlice.reducer;
