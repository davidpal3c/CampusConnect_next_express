"use client";

import { useUserAuth } from "@/app/_utils/auth-context";
import UserSidebarButton from "./UserSidebarBbutton";
import HomeIcon from "../icons/home_icon";
import EventIcon from "../icons/event_icon";
import NotificationIcon from "../icons/notification_icon";
import GroupIcon from "../icons/group_icon";
import CampusInformationIcon from "../icons/campusInformation_icon";
import GeneralInformationIcon from "../icons/generalnformation_icon";
import SearchIcon from "@mui/icons-material/Search";
import PreArrivalIcon from "../icons/preArrival_icon";

export default function StudentSidebar() {
  const { user } = useUserAuth();

  return (
    <div className="flex bg-saitLighterBlue flex-col w-80 items-center h-screen">
      <div className="m-4">
        <img
          src={user?.photoURL || `/profile.png`}
          className="w-[4.3rem] h-[4.3rem] rounded-full border border-saitBlack"
          alt="user-avatar-photo-campus-connect"
        />
        {/* {user ? (
            <img src={user.photoURL} alt="Campus Connect" />
          ) : (
            <img src="/profile.png" alt="Campus Connect" />
          )} */}
      </div>

      <div className="mb-4 text-saitWhite">
        Hi,{" "}
        <span className="font-semibold">
          {user ? user?.displayName : "User"}!
        </span>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-center relative w-52">
          <SearchIcon
            sx={{
              position: "absolute",
              top: "50%",
              left: "18px",
              transform: "translateY(-50%)",
              color: "#4c4c4c",
              fontSize: 22,
            }}
          />
          <input
            className="placeholder-gray-500 border-2 rounded-lg border-saitLighterBlue ml-8 h-10 p-2 pl-8 w-48 mr-8 focus:outline-none"
            placeholder=""
          />
        </div>

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

        <UserSidebarButton href={"/user/campus-information"} icon={CampusInformationIcon}>
          Campus Information
        </UserSidebarButton>

        <UserSidebarButton href={"/user/general-information"} icon={GeneralInformationIcon}>
          General Information
        </UserSidebarButton>
        
        <UserSidebarButton href={"/user/pre-arrival"} icon={PreArrivalIcon}>
          Pre-Arrival
        </UserSidebarButton>
      </div>
    </div>
  );
}
