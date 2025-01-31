//Student / Alumni login Page

"use client";
import { useState } from "react";
import { useUserAuth } from "@/app/_utils/auth-context";
import StudentPageBtn from "@/app/components/Buttons/StudentPageButton/StudentLoginBtn";

export default function StudentLogin() {
  const { googleSignIn, getIdToken } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  function handleSignIn(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
  }

  const handleLoaderOpen = () => {
    setBackdrop(true);
    setLoading(true);
  };

  const handleLoaderClose = () => {
    setBackdrop(false);
    setLoading(false);
  };

  async function handleGoogleSignIn(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    handleLoaderOpen();

    try {
      const result = await googleSignIn();
      // console.log("Sign In result: ", result);
      console.log("User: ", result.user);

      const userInfo = {
        email: result.user.email,
      };

      //backend api call
      const token = await getIdToken();
      console.log(token);

      // const response = await axios.post(`http://localhost:8080/api/auth/login`, {
      //     token,
      //     email: userInfo,
      // } , {
      //     headers: {
      //         "Content-Type": "application/json",
      //     },
      // });
      console.log(
        `API endpoint: ${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`
      );
      // console.log(response.data);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, userInfo }),
        }
      );

      handleLoaderClose();
      console.log("Login successful:", response);
    } catch (error) {
      console.log("Sign In error: ", error);
      // console.error("Login failed:", error.response?.data || error.message);
      handleLoaderClose();
    }
  }

  return (
    <div>
      <img
        src="/sait-logo.png"
        alt="Campus Connect"
        className="w-20 h-20 my-10 mx-10 absolute"
      />
      <div className="flex flex-column h-screen">
        <div className="flex grow flex-col items-center justify-center ">
          <img
            src="/student-login.png"
            alt="Campus Connect"
            className="w-96 h-96 mb-20 sm:visible"
          />
        </div>

        <div className="flex grow flex-col justify-center items-center">
          <div className="flex flex-col w-100 h-100 px-16 py-4 mb-8 rounded-lg bg-saitLightBlueOg">
            <div className="text-3xl text-white px-6 py-6 text-center">
              Welcome Back
            </div>
            <form className="flex flex-col">
              <label className=" text-white pb-1">Email</label>
              <input
                className="py-2 rounded-md mb-2"
                type="text"
                id="email"
                name="email"
                placeholder=" jane.doe@edu.sait.ca"
              />
              <label className=" text-white pb-1">Password</label>
              <input
                className="py-2 rounded-md mb-2"
                type="text"
                id="password"
                name="password"
                placeholder=" ********"
              />
              <div className="text-right mb-2 text-xs">
                Forgot the password?
              </div>
              <div className="flex mb-12">
                <input type="checkbox"></input>
                <label className="ml-4"> Remember me </label>
              </div>
              <div className="flex flex-col items-center pb-6">
                <div className="mb-8">
                  <StudentPageBtn
                    onClick={handleSignIn}
                    bgColor="saitLightBlue"
                    text="Sign in"
                  />
                </div>
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex flex-row justify-center items-center bg-saitWhite hover:bg-opacity-50 focus:outline-none rounded-xl p-2 cursor-pointer shadow-xl"
                >
                  <img
                    src="/google-logo.png"
                    alt="Google Logo"
                    className="w-8 "
                  />
                  <p className=" w-40 font-normal text-saitBlack ">
                    {loading ? "Signing in..." : "Sign in with Google"}
                  </p>
                </button>
              </div>
            </form>
          </div>
          <div className=" items-center">
            <StudentPageBtn onClick={handleSignIn} text="Don't have an account?" />
          </div>
        </div>
      </div>
    </div>
  );
}