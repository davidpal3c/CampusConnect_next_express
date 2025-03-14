"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { UrlObject } from "url";
import ExpandMore from '@mui/icons-material/ExpandMore';
import NavigateNext from '@mui/icons-material/NavigateNext';


type ButtonProps = {
  href: string | UrlObject;
  children: React.ReactNode;
};

type DropdownProps = {
  children: React.ReactNode;
  buttonText: string;
};

export function TopBarButton(props: ButtonProps) {
  return (
    <Link 
      href={props.href} 
      className="flex items-center text-md p-2 rounded-sm font-semibold text-saitWhite 
    hover:bg-white hover:bg-opacity-10"
    >
      <h1>{props.children}</h1>
    </Link>

  );
}

export function TopBarDropdownOption(props: ButtonProps) {
  return (
    <Link 
      href={props.href} 
      className="flex items-center text-md p-2 rounded-sm text-saitBlack 
    hover:bg-black hover:bg-opacity-10"
    >
      <h1 className="mr-4">{props.children}</h1>
      <NavigateNext className=" ml-auto text-saitBlack" />
    </Link>

  );
}

export function TopBarDropdown(props: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown visibility
  const toggleDropdown = () => setIsOpen(prevState => !prevState);

  return (
    <div className="relative">
      {/* Button to toggle dropdown */}
      <button
        onClick={toggleDropdown}
        className="flex items-center text-md p-2 rounded-sm font-semibold text-saitWhite 
          hover:bg-white hover:bg-opacity-10"
      >
        <h1>{props.buttonText}</h1> 
        <ExpandMore className="text-saitWhite" />
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute flex flex-col bg-white shadow-lg rounded-lg p-2 mt-1">
          {props.children}
        </div>
      )}
    </div>
  );
}