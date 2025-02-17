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
    <Link 
      href={props.href} 
      className="flex items-center text-md m-3 p-3 pl-6 w-full rounded-xl text-saitBlack stroke-saitBlack 
                hover:bg-saitBlue hover:text-saitWhite hover:stroke-saitWhite transition duration-300 ease-out"
    >
      <props.icon className="size-4 mr-4" />
      <h1>{props.children}</h1>
    </Link>

  );
}