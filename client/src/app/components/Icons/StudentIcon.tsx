import * as React from "react";
import { SVGProps } from "react";
const StudentIcon = (props: SVGProps<SVGSVGElement>) => (
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
      strokeLinejoin="round"
      strokeWidth={2}
      d="m12 4.5-10 5 10 5 10-5-10-5Z"
    />
    <path
      stroke="current"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11v5l-7 3.5L5 16v-5M22 14v4"
    />
  </svg>
);
export default StudentIcon;
