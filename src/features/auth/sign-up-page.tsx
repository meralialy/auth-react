import { useEffect, useMemo, useRef, useState } from "react";
import type { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { PageLayout } from "../../components/page-layout/page-layout";
import { Button } from "../../components/ui-components/button/button";
import { Flex } from "../../components/ui-components/flex/flex";
import { Link } from "../../components/ui-components/link/link";
import { TextField } from "../../components/ui-components/text-field/text-field";
import { Text } from "../../components/ui-components/text/text";
import { useRegisterMutation } from "../../store/auth-api";
import { clearAuthMessages } from "../../store/auth-slice";
import type { AppDispatch, RootState } from "../../store/store";

export default function SignUpPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState({
        confirmPassword: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    });
    const [submitAttemptCount, setSubmitAttemptCount] = useState(0);
    const [register, { isLoading, error }] = useRegisterMutation();
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const { errorMessage } = useSelector((state: RootState) => state.auth);

    const fieldErrors = useMemo(() => {
        if (!errorMessage) return {};
        try {
            const parsed = JSON.parse(errorMessage);
            if (parsed && typeof parsed === "object") {
                return parsed as Record<string, string>;
            }
        } catch {
            return {};
        }
        return {};
    }, [errorMessage]);

    const globalErrorMessage = useMemo(() => {
        if (!errorMessage) return null;
        if (typeof errorMessage === "string" && !errorMessage.startsWith("{")) {
            return errorMessage;
        }
        return null;
    }, [errorMessage]);

    useEffect(() => {
        return () => {
            dispatch(clearAuthMessages());
        };
    }, [dispatch]);

    useEffect(() => {
        if (fieldErrors.firstName) {
            firstNameRef.current?.focus();
        } else if (fieldErrors.lastName) {
            lastNameRef.current?.focus();
        } else if (fieldErrors.email) {
            emailRef.current?.focus();
        } else if (fieldErrors.password) {
            passwordRef.current?.focus();
        } else if (fieldErrors.confirmPassword) {
            confirmPasswordRef.current?.focus();
        }
    }, [fieldErrors, submitAttemptCount]);

    const handleRegister = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitAttemptCount((c) => c + 1);

        try {
            await register({
                confirmPassword: formData.confirmPassword,
                email: formData.email.trim(),
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                password: formData.password,
            }).unwrap();
            navigate("/", { replace: true });
        } catch (err: unknown) {
            setFormData((prev) => ({
                ...prev,
                confirmPassword: "",
                password: "",
            }));
            console.error("registration-failed:", err);
        }
    };

    return (
        <PageLayout
            data-testid="sign-up-page"
            style={{ alignItems: "center", justifyContent: "center" }}
            title={t("sign-up")}
        >
            <Flex
                align="center"
                as="form"
                direction="column"
                gap="1rem"
                justify="center"
                onSubmit={handleRegister}
                style={{ maxWidth: "500px", width: "100%" }}
            >
                <TextField
                    autoComplete="given-name"
                    data-testid="first-name"
                    errorText={fieldErrors.firstName}
                    id="firstName"
                    label={t("first-name")}
                    onChange={(event) =>
                        setFormData((prev) => ({ ...prev, firstName: event.target.value }))
                    }
                    ref={firstNameRef}
                    required
                    value={formData.firstName}
                />

                <TextField
                    autoComplete="family-name"
                    data-testid="last-name"
                    errorText={fieldErrors.lastName}
                    id="lastName"
                    label={t("last-name")}
                    onChange={(event) =>
                        setFormData((prev) => ({ ...prev, lastName: event.target.value }))
                    }
                    ref={lastNameRef}
                    required
                    value={formData.lastName}
                />

                <TextField
                    autoComplete="email"
                    data-testid="email"
                    errorText={fieldErrors.email}
                    id="email"
                    label={t("email")}
                    onChange={(event) =>
                        setFormData((prev) => ({ ...prev, email: event.target.value }))
                    }
                    ref={emailRef}
                    required
                    type="email"
                    value={formData.email}
                />

                <TextField
                    autoComplete="new-password"
                    data-testid="password"
                    errorText={fieldErrors.password}
                    id="password"
                    label={t("password")}
                    onChange={(event) =>
                        setFormData((prev) => ({ ...prev, password: event.target.value }))
                    }
                    ref={passwordRef}
                    required
                    type="password"
                    value={formData.password}
                />

                <TextField
                    autoComplete="new-password"
                    data-testid="confirm-password"
                    errorText={fieldErrors.confirmPassword}
                    id="confirmPassword"
                    label={t("confirm-password")}
                    onChange={(event) =>
                        setFormData((prev) => ({ ...prev, confirmPassword: event.target.value }))
                    }
                    ref={confirmPasswordRef}
                    required
                    type="password"
                    value={formData.confirmPassword}
                />

                <Button data-testid="sign-up" disabled={isLoading} fullWidth type="submit">
                    {isLoading ? t("signing-up") : t("sign-up")}
                </Button>

                {Object.keys(fieldErrors).length === 0 &&
                (globalErrorMessage || errorMessage || error) ? (
                    <Text size="small" variant="error">
                        {t(globalErrorMessage ?? errorMessage ?? "registration-failed")}
                    </Text>
                ) : null}

                <Flex direction="row" gap="0.5rem" style={{ marginTop: "0.5rem" }}>
                    <Text size="small" variant="muted">
                        {t("already-have-account")}
                    </Text>
                    <Link as={RouterLink} to="/">
                        {t("sign-in")}
                    </Link>
                </Flex>
            </Flex>
        </PageLayout>
    );
}
