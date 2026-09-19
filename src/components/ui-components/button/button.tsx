import styled, { css } from "styled-components";

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: ButtonSize;
    fullWidth?: boolean;
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
        --control-padding-inline: 1rem;
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
        --control-padding-inline: 1.5rem;
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
const customProps = ["size", "fullWidth"];

export const Button = styled.button
    .withConfig({
        shouldForwardProp: (prop) => !customProps.includes(prop),
    })
    .attrs<ButtonProps>(({ type = "button" }) => ({
        type,
    }))<ButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #2563eb;
    color: #ffffff;
    font-weight: 600;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    box-sizing: border-box;

    width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

    ${({ size = "medium" }) => sizeStyles[size]}

    &:hover {
        background-color: #1d4ed8;
    }

    &:active {
        background-color: #1e40af;
    }

    &:disabled {
        background-color: #93c5fd;
        cursor: not-allowed;
    }
`;
