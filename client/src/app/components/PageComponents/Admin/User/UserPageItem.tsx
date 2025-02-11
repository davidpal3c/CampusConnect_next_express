import { MouseEventHandler } from "react";

export default function UserPageItem({
  image = "",
  title = "",
  date = "",
  time = "",
  icon,
  bgColor = "saitWhite",
  onClick,
  onClickIcon,
}: {
  image: string;
  title: string;
  date: string;
  time?: string;
  icon?: string;
  bgColor?: string;
  onClick?: MouseEventHandler;
  onClickIcon?: MouseEventHandler;
}) {
  return (
    <div className={`bg-${bgColor} flex cursor-pointer w-2/3 pt-2 pb-2`}>
      <div onClick={onClick} className="flex">
        <div className="ml-8 p-2">
          <img className="w-10" src={image} />
        </div>
        <div className="flex flex-col ml-4 font-bold">
          <div className="text-xl text-saitBlack mb-2">{title}</div>
          <div className="text-gray-400">{date}</div>
        </div>
        <div className="flex items-end">
          <div className="text-gray-400 ml-8 font-bold ">{time}</div>
        </div>
      </div>
      <div className="ml-10 flex flex-auto items-center justify-end mr-2">
        <img onClick={onClickIcon} className="w-6" src={icon} />
      </div>
    </div>
  );
}
