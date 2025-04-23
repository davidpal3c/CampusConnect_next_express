"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { UserDataProvider, useUserData } from "@/app/_utils/userData-context";
import { useUserAuth } from "@/app/_utils/auth-context";
import UserPageMenu from "@/app/components/PageComponents/User/UserPageMenu";
import OverViewCard from "@/app/components/PageComponents/User/Dashboard/OverviewCard";
import EventCard from "@/app/components/PageComponents/User/Events/EventCard";
import { ArticleCard } from "@/app/components/PageComponents/User/Articles/ArticleCards";
import { fetchRecentArticles, fetchRecentEvents } from "./dashboardFetch";

import { EventInterface, ArticleInterface } from "@/app/pages/user/props";

import { toast } from "react-toastify";
 

// Student/Alumni Dashboard (Home)
export default function UserPage() {
  const { userData } = useUserData();
  const { authUserLoading } = useUserAuth();
  const [isClient, setIsClient] = useState(false); // dummy state to track code is running client-side
  const router = useRouter();

  // State Management
  const [articles, setArticles] = useState<ArticleInterface[]>([]);
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const articlesData = await fetchRecentArticles();
      const eventsData = await fetchRecentEvents();
      setArticles(articlesData);
      setEvents(eventsData);
    } catch (error) {
        toast.error("Error fetching data");
    } finally {
        setIsLoading(false);
    }
  };

  // Use Effect for fetching Recent Articles and Events
  useEffect(() => {
    fetchDashboardData();
  }, []);


  const handleLoginRedirectButton = () => {
    router.push("/user/login");
  };

  const handleHomeRedirectButton = () => {
    router.push("/");
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {});

  function onClickOverview() {
    // TODO
  }

  function onClickUpcoming() {
    // TODO
  }

  function onClickAnnouncements() {
    // TODO
  }

  if (authUserLoading || !isClient) {
    return null; // prevent rendering until the component is mounted on the client side
  }

  const testOverviewItems = [
    { title: "Upcoming Events", icon: "/event.png", number: 4, text: "-" },
    { title: "New Articles", icon: "/article.png", number: 5, text: "-" },
    {
      title: "Unread Messages",
      icon: "/unreadmessage.png",
      number: 6,
      text: "-",
    },
  ];

  

  const unauthorized = (
    <main className="bg-slate-800 flex flex-row justify-center items-center w-full h-full md:flex-row md:items-center z-50 top-0 left-0 fixed">
      <div>
        <Image
          src="/sait-logo.png"
          alt="Campus Connect"
          className="rounded-lg mb-6 mx-auto w-40 md:w-60"
          width={100}
          height={100}
          unoptimized
          loading="lazy"
        />
        {/* <img
          src="/sait-logo-trans.png"
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
            <p className="text-saitWhite">Login </p>
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

  const authorizedPage = (
    <main className="m-8 flex-col text-saitBlack">
      <div className="flex justify-between items-center h-full">
          <div className="flex-col">
            <h1 className="text-4xl font-bold">Welcome back, {first_name}!</h1>
            <p className="text-saitGray mt-4">
              Here's what's happening at SAIT today.{" "}
            </p>
          </div>
          <div className="flex items-center">
            <button className="bg-saitRed text-white px-4 py-2 rounded-md flex items-center gap-2">
              <img src="/calendar.png" alt="Calendar Icon" className="w-5 h-5" />
              Add to Calendar
            </button>
          </div>
        </div>
        <div>
          <UserPageMenu
            menuItems={[
              { title: "Overview", onClick: onClickOverview },
              { title: "Upcoming", onClick: onClickUpcoming },
              { title: "Announcements", onClick: onClickAnnouncements },
            ]}
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 my-4">
          {testOverviewItems.slice(0, 4).map((item, index) => (
              <OverViewCard
                key={index}
                title={item.title}
                icon={item.icon}
                number={item.number}
                text={item.text}
              />
          ))}
        </div>

        <h1 className="flex text-2xl font-bold mt-8">Recent Events</h1>

        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-y-12 gap-x-6 mt-4">
          {events.map((event) => (
            <EventCard key={event.event_id} {...event}/>
          ))}
        </div>

        <h1 className="flex text-2xl font-bold mt-8">Latest Articles</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {articles.map((article, index) => (
            <ArticleCard key={article.article_id} {...article} />
          ))}
        </div>
      </main>
  );

  return user?.role === "Student" || user?.role === "Alumni" ? authorizedPage : unauthorized;

}
