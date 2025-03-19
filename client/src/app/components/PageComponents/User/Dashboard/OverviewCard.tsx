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
      className="flex-col border-gray-100 rounded-2xl shadow-lg border-2 p-4 cursor-pointer"
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
