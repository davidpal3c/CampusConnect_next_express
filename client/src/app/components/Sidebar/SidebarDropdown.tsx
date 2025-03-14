import { useState } from "react";
import Link from "next/link";

type SidebarDropdownProps = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  links: { href: string; label: string }[];
};

export default function SidebarDropdown({ title, icon: Icon, links }: SidebarDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="w-full">
        {/* Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-md my-3 p-3 pl-6 w-full rounded-xl text-saitWhite stroke-saitWhite 
                     hover:bg-saitBlue hover:text-saitWhite hover:stroke-saitWhite transition duration-300 ease-out"
        >
          <Icon className="size-4 mr-4" />
          <h1 className="flex-1 text-left">{title}</h1>
          <span className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>▼</span>
        </button>
  
        {/* Dropdown Content */}
        {isOpen && (
          <div className="mt-1 pl-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm py-2 px-4 text-saitWhite rounded-lg 
                           hover:bg-saitBlue hover:text-saitWhite transition duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
  