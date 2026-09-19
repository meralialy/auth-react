import type { ReactNode } from "react";
import { Provider, useSelector } from "react-redux";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./features/dashboard/dashboard-page";
import SignInPage from "./features/auth/sign-in-page";
import SignUpPage from "./features/auth/sign-up-page";
import VersionPage from "./features/version/version-page";
import { useGetCurrentUserQuery } from "./store/user-api";
import type { RootState } from "./store/store";
import { store } from "./store/store";

interface RouteGuardProps {
    children: ReactNode;
    redirectTo?: string;
}

function PublicOnlyRoute({ children, redirectTo = "/dashboard" }: RouteGuardProps) {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return isAuthenticated ? <Navigate to={redirectTo} replace /> : <>{children}</>;
}

function ProtectedRoute({ children, redirectTo = "/" }: RouteGuardProps) {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} replace />;
}

function DashboardRoute() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useGetCurrentUserQuery(undefined, {
        skip: !isAuthenticated,
        refetchOnMountOrArgChange: true,
    });

    return (
        <ProtectedRoute redirectTo="/">
            <DashboardPage />
        </ProtectedRoute>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PublicOnlyRoute>
                <SignInPage />
            </PublicOnlyRoute>
        ),
    },
    {
        path: "/sign-up",
        element: (
            <PublicOnlyRoute>
                <SignUpPage />
            </PublicOnlyRoute>
        ),
    },
    {
        path: "/version",
        element: <VersionPage />,
    },
    {
        path: "/dashboard",
        element: <DashboardRoute />,
    },
]);

export default function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
}
