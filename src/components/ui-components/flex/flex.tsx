import styled, { css } from "styled-components";

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: "row" | "column" | "row-reverse" | "column-reverse";
    align?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
    justify?:
        "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
    wrap?: "nowrap" | "wrap" | "wrap-reverse";
    gap?: string;
    grow?: number;
    shrink?: number;
    basis?: string;
}

// List all custom layout props that should NOT leak into the DOM element
const customProps = ["direction", "align", "justify", "wrap", "gap", "grow", "shrink", "basis"];

export const Flex = styled.div.withConfig({
    shouldForwardProp: (prop) => !customProps.includes(prop),
})<FlexProps>`
    display: flex;
    box-sizing: border-box;
    flex-direction: ${({ direction = "row" }) => direction};
    align-items: ${({ align = "stretch" }) => align};
    justify-content: ${({ justify = "flex-start" }) => justify};
    flex-wrap: ${({ wrap = "nowrap" }) => wrap};
    ${({ gap }) =>
        gap &&
        css`
            gap: ${gap};
        `}
    ${({ grow }) =>
        grow !== undefined &&
        css`
            flex-grow: ${grow};
        `}
    ${({ shrink }) =>
        shrink !== undefined &&
        css`
            flex-shrink: ${shrink};
        `}
    ${({ basis }) =>
        basis &&
        css`
            flex-basis: ${basis};
        `}
`;
