"use client";

import { useUserAuth } from "@/app/_utils/auth-context";
import UserPageItem from "@/app/components/PageComponents/User/UserPageItem";
import UserPageMenu from "@/app/components/PageComponents/User/UserPageMenu";
import { useEffect } from "react";

export default function Notifications() {
  const { user } = useUserAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  function onClickAllNotifications() {
    // TODO
  }

  function onClickMessages() {
    // TODO
  }

  function onClickEvents() {
    // TODO
  }

  function onClickAnnouncements() {
    // TODO
  }

  return (
    <div className="p-4 h-screen">
      <div>
        <div className="ml-10 mb-10">
          <UserPageMenu
            menuItems={[
              { title: "All Notifications", onClick: onClickAllNotifications },
              { title: "Messages", onClick: onClickMessages },
              { title: "Events", onClick: onClickEvents },
              { title: "Announcements", onClick: onClickAnnouncements },
            ]}
          />
        </div>

        <UserPageItem
          image="/message.png"
          title="New Message"
          date="February 04, 2025 at 03:43 PM"
        />
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <UserPageItem
          image="/calendar.png"
          title="New Event"
          date="February 03, 2025 at 03:00 PM"
        />
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <UserPageItem
          image="/announcement.png"
          title="New Announcement"
          date="February 03, 2025 at 10:04 AM"
        />

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      </div>
      {/* { user ? (
        <div>
          <div className="bg-saitWhite h-screen">{user?.displayName}</div>
        </div>
      ) : (
        <p className="test-black">No user</p>
      ) } */}
    </div>
  );
}
