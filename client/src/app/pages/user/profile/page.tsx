"use client";
import { useUserData } from "@/app/_utils/userData-context";
import Image from "next/image";
import { useState } from "react";

export default function Profile() {
  const { userData }: { userData: any } = useUserData();
  let image = userData?.image_url;
  let firstName = userData?.first_name;
  let lastName = userData?.last_name;
  let email = userData?.email;
  let program = userData?.studentFields.Program.name;
  const [isEditable, setIsEditable] = useState(false);

  return (    
    <div className='w-full h-full'>
      {!userData ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Loading...</h1>
          <p className="text-lg">Please wait while we load your profile.</p>
        </div>
      ) : (
        <main className="text-saitBlack flex flex-col items-center">
          <div>
          <div className="flex flex-col md:flex-row justify-between items-center w-2/3 gap-4 md:gap-0 my-8">
            <div className="flex gap-4 items-center">
              <div className="relative w-28 h-28">
                <Image
                  src={ image || '/article-generic.png'}
                  // src={image && image !== "" ? image : null}
                  alt="user-avatar-photo"
                  width={100}
                  height={100}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-4xl">
                  {firstName + " "}
                  {lastName}
                </div>
                <div className="text-xl text-saitBlue">{email}</div>
              </div>
            </div>

            <button
              onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                setIsEditable(true);
              }}
              className={
                "bg-saitWhite  border-2 w-14 h-8 rounded-md m-2 " +
                (!isEditable
                  ? "border-saitRed text-saitRed"
                  : "border-text-gray-300 text-gray-300")
              }
              disabled={isEditable}
            >
              Edit
            </button>
          </div>
          {[
            [
              {
                label: "First Name",
                defaultValue: firstName,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  firstName = e.target.value;
                },
              },
              {
                label: "Last Name",
                defaultValue: lastName,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  lastName = e.target.value;
                },
              },
            ],
            [
              {
                label: "Email",
                defaultValue: email,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  email = e.target.value;
                },
              },
              {
                label: "Program",
                defaultValue: program,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  program = e.target.value;
                },
              },
            ],
          ].map(([input1, input2], index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between md:w-2/3 gap-4 mt-4"
            >
              <div className="flex flex-col gap-1 flex-1">
                <label>{input1.label}</label>
                <input
                  className={
                    "border p-2 rounded " + (isEditable ? "" : "text-gray-300")
                  }
                  defaultValue={input1.defaultValue}
                  onChange={input1.onChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label>{input2.label}</label>
                <input
                  className={
                    "border p-2 rounded " + (isEditable ? "" : "text-gray-300")
                  }
                  defaultValue={input2.defaultValue}
                  onChange={input2.onChange}
                  disabled={!isEditable}
                />
              </div>
            </div>
          ))}
          

          <button
            className="bg-saitRed text-saitWhite w-14 h-8 rounded-md mt-8"
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
              // TODO submit
              console.log(
                `submit: ${firstName}, ${lastName}, ${email}, ${program}`
              );
            }}
          >
            Save
          </button>
        </div>
      </main>
      )}
    </div>
  );
}
