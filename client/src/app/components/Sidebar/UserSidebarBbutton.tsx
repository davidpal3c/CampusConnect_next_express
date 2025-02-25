import Link from "next/link";

type SidebarButtonProps = {
  href: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  children: React.ReactNode;
};

export default function UserSidebarButton(props: SidebarButtonProps) {
  return (
    <Link
      href={props.href}
      className="flex items-center text-md p-3 w-48 rounded-xl hover:border hover:border-saitLighterBlueOg text-saitWhite stroke-saitWhite fill-saitWhite hover:bg-saitBlueOg hover:text-saitWhite hover:fill-saitWhite hover:stroke-saitWhite transition duration-300 ease-out"
    >
      <props.icon className="size-5 mr-5" />
      <div>{props.children}</div>
    </Link>
  );
}
