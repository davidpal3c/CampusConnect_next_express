"use client";

import { useUserAuth } from "@/app/_utils/auth-context";
import { useEffect, useState } from "react";
import UserSidebarButton from "./UserSidebarBbutton";
import HomeIcon from "../Icons/home_icon";
import EventIcon from "../Icons/event_icon";
import NotificationIcon from "../Icons/notification_icon";
import GroupIcon from "../Icons/group_icon";
import CampusInformationIcon from "../icons/campusInformation_icon";
import GeneralInformationIcon from "../icons/generalnformation_icon";
import SearchIcon from '@mui/icons-material/Search';
import PreArrivalIcon from "../icons/preArrival_icon";

type SidebarProps = {};

export default function StudentSidebar(props: SidebarProps) {
  const { user } = useUserAuth();

  useEffect(() => {
    console.log("USER from sidebar: ", user);
  }, [user]);
  
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col w-52 items-center z-30 md:ml-4 lg:ml-5 xl:ml-8">
        <div className="size-20 m-5 items-center">
          <img 
            src={user?.photoURL || `/profile.png`} 
            className="w-[4.3rem] h-[4.3rem] ml-[0.45rem] mt-[0.45rem] rounded-full border border-slate-400"
            alt="user-avatar-photo-campus-connect" 
          />
          {/* {user ? (
            <img src={user.photoURL} alt="Campus Connect" />
          ) : (
            <img src="/profile.png" alt="Campus Connect" />
          )} */}
        </div>
        { user ? (
          <div className="mb-4 text-saitWhite">Hi, <span className="font-semibold text-saitWhite">{user?.displayName}!</span></div>
        ) : (
          null
        )}
        <div className="flex justify-center relative w-52">
          <SearchIcon 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '18px',
              transform: 'translateY(-50%)',
              color: '#4c4c4c',
              fontSize: 22,
            }}
          />
          <input
            className="placeholder-gray-500 border-2 rounded-lg border-saitLighterBlue ml-8 h-10 p-2 pl-8 w-48 mr-8 focus:outline-none"
            placeholder=""
          />
        </div>
        <div>
          <UserSidebarButton href={"/user"} icon={HomeIcon}>
            Dashboard
          </UserSidebarButton>
          <UserSidebarButton href={"/user/events"} icon={EventIcon}>
            Events
          </UserSidebarButton>
          <UserSidebarButton href={"/user/notifications"} icon={NotificationIcon}>
            Notifications
          </UserSidebarButton>
          <UserSidebarButton href={"/user/groups"} icon={GroupIcon}>
            Groups
          </UserSidebarButton>
          <UserSidebarButton
            href={"/user/campusInformation"}
            icon={CampusInformationIcon}
          >
            Campus Information
          </UserSidebarButton>
          <UserSidebarButton
            href={"/user/generalInformation"}
            icon={GeneralInformationIcon}
          >
            General Information
          </UserSidebarButton>
          <UserSidebarButton href={"/user/preArrival"} icon={PreArrivalIcon}>
            Pre-Arrival
          </UserSidebarButton>
        </div>
      </div>
      <div className="w-screen">{}</div>
    </div>
  );
}
