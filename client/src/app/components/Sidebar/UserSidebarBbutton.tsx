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
    <div className="flex items-center text-md m-3 p-3 pl-6 w-48 rounded-xl hover:border hover:border-saitLighterBlueOg text-saitWhite stroke-saitWhite fill-saitWhite hover:bg-saitBlueOg hover:text-saitWhite hover:fill-saitWhite hover:stroke-saitWhite transition duration-300 ease-out">
      <props.icon className="size-5 mr-5" />
      <Link href={props.href}>{props.children}</Link>
    </div>
  );
}
