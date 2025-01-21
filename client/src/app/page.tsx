"use client";

import Link from "next/link";

export default function Home() {


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
    </div>
  );
}
