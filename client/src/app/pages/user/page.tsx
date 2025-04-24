"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useUserData } from "@/app/_utils/userData-context";
import { useUserAuth } from "@/app/_utils/auth-context";

import UserPageMenu from "@/app/components/PageComponents/User/UserPageMenu";
import OverViewCard from "@/app/components/PageComponents/User/Dashboard/OverviewCard";
import EventCard from "@/app/components/PageComponents/User/Events/EventCard";
import { ArticleCard } from "@/app/components/PageComponents/User/Articles/ArticleCards";
import Loader from "@/app/components/Loader/Loader"; 

import { fetchRecentArticles, fetchRecentEvents } from "./dashboardFetch";
import { EventInterface, ArticleInterface } from "@/app/api/users/props";

import { toast } from "react-toastify";

export default function UserPage() {
  const router = useRouter();
  const { userData }: { userData: any} = useUserData();
  const { authUserLoading, user } = useUserAuth();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<ArticleInterface[]>([]);
  const [events, setEvents] = useState<EventInterface[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const articlesData = await fetchRecentArticles();
        const eventsData = await fetchRecentEvents();
        setArticles(articlesData);
        setEvents(eventsData);
      } catch (error) {
        toast.error("Error fetching dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLoginRedirectButton = () => {
    router.push("/user/login");
  };

  const handleHomeRedirectButton = () => {
    router.push("/");
  };

  const onClickOverview = () => {};
  const onClickUpcoming = () => {};
  const onClickAnnouncements = () => {};

  const testOverviewItems = [
    { title: "Upcoming Events", icon: "/event.png", number: 4, text: "-" },
    { title: "New Articles", icon: "/article.png", number: 5, text: "-" },
    { title: "Unread Messages", icon: "/unreadmessage.png", number: 6, text: "-" },
  ];

  const unauthorized = (
    <main className="bg-slate-800 flex flex-col justify-center items-center w-full h-screen fixed top-0 left-0 z-50">
      <Image
        src="/sait-logo.png"
        alt="Campus Connect"
        className="rounded-lg mb-6"
        width={160}
        height={160}
        unoptimized
      />
      <div className="text-center text-white space-y-2">
        <h1 className="text-4xl font-bold">403</h1>
        <h2 className="text-2xl font-semibold">Forbidden Access</h2>
        <p>You must Log In to view this page.</p>
      </div>
      <div className="flex flex-row justify-center space-x-4 mt-6">
        <button
          onClick={handleLoginRedirectButton}
          className="w-32 border-white border-2 rounded-2xl p-3 hover:bg-saitBlue text-saitWhite shadow-xl"
        >
          Login
        </button>
        <button
          onClick={handleHomeRedirectButton}
          className="w-32 border-white border-2 rounded-2xl p-3 hover:bg-saitBlue text-saitWhite shadow-xl"
        >
          Home
        </button>
      </div>
    </main>
  );

  const first_name = userData?.user.first_name ?? "User";

  const authorizedPage = (
    <main className="m-8 flex-col text-saitBlack">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Welcome back, {first_name}!</h1>
          <p className="text-saitGray mt-4">Here's what's happening at SAIT today.</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 my-4">
        {testOverviewItems.map((item, index) => (
          <OverViewCard key={index} {...item} />
        ))}
      </div>

      <h1 className="text-2xl font-bold mt-8">Recent Events</h1>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-y-12 gap-x-6 mt-4">
        {events.map((event) => (
          <EventCard key={event.event_id} {...event} />
        ))}
      </div>

      <h1 className="text-2xl font-bold mt-8">Latest Articles</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-4">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} {...article} />
        ))}
      </div>
    </main>
  );

  if (authUserLoading || !isClient) return null;

  return (
    <>
      <Loader isLoading={isLoading} />
      {user?.role === "Student" || user?.role === "Alumni"
        ? authorizedPage
        : unauthorized}
    </>
  );
}
