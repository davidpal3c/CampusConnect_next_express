"use client";

import { useUserAuth } from "@/app/_utils/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserCard from "@/app/components/PageComponents/Admin/User/UserCard";

// Student/Alumni Dashboard (Home)
export default function UserHomePage() {
  const { user, authUserLoading } = useUserAuth();
  const [isClient, setIsClient] = useState(false); // dummy state to track code is running client-side
  const router = useRouter();

  const handleLoginRedirectButton = () => {
    router.push("/user/login");
  };

  const handleHomeRedirectButton = () => {
    router.push("/");
  };

  useEffect(() => {
    setIsClient(true); // set to true only after component has mounted on the client
  }, []);

  const fetchArticleData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
        }
      );

      const articleData = await response.json();
    } catch (error) {}
  };

  useEffect(() => {
    fetchArticleData();
  }, []);

  if (authUserLoading || !isClient) {
    return null; // prevent rendering until the component is mounted on the client side
  }

  const unauthorized = (
    <main className="bg-slate-800 flex flex-row justify-center items-center w-full h-full md:flex-row md:items-center z-50 top-0 left-0 fixed">
      <div>
        {/* <img
                    src="/sait-logo.png"
                    alt="Campus Connect"
                    className="rounded-lg mb-6 mx-auto w-40 md:w-60"
                /> */}
        <div>
          <h1 className="text-4xl text-white font-bold">403</h1>
          <h2 className="text-2xl text-white font-semibold">
            Forbidden Access
          </h2>
          <p className="text-white">You must Log In to view this page.</p>
        </div>

        <div className="flex flex-row justify-center items-center space-x-4 mt-6">
          <button
            onClick={handleLoginRedirectButton}
            className="w-32 flex flex-row justify-center items-center hover:bg-saitBlue border-white border-2 rounded-2xl p-3 cursor-pointer shadow-xl"
          >
            <p className="text-saitWhite">Login</p>
          </button>
          <button
            onClick={handleHomeRedirectButton}
            className="w-32 flex flex-row justify-center items-center  hover:bg-saitBlue border-white border-2 rounded-2xl p-3 cursor-pointer shadow-xl"
          >
            <p className="text-saitWhite">Home</p>
          </button>
        </div>
      </div>
    </main>
  );

  const fakeArticles = [
    {
      article_id: 0,
      title: "Interfaith Centre",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      article_id: 1,
      title: "Library",
      content:
        "Cursus tempor cubilia facilisis sed a suspendisse. Arcu aptent sociosqu luctus viverra mauris gravida integer. Parturient himenaeos pretium interdum natoque nam. Ornare neque maximus turpis laoreet eros scelerisque primis. Consequat porta ad hac egestas auctor. Ipsum sagittis senectus nascetur himenaeos, vitae purus volutpat litora. Dolor imperdiet sollicitudin sem felis ligula.",
    },
    { article_id: 2, title: "SAITSA", content: "Hello" },
    { article_id: 3, title: "SAITSA", content: "Hello" },
  ];

  const fakeData = [{ article_id: 0, title: "Title", content: "content" }];
  const fakeData1 = [
    {
      article_id: 0,
      title: "Health and Public Safty",
      content: "February 18th, 2025 at 12:00 PM - 1:00 PM ",
    },
    {
      article_id: 1,
      title: "Peer Writing and Presentation Drop-In",
      content: "February 18th, 2025 at 12:00 PM - 2:00 PM ",
    },
  ];
  const fakeData2 = [
    {
      article_id: 0,
      title: "New Message",
      content: "February 17th, 2025 at 11:04 AM",
    },
    {
      article_id: 1,
      title: "New Announcement",
      content: "February 16th, 2025 at 03:26 PM",
    },
  ];
  const fakeData3 = [
    { article_id: 0, title: "Software Development" },
    { article_id: 1, title: "Cultural Connection" },
    { article_id: 2, title: "SAIT Hiking" },
  ];

  const authorizedPage = (
    <main className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 m-4">
      <UserCard
        title="Campus Information"
        articles={fakeArticles}
        onClickViewAll={() => router.push("/user/campusInformation")}
      />
      <UserCard
        title="General Information"
        articles={fakeData}
        onClickViewAll={() => router.push("/user/generalInformation")}
      />
      <UserCard
        title="Pre-Arrival Information"
        articles={fakeData}
        onClickViewAll={() => router.push("/user/preArrival")}
      />
      <UserCard
        title="Events"
        articles={fakeData1}
        onClickViewAll={() => router.push("/user/events")}
      />
      <UserCard
        title="Notifications"
        articles={fakeData2}
        onClickViewAll={() => router.push("/user/notifications")}
      />
      <UserCard
        title="Groups"
        articles={fakeData3}
        onClickViewAll={() => router.push("/user/groups")}
      />
    </main>
  );

  return !user ? unauthorized : authorizedPage;
}
