import styled from "styled-components";

export type LabelSize = "small" | "medium" | "large";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    size?: LabelSize;
    required?: boolean;
    error?: boolean;
}

const sizeStyles = {
    small: "0.875rem",
    medium: "1rem",
    large: "1.125rem",
};

const customProps = ["size", "required", "error"];

export const Label = styled.label.withConfig({
    shouldForwardProp: (prop) => !customProps.includes(prop),
})<LabelProps>`
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-family: inherit;
    font-weight: 500;
    color: ${({ error }) => (error ? "#dc2626" : "#334155")};
    font-size: ${({ size = "medium" }) => sizeStyles[size]};
    cursor: pointer;
    user-select: none;
    transition: color 0.2s ease-in-out;

    &::after {
        content: ${({ required }) => (required ? '"*"' : "none")};
        color: #dc2626;
        margin-left: 0.125rem;
    }
`;
