import SidebarButton from "./sidebar_button";
import HomeIcon from "../Icons/home_icon";
import EventIcon from "../Icons/event_icon";
import NotificationIcon from "../Icons/notification_icon";
import GroupIcon from "../Icons/group_icon";
import CampusInformationIcon from "../icons/campusInformation_icon";
import GeneralInformationIcon from "../icons/generalnformation_icon";
import PreArrivalIcon from "../icons/preArrival_icon";
import { useUserAuth } from "@/app/_utils/auth-context";

type SidebarProps = {};

export default function StudentSidebar(props: SidebarProps) {
  const { user } = useUserAuth();
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col w-50 items-center">
        <div className="size-20 m-5">
          <img src="/profile.png" alt="Campus Connect" />
        </div>
        <div className="mb-2">Hello, {user.displayName}</div>
        <div className="flex justify-center relative">
          <img
            src="/search.png"
            className="absolute left-10 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
          <input
            className="placeholder-gray-500 border-2 rounded-lg border-saitBlue ml-8 h-8"
            placeholder=""
          />
        </div>
        <div>
          <SidebarButton href={"/user"} icon={HomeIcon}>
            Dashboard
          </SidebarButton>
          <SidebarButton href={"/user/events"} icon={EventIcon}>
            Events
          </SidebarButton>
          <SidebarButton href={"/user/notifications"} icon={NotificationIcon}>
            Notifications
          </SidebarButton>
          <SidebarButton href={"/user/groups"} icon={GroupIcon}>
            Groups
          </SidebarButton>
          <SidebarButton
            href={"/user/campusInformation"}
            icon={CampusInformationIcon}
          >
            Campus Information
          </SidebarButton>
          <SidebarButton
            href={"/user/generalInformation"}
            icon={GeneralInformationIcon}
          >
            General Information
          </SidebarButton>
          <SidebarButton href={"/user/preArrival"} icon={PreArrivalIcon}>
            Pre-Arrival
          </SidebarButton>
        </div>
      </div>
      <div className="w-screen">{}</div>
    </div>
  );
}
