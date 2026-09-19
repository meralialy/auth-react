import styled from "styled-components";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
}

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

export const EmailIcon: React.FC<IconProps> = (props) => (
    <StyledSvg {...props}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </StyledSvg>
);
