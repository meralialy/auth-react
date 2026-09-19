import { useEffect, useState } from "react";
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
import { useLoginMutation } from "../../store/auth-api";
import { clearAuthMessages } from "../../store/auth-slice";
import type { AppDispatch, RootState } from "../../store/store";

export default function SignInPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [login, { isLoading }] = useLoginMutation();
    const { errorMessage } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        return () => {
            dispatch(clearAuthMessages());
        };
    }, [dispatch]);

    const handleLogin = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await login({ email: formData.email.trim(), password: formData.password }).unwrap();
            navigate("/dashboard", { replace: true });
        } catch (err: unknown) {
            setFormData((prev) => ({ ...prev, password: "" }));
            console.error(t("login-failed"), err);
        }
    };

    return (
        <PageLayout
            data-testid="sign-in-page"
            style={{ alignItems: "center", justifyContent: "center" }}
            title={t("sign-in")}
        >
            <Flex
                align="center"
                as="form"
                direction="column"
                gap="1rem"
                justify="center"
                onSubmit={handleLogin}
                style={{ maxWidth: "400px", width: "100%" }}
            >
                <TextField
                    autoComplete="new-email"
                    data-testid="email"
                    id="email"
                    label={t("email")}
                    onChange={(event) =>
                        setFormData((prev) => ({ ...prev, email: event.target.value }))
                    }
                    required
                    type="email"
                    value={formData.email}
                />
                <TextField
                    autoComplete="new-password"
                    data-testid="password"
                    id="password"
                    label={t("password")}
                    onChange={(event) =>
                        setFormData((prev) => ({ ...prev, password: event.target.value }))
                    }
                    required
                    type="password"
                    value={formData.password}
                />
                <Button data-testid="sign-in" disabled={isLoading} fullWidth type="submit">
                    {isLoading ? t("signing-in") : t("sign-in")}
                </Button>

                {errorMessage ? (
                    <Text size="small" variant="error">
                        {t(errorMessage, { defaultValue: errorMessage })}
                    </Text>
                ) : null}

                <Flex direction="row" gap="0.5rem" style={{ marginTop: "0.5rem" }}>
                    <Text size="small" variant="muted">
                        {t("dont-have-account")}
                    </Text>
                    <Link as={RouterLink} to="/sign-up">
                        {t("sign-up")}
                    </Link>
                </Flex>
            </Flex>
        </PageLayout>
    );
}
