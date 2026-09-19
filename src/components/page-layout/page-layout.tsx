import type { CSSProperties, ReactNode } from "react";
import { useEffect } from "react";
import { Flex } from "../ui-components/flex/flex";

export interface PageLayoutProps {
    "data-testid"?: string;
    children: ReactNode;
    title: string;
    style?: CSSProperties;
}

export function PageLayout({ children, title, "data-testid": dataTestId, style }: PageLayoutProps) {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <Flex
            data-testid={dataTestId || "page-layout"}
            direction="column"
            style={{ width: "100%", height: "100vh", padding: "2rem", ...style }}
        >
            {children}
        </Flex>
    );
}
