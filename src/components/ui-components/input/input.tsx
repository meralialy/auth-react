import styled, { css } from "styled-components";

export type Size = "small" | "medium" | "large";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    size?: Size;
    error?: boolean;
}

const sizeStyles = {
    small: css`
        --control-padding-block: 0.375rem;
        --control-padding-inline: 0.75rem;
        --control-font-size: 0.875rem;
        --control-line-height: 1.25;
        --control-height: calc(
            (var(--control-padding-block) * 2) +
                (var(--control-font-size) * var(--control-line-height))
        );
        padding: var(--control-padding-block) var(--control-padding-inline);
        font-size: var(--control-font-size);
        line-height: var(--control-line-height);
        height: var(--control-height);
    `,
    medium: css`
        --control-padding-block: 0.625rem;
        --control-padding-inline: 0.875rem;
        --control-font-size: 1rem;
        --control-line-height: 1.4;
        --control-height: calc(
            (var(--control-padding-block) * 2) +
                (var(--control-font-size) * var(--control-line-height))
        );
        padding: var(--control-padding-block) var(--control-padding-inline);
        font-size: var(--control-font-size);
        line-height: var(--control-line-height);
        height: var(--control-height);
    `,
    large: css`
        --control-padding-block: 0.875rem;
        --control-padding-inline: 1.25rem;
        --control-font-size: 1.125rem;
        --control-line-height: 1.4;
        --control-height: calc(
            (var(--control-padding-block) * 2) +
                (var(--control-font-size) * var(--control-line-height))
        );
        padding: var(--control-padding-block) var(--control-padding-inline);
        font-size: var(--control-font-size);
        line-height: var(--control-line-height);
        height: var(--control-height);
    `,
};

// List all custom layout props that should NOT leak into the DOM element
const customProps = ["size", "error"];

export const Input = styled.input.withConfig({
    shouldForwardProp: (prop) => !customProps.includes(prop),
})<InputProps>`
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    appearance: none;
    font-family: inherit;
    color: #0f172a;
    background-color: #ffffff;
    border: 1px solid ${({ error }) => (error ? "#ef4444" : "#cbd5e1")};
    border-radius: 0.375rem;
    outline: none;
    transition:
        border-color 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out;

    ${({ size = "medium" }) => sizeStyles[size]}

    &:focus {
        border-color: ${({ error }) => (error ? "#dc2626" : "#2563eb")};
        box-shadow: 0 0 0 3px
            ${({ error }) => (error ? "rgba(239, 68, 68, 0.15)" : "rgba(37, 99, 235, 0.15)")};
    }

    &::placeholder {
        color: #94a3b8;
    }

    &:disabled {
        background-color: #f1f5f9;
        color: #94a3b8;
        cursor: not-allowed;
        border-color: #e2e8f0;
    }
`;
