import SidebarButton from "./SidebarButton";
import HomeIcon from "../Icons/home_icon";
import EventIcon from "../Icons/event_icon";
import NotificationIcon from "../Icons/notification_icon";
import GroupIcon from "../Icons/group_icon";
import StudentIcon from "../Icons/student_icon";
import AnalyticIcon from "../Icons/analytic_icon";
import ArticleIcon from "../Icons/article_icon";

import { Link } from "@mui/material";
import { useUserAuth } from "@/app/_utils/auth-context";

type SidebarProps = {};

export default function Sidebar(props: SidebarProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex flex-col w-64 items-center bg-white shadow-md">
        <div className="size-20 my-10">
          <img
            src="/sait-logo.png"
            alt="Campus Connect"
          />
        </div>
        <div className="flex flex-col align-middle items-center">
          <SidebarButton href={"/admin"} icon={HomeIcon}>
            Dashboard
          </SidebarButton>
          <SidebarButton href={"/admin/events"} icon={EventIcon}>
            Events
          </SidebarButton>
          <SidebarButton href={"/admin/notifications"} icon={NotificationIcon}>
            Notifications
          </SidebarButton>
          <SidebarButton href={"/admin/groups"} icon={GroupIcon}>
            Groups
          </SidebarButton>
          <SidebarButton href={"/admin/users"} icon={StudentIcon}>
            Users
          </SidebarButton>
          <SidebarButton href={"/admin/analytics"} icon={AnalyticIcon}>
            Analytics
          </SidebarButton>
          <SidebarButton href={"/admin/articles"} icon={ArticleIcon}>
            Articles
          </SidebarButton>
        </div>
        <div className="flex flex-col items-center gap-2 my-auto">
          <a href="/studentView">
            <button className="bg-saitBlue text-saitWhite font-bold py-2 px-8 rounded-xl hover:bg-opacity-90">
              View as a Student
            </button>
          </a>
          <a href="/alumniView">
            <button className="bg-saitDarkRed text-saitWhite font-bold py-2 px-8 rounded-xl hover:bg-opacity-90">
              View as an Alumni
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}