import * as React from "react";
import { SVGProps } from "react";
const GroupIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="current"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M1 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1"
    />
    <path
      stroke="current"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M13 14v0a5 5 0 0 1 5-5v0a5 5 0 0 1 5 5v.5"
    />
    <path
      stroke="current"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
  </svg>
);
export default GroupIcon;
