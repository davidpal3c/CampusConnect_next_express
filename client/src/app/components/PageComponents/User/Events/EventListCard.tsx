import { MouseEventHandler } from "react";
import UserPageMenu from "../UserPageMenu";
import Image from "next/image";

export default function EventListCard({
  title = "",
  dateIcon = "/calendarIcon.png",
  date = "",
  locationIcon = "/location.png",
  location = "",
  image = "",
  text = "",
  onClick,
}: {
  key: number;
  title: string;
  dateIcon?: string;
  date: string;
  locationIcon?: string;
  location: string;
  image: string;
  text: string;
  onClick?: MouseEventHandler;
}) {
  const truncateText = (text: string): string => {
    return text.length >= 100 ? text.substring(0, 100) + "..." : text;
  };
  return (
    <div className="sm:flex-row flex-col flex text-saitBlack justify-center items-center border-gray-200 rounded-2xl border-2 p-4 bg-gray-100">
      <div className="flex items-center justify-center m-2">
        <Image
          src={image || "/event.png"}
          alt="event-image"
          width={240}
          height={160}
          className="rounded-md"
        />
      </div>
      <div className="m-2">
        <div className="text-xl">{title}</div>
        <div className="text-xs m-2">{truncateText(text)}</div>
        <div className="flex items-center text-xs">
          <div>
            <img className="w-5 h-5" src={dateIcon} />
          </div>
          <div className="p-1">{date}</div>
          <div className="flex items-center">
            <div>
              <img className="w-5 h-5" src={locationIcon} />
            </div>
            <div className="p-1">{location}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col m-2">
        <button
          onClick={onClick}
          className="bg-saitRed text-white px-4 py-2 mb-2 rounded-md flex items-center justify-center"
        >
          RSVP
        </button>
        <button
          onClick={onClick}
          className="bg-white text-xs text-saitRed border border-saitRed px-4 py-2 rounded-md flex items-center"
        >
          See Details
        </button>
      </div>
    </div>
  );
}
