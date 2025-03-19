"use client";

import { useUserAuth } from "@/app/_utils/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserCard from "@/app/components/PageComponents/Admin/User/UserCard";
import { getCurrentSeason } from "../../components/PageComponents/Admin/User/IntakePicker";
import { useUser } from "@/app/_utils/user-context";
import UserPageMenu from "@/app/components/PageComponents/User/UserPageMenu";
import OverViewCard from "@/app/components/PageComponents/User/Dashboard/OverviewCard";
import EventCard from "@/app/components/PageComponents/User/Dashboard/EventCard";
import { ArticleCard } from "@/app/components/PageComponents/User/Articles/ArticleCards";

// Student/Alumni Dashboard (Home)
export default function UserPage() {
  const { user, loadingUser } = useUser();
  const { user_id, first_name, last_name, role, status } = user?.user || {};
  const [isClient, setIsClient] = useState(false); // dummy state to track code is running client-side
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const currentSeason = getCurrentSeason();

  const handleLoginRedirectButton = () => {
    router.push("/user/login");
  };

  const handleHomeRedirectButton = () => {
    router.push("/");
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  function onClickOverview() {
    // TODO
  }

  function onClickUpcoming() {
    // TODO
  }

  function onClickAnnouncements() {
    // TODO
  }

  const testOverviewItems = [
    { title: "Upcoming Events", icon: "/event.png", number: 4, text: "-" },
    { title: "New Articles", icon: "/article.png", number: 5, text: "-" },
    { title: "Active Groups", icon: "/group.png", number: 3, text: "-" },
    {
      title: "Unread Messages",
      icon: "/unreadmessage.png",
      number: 6,
      text: "-",
    },
  ];

  const testEvents = [
    {
      title: "Applied Technology Seminar",
      date: "March 18, 2025",
      time: "10:00 AM - 12:00 PM",
      image: "/seminar.jpg",
      text: "Join us for an exclusive Technology Seminar where industry experts will unveil the latest trends, breakthroughs, and insights shaping the tech world.",
    },
    {
      title: "Zen Den | Origami workshop",
      date: "March 19, 2025",
      time: "11:00 AM - 1:00 PM",
      image: "/origami.jpg",
      text: "Relax and recharge by crating beautiful paper designs in this meditative workshop.",
    },
    {
      title: "Drop in and Learn - Exam Writing Skills",
      date: "March 18, 2025",
      time: "10:00 AM - 12:00 PM",
      image: "/exam.jpg",
      text: "Tests and exams can be a source of stress, but having solid strategies can help!",
    },
  ];
  const testArticles = [
    {
      article_id: "",
      title: "First article",
      content: " ",
      type_id: "",
      imageUrl: "/seminar.jpg",
      datePublished: "2002",
      created_at: "2001",
      updated_at: "2002",
      author: "John",
      author_id: "",
      audience: "Hungry people",
      status: "great",
      type: {
        type_id: "",
        name: "d",
        created_at: "2001",
        updated_at: "2002",
        isDefault: true,
      },
    },
    {
      article_id: "",
      title: "Second article",
      content: " ",
      type_id: "",
      imageUrl: "/seminar.jpg",
      datePublished: "2002",
      created_at: "2001",
      updated_at: "2002",
      author: "John",
      author_id: "",
      audience: "Hungry people",
      status: "great",
      type: {
        type_id: "",
        name: "d",
        created_at: "2001",
        updated_at: "2002",
        isDefault: true,
      },
    },
    {
      article_id: "",
      title: "Third article",
      content: " ",
      type_id: "",
      imageUrl: "/seminar.jpg",
      datePublished: "2002",
      created_at: "2001",
      updated_at: "2002",
      author: "John",
      author_id: "",
      audience: "Hungry people",
      status: "great",
      type: {
        type_id: "",
        name: "d",
        created_at: "2001",
        updated_at: "2002",
        isDefault: true,
      },
    },
    {
      article_id: "",
      title: "Fourth article",
      content: " ",
      type_id: "",
      imageUrl: "/seminar.jpg",
      datePublished: "2002",
      created_at: "2001",
      updated_at: "2002",
      author: "John",
      author_id: "",
      audience: "Hungry people",
      status: "great",
      type: {
        type_id: "",
        name: "d",
        created_at: "2001",
        updated_at: "2002",
        isDefault: true,
      },
    },
  ];

  const unauthorized = (
    <main className="bg-slate-800 flex flex-row justify-center items-center w-full h-full md:flex-row md:items-center z-50 top-0 left-0 fixed">
      <div>
        <img
          src="/sait-logo-trans.png"
          alt="Campus Connect"
          className="rounded-lg mb-6 mx-auto w-40 md:w-60"
        />
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

  const authorizedPage = (
    <main className="m-8 flex-col">
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

      <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-4">
        {testOverviewItems.slice(0, 4).map((item) => (
          <OverViewCard
            title={item.title}
            icon={item.icon}
            number={item.number}
            text={item.text}
          />
        ))}
      </div>

      <h1 className="flextext-2xl text-xl font-semibold mt-4">Events</h1>

      <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-4">
        {testEvents.slice(0, 3).map((event) => (
          <EventCard
            title={event.title}
            date={event.date}
            time={event.time}
            image={event.image}
            text={event.text}
          />
        ))}
      </div>

      <h1 className="flextext-2xl text-xl font-semibold mt-4">
        Latest Articles
      </h1>

      <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-4">
        {testArticles.slice(0, 3).map((article) => (
          <ArticleCard
            article_id={article.article_id}
            title={article.title}
            content={article.content}
            type_id={article.type_id}
            imageUrl={article.imageUrl}
            datePublished={article.datePublished}
            created_at={article.created_at}
            updated_at={article.updated_at}
            author={article.author}
            author_id={article.author_id}
            audience={article.audience}
            status={article.status}
            type={article.type}
          />
        ))}
      </div>
    </main>
  );

  return user ? unauthorized : authorizedPage;
}
