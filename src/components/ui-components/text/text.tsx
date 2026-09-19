import styled, { css } from "styled-components";

export type TextSize = "small" | "medium" | "large";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";
export type TextVariant = "body" | "muted" | "error" | "success" | "heading";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
    as?: keyof React.JSX.IntrinsicElements;
    size?: TextSize;
    weight?: TextWeight;
    variant?: TextVariant;
}

const sizeStyles = {
    small: css`
        font-size: 0.875rem;
        line-height: 1.25;
    `,
    medium: css`
        font-size: 1rem;
        line-height: 1.4;
    `,
    large: css`
        font-size: 1.125rem;
        line-height: 1.4;
    `,
};

const weightStyles = {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
};

const variantStyles = {
    body: css`
        color: #0f172a;
    `,
    muted: css`
        color: #64748b;
    `,
    error: css`
        color: #dc2626;
    `,
    success: css`
        color: #16a34a;
    `,
    heading: css`
        color: #0f172a;
        font-weight: 700;
    `,
};

const customProps = ["size", "weight", "variant"];

export const Text = styled.span.withConfig({
    shouldForwardProp: (prop) => !customProps.includes(prop),
})<TextProps>`
    margin: 0;
    padding: 0;
    font-family: inherit;
    box-sizing: border-box;

    ${({ size = "medium" }) => sizeStyles[size]}
    ${({ weight = "normal" }) => css`
        font-weight: ${weightStyles[weight]};
    `}
    ${({ variant = "body" }) => variantStyles[variant]}
`;
