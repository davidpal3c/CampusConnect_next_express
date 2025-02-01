import SidebarButton from "./sidebar_button";
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

    <div className="flex min-h-screen">
      <div className="flex flex-col w-52 items-center z-30 md:ml-4 lg:ml-5 xl:ml-8">
        <div className="size-20 m-5">
          <img src="/sait-logo.png" alt="Campus Connect" className="border-4 rounded-xl border-saitLightBlue"/>
        </div>
        <div>
          <SidebarButton href={"/admin"} icon={HomeIcon}>
            Dashboard
          </SidebarButton>
          <SidebarButton href={"/admin/events"} icon={EventIcon}>
            Events
          </SidebarButton>
          <SidebarButton
            href={"/admin/notifications"}
            icon={NotificationIcon}
          >
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
          <div>
            <a href="/studentView">
              <button className="bg-saitBlue text-saitWhite font-bold py-2 mb-4 px-8 rounded-xl hover:bg-opacity-90">
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
      <div className="w-screen">{}</div>
    </div>

  );
}
