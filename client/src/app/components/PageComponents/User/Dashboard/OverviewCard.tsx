import { MouseEventHandler } from "react";

export default function OverViewCard({
  title = "",
  icon = "",
  number = 0,
  text = "",
  onClick,
}: {
  title: string;
  icon: string;
  number: number;
  text: string;
  onClick?: MouseEventHandler;
}) {
  return (
    <div
      onClick={onClick}
      className="flex-col text-saitBlack bg-white border-gray-100 rounded-2xl shadow-lg border-2 p-4 cursor-pointer hover:border-saitRed hover:shadow-red-200 hover:shadow-lg hover:scale-105 duration-300 ease-in-out"
    >
      <div className="flex justify-between items-center">
        <div className="text-lg mb-2">{title}</div>
        <div className="p-2">
          <img className="w-8 h-8" src={icon} />
        </div>
      </div>
      <div className="text-4xl mb-2">{number}</div>
      <div>{text}</div>
    </div>
  );
}
