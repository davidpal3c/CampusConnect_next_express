"use client";
import EventListCard from "@/app/components/PageComponents/User/Events/EventListCard";
import UserPageMenu from "@/app/components/PageComponents/User/UserPageMenu";

export default function Events() {
  function onClickAllEvents() {
    // TODO
  }

  function onClickMyEvents() {
    // TODO
  }

  function onClickMyCalendar() {
    // TODO
  }
  const testEvents = [
    {
      title: "Applied Technology Seminar",
      date: "March 18, 2025",
      location: "NN 108, Senator Burns Building | SAIT Main Campus",
      image: "/seminar.jpg",
      text: "Join us for an exclusive and insightful Technology Seminar where leading industry experts will share groundbreaking innovations, emerging trends, and in-depth analyses of the latest advancements shaping the ever-evolving tech landscape.",
    },
    {
      title: "Zen Den | Origami workshop",
      date: "March 19, 2025",
      location: "MB 328 - Student Zen Den - Stan Grad",
      image: "/origami.jpg",
      text: "Relax and recharge by crating beautiful paper designs in this meditative workshop. Whether you're a beginner or an experienced artist, this session offers a serene environment to explore creativity through intricate paper designs.",
    },
    {
      title: "Drop in and Learn - Exam Writing Skills",
      date: "March 18, 2025",
      location: "CA 121 - Aldred Centre | SAIT Main Campus",
      image: "/exam.jpg",
      text: "Visit us for a friendly chat with a fellow SAIT student about improving writing and presentation skills. Our peer writing specialist is knowledgeable in report writing, essay writing, planning assignments, presentation skills, and much more.",
    },
  ];
  return (
    <div className="flex-col">
      <div className="ml-6 my-4 flex">
        <UserPageMenu
          menuItems={[
            { title: "All Events", onClick: onClickAllEvents },
            { title: "My Events", onClick: onClickMyEvents },
            { title: "My Calendar", onClick: onClickMyCalendar },
          ]}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        {testEvents.slice(0, 3).map((event, index) => (
          <EventListCard
            key={index}
            title={event.title}
            date={event.date}
            location={event.location}
            image={event.image}
            text={event.text}
          />
        ))}
      </div>
    </div>
  );
}
