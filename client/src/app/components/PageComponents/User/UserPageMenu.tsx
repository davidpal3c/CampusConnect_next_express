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
          className=" hover:text-saitRed underline decoration-inherit"
        >
          {item.title}
        </div>
      );
    }

    return allMenuItems;
  }

  return (
    <div className="flex gap-6 text-saitBlack font-semibold underline cursor-pointer">
      {getMenuItems()}
    </div>
  );
}
