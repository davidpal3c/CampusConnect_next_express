"use client";
import { useUserData } from "@/app/_utils/userData-context";
import { Camera } from "lucide-react";
import Image from "next/image";

export default function Profile() {
  const { userData } = useUserData();
  return (
    <main className="text-saitBlack flex flex-col items-center">
      <div className="flex flex-col md:flex-row justify-between items-center w-2/3 gap-4 md:gap-0 mt-4">
        <div className="flex gap-4 items-center">
          <div className="relative w-32 h-32">
            <Image
              src="https://i.ibb.co/5g3zzK2s/avatar-generic.jpg"
              alt="user-avatar-photo"
              width={100}
              height={100}
              className="rounded-full object-cover w-full h-full"
            />
            <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md">
              <Camera className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-4xl">Jane Lee</div>
            <div className="text-xl text-saitBlue">jane@gmail.com</div>
          </div>
        </div>
        <button className="bg-saitWhite text-saitRed border-2 border-saitRed w-14 h-8 rounded-md m-4">
          Edit
        </button>
      </div>
      {[
        ["First Name", "Last Name"],
        ["Program", "Email"],
        ["Old Password", "New Password"],
      ].map(([label1, label2]) => (
        <div
          key={label1}
          className="flex flex-col md:flex-row justify-between md:w-2/3 gap-4 mt-6"
        >
          <div className="flex flex-col gap-1 flex-1">
            <label>{label1}</label>
            <input className="border p-2 rounded"></input>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label>{label2}</label>
            <input className="border p-2 rounded"></input>
          </div>
        </div>
      ))}
      <div className="md:w-2/3 flex justify-end my-6">
        <button className="bg-saitRed text-saitWhite w-14 h-8 rounded-md mt-6">
          Save
        </button>
      </div>
    </main>
  );
}
