"use client";

import Link from "next/link";

import React, { useState, useEffect } from "react";

export default function Home() {

  const [message, setMessage] = useState("Loading...")
  const [people, setPeople] = useState([]);
  const [user, setUser] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`);
      const data = await response.json();
      // console.log(data);
      setPeople(data);
      setMessage("Data fetched from Backend successfully");
    } catch (error) {
      console.error(error);
      setMessage("Error fetching data");
    }
  }

  const fetchUser = async (userId: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`);
      const data = await response.json();
      // console.log(data);
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
    // fetch("http://localhost:8080/api/users").then(
    //   response => response.json()
    // ).then(
    //   data => {
    //     console.log(data);
    //     setPeople(data);
    //   })s
    fetchUser(2);
  }, []);

  return (
    <div className="bg-saitLightBlue min-h-screen flex items-center justify-center">
      <div className="bg-white border-4 rounded-lg border-saitBlue shadow-lg w-11/12 md:w-1/2 lg:w-1/3 px-6 py-8">
        <img
          src="/sait-logo.png"
          alt="Campus Connect"
          className="rounded-lg mb-6 mx-auto w-40 md:w-60"
        />
        <Link href="/admin/login">
          <h1 className="text-center text-lg bg-saitLightBlue rounded-xl border-black font-semibold mb-8 text-saitWhite hover:underline">
            Go to Admin Login Page
          </h1>
        </Link>
        <Link href="/student/login">
          <h1 className="text-center text-lg bg-saitLightBlue rounded-xl border-black font-semibold text-saitWhite hover:underline">
            Go to Student Login Page
          </h1>
        </Link>
      </div>
      <div className="bg-white border-4 rounded-lg border-saitBlue shadow-lg w-11/12 md:w-1/2 lg:w-1/3 px-6 py-8">
        <h1>Hello there</h1>
        <p>{message ? message : null}</p>
        <ul>
          {people.map((person, index) => {
            return (
              <div key={index}>
                <li>{person.id}</li>
                <li>{person.name}</li>
                <li>{person.age}</li>
              </div>
            )
          })}
        </ul>
        <p className="mt-4">Selected User:</p>
        <p>{JSON.stringify(user)}</p>
      </div>
    </div>
  );
}
