import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../../components/page-layout/page-layout";
import { Text } from "../../components/ui-components/text/text";
import { Flex } from "../../components/ui-components/flex/flex";
import { EmailIcon } from "../../components/ui-components/icons/email-icon";
import { UserIcon } from "../../components/ui-components/icons/user-icon";
import { Button } from "../../components/ui-components/button/button";
import { useLogoutMutation } from "../../store/auth-api";
import type { RootState } from "../../store/store";

export default function DashboardPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const email = useSelector((state: RootState) => state.user.email);
    const firstName = useSelector((state: RootState) => state.user.firstName);
    const lastName = useSelector((state: RootState) => state.user.lastName);

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (error) {
            console.error("logout-failed:", error);
        } finally {
            navigate("/");
        }
    };

    const fullName = [firstName, lastName].filter(Boolean).join(" ") || t("user");

    return (
        <PageLayout data-testid="dashboard-page" title={t("dashboard")}>
            <Flex direction="column" gap="1rem" align="flex-start">
                <Flex direction="row" align="center" gap="0.5rem">
                    <UserIcon size={18} />
                    <Text>{fullName}</Text>
                </Flex>
                <Flex direction="row" align="center" gap="0.5rem">
                    <EmailIcon size={18} />
                    <Text>{email}</Text>
                </Flex>
                <Button onClick={handleLogout}>{t("logout")}</Button>
            </Flex>
        </PageLayout>
    );
}
