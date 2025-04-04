import { MouseEventHandler } from "react";

export default function EventCard({
  title = "",
  dateIcon = "/calendarIcon.png",
  date = "",
  timeIcon = "/time.png",
  time = "",
  image = "",
  text = "",
  onClick,
}: {
  title: string;
  dateIcon?: string;
  date: string;
  timeIcon?: string;
  time: string;
  image: string;
  text: string;
  onClick?: MouseEventHandler;
}) {
  const truncateText = (text: string): string => {
    return text.length >= 100 ? text.substring(0, 100) + "..." : text;
  };
  return (
    <div className="flex-col text-saitBlack border-gray-100 rounded-2xl shadow-lg border-2 p-4 hover:border-saitRed hover:shadow-saitRed-100 hover:shadow-lg hover:scale-105 duration-300 ease-in-out">
      <div className="text-xl mb-2">{title}</div>
      <div className="flex items-center">
        <div>
          <img className="w-5 h-5" src={dateIcon} />
        </div>
        <div className="p-1">{date}</div>
      </div>
      <div className="flex items-center mb-2">
        <div>
          <img className="w-5 h-5" src={timeIcon} />
        </div>
        <div className="p-1">{time}</div>
      </div>
      <div>
        <img className="w-30 mb-4" src={image} />
      </div>
      <div className="mb-4">{truncateText(text)}</div>
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={onClick}
          className="bg-white text-saitRed border border-saitRed px-4 py-2 rounded-md flex items-center"
        >
          Add to Calendar
        </button>
        <button
          onClick={onClick}
          className="bg-saitRed text-white px-4 py-2 rounded-md flex items-center"
        >
          RSVP
        </button>
      </div>
    </div>
  );
}
