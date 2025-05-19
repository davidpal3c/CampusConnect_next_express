import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path strokeLinecap="round" strokeWidth={2} d="M4 18h16M4 12h16M4 6h16" />
  </svg>
);
export default SvgComponent;
