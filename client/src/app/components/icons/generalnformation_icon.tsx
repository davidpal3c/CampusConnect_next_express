import * as React from "react"
import { SVGProps } from "react"
const GeneralInformationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 7.01V7m0 10v-7m9 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
)
export default GeneralInformationIcon
