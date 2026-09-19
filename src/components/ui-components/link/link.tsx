import styled from "styled-components";
import type { LinkProps as RouterLinkProps } from "react-router-dom";

export type LinkSize = "small" | "medium" | "large";
export type LinkWeight = "normal" | "medium" | "semibold" | "bold";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    as?: React.ElementType;
    to?: string | RouterLinkProps["to"];
    size?: LinkSize;
    weight?: LinkWeight;
    underline?: boolean;
}

const sizeStyles = {
    small: "0.875rem",
    medium: "1rem",
    large: "1.125rem",
};

const weightStyles = {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
};

const customProps = ["size", "weight", "underline"];

export const Link = styled.a.withConfig({
    shouldForwardProp: (prop) => !customProps.includes(prop),
})<LinkProps>`
    display: inline-flex;
    align-items: center;
    font-family: inherit;
    color: #2563eb;
    font-size: ${({ size = "small" }) => sizeStyles[size]};
    font-weight: ${({ weight = "medium" }) => weightStyles[weight]};
    text-decoration: ${({ underline }) => (underline ? "underline" : "none")};
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    &:hover {
        color: #1d4ed8;
        text-decoration: underline;
    }
`;
