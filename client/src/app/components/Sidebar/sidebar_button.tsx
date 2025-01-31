import Link from "next/link";

type SidebarButtonProps = {
  href: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  children: React.ReactNode;
};

export default function SidebarButton(props: SidebarButtonProps) {
  return (
    <div className="flex items-center text-md m-3 p-3 pl-6 w-full rounded-xl text-saitBlack stroke-saitBlack fill-saitBlack hover:bg-saitBlue hover:text-saitWhite hover:fill-saitWhite hover:stroke-saitWhite transition duration-300 ease-out">
      <props.icon className="size-4 mr-4" />
      <Link href={props.href}>{props.children}</Link>
    </div>
  );
}
