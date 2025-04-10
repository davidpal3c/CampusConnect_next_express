import SidebarButton from "@/app/components/Sidebar/SidebarButton";
import HomeIcon from "@/app/components/Icons/home_icon";
import EventIcon from "@/app/components/Icons/event_icon";
import NotificationIcon from "@/app/components/Icons/notification_icon";
import GroupIcon from "@/app/components/Icons/group_icon";
import StudentIcon from "@/app/components/Icons/student_icon";
import AnalyticIcon from "@/app/components/Icons/analytic_icon";
import ArticleIcon from "@/app/components/Icons/article_icon";

import { Link } from "@mui/material";
import { useUserAuth } from "@/app/_utils/auth-context";

type SidebarProps = {};

export default function Sidebar(props: SidebarProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex flex-col w-64 items-center bg-slate-800 shadow-md">
        <div className="size-[5.3rem] my-[2.8rem]">
          <img
            src="/sait-logo-trans.png"
            alt="Campus Connect"
          />
        </div>
        <div className="flex flex-col align-middle items-center">
          <SidebarButton href={"/admin"} icon={HomeIcon}>
            Dashboard
          </SidebarButton>
          <SidebarButton href={"/admin/articles"} icon={ArticleIcon}>
            Articles
          </SidebarButton>
          <SidebarButton href={"/admin/events"} icon={EventIcon}>
            Events
          </SidebarButton>
          <SidebarButton href={"/admin/groups"} icon={GroupIcon}>
            Groups
          </SidebarButton>
          <SidebarButton href={"/admin/notifications"} icon={NotificationIcon}>
            Notifications
          </SidebarButton>
          <SidebarButton href={"/admin/analytics"} icon={AnalyticIcon}>
            Analytics
          </SidebarButton>
          <SidebarButton href={"/admin/users"} icon={StudentIcon}>
            User Management
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