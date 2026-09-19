import styled from "styled-components";
import type { IconProps } from "./email-icon";

const StyledSvg = styled.svg.attrs<IconProps>(({ size = 20, color = "currentColor" }) => ({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
}))<IconProps>`
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
`;

export const UserIcon: React.FC<IconProps> = (props) => (
    <StyledSvg {...props}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </StyledSvg>
);
