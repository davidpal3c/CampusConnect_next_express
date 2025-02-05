import { MouseEventHandler } from "react";

export default function StudentPageBtn({
  text="",
  bgColor="saitLightBlue",
  txtColor="saitWhite",
  onClick
}: {
  text?: string;
  bgColor?: string;
  txtColor?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div>
      <button onClick={onClick}
        className={`bg-${bgColor} text-${txtColor} w-64 h-12 font-normal py-2 px-6 rounded-xl hover:bg-opacity-50 focus:outline-none`}
      >
        {text}
      </button>
    </div>
  );
}
