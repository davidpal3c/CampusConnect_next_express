import { MouseEventHandler } from "react";

export default function UserPageMenu({
  menuItems = [],
}: {
  menuItems?: { title: string; onClick?: MouseEventHandler<HTMLDivElement> }[];
}) {
  function getMenuItems() {
    let allMenuItems = [];
    for (let item of menuItems) {
      allMenuItems.push(
        <div
          key={item.title}
          onClick={item.onClick}
          className=" hover:text-saitLighterBlue underline decoration-inherit"
        >
          {item.title}
        </div>
      );
    }

    return allMenuItems;
  }

  return (
    <div className="bg-saitWhite flex gap-6 text-saitGray text-xl mt-8 underline cursor-pointer">
      {getMenuItems()}
    </div>
  );
}
