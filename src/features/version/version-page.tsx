import { useTranslation } from "react-i18next";
import { PageLayout } from "../../components/page-layout/page-layout";
import { Flex } from "../../components/ui-components/flex/flex";
import { Text } from "../../components/ui-components/text/text";
import { useGetVersionQuery } from "../../store/version-api";

export default function VersionPage() {
    const { t } = useTranslation();
    const { data } = useGetVersionQuery();

    return (
        <PageLayout data-testid="version-page" title={t("version")}>
            <Flex direction="column" align="flex-start">
                <Text>
                    {" "}
                    {t("version")}: {data?.version}{" "}
                </Text>
                <Text>
                    {" "}
                    {t("timestamp")}: {data?.timestamp}{" "}
                </Text>
            </Flex>
        </PageLayout>
    );
}
