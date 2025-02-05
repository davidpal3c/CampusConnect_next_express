//Student / Alumni login Page
'use client';

import Link from "next/link";
import { useState } from "react";
import { FaRegUserCircle, } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { useUserAuth } from "@/app/_utils/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LoginLoader from "@/app/components/LoginLoader";
import { auth } from "@/app/_utils/firebase";
import StudentPageBtn from "@/app/components/Buttons/StudentPageButton/StudentLoginBtn";



export default function AdminLogin() {

    const { googleSignIn, signOutFirebase } = useUserAuth();
    const [backdrop, setBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);

    const [loaderBackdrop, setLoaderBackdrop] = useState(false);
    const [authRoleType, setAuthRoleType] = useState("");
    const [userResultProp, setUserResultProp] = useState(false);


    const handleLoaderClose = () => {
        setBackdrop(false);
        setLoading(false);
    };

    const handleLoaderOpen = () => {
        setBackdrop(true);
        setLoading(true);
    };


    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    async function handleSignIn() {
        console.log("handle sign in clicked");
        handleLoaderOpen();
        await delay(500);

        const currentUser = auth.currentUser;
        if (currentUser) {
            // console.log("Existing session found, signing out first...", currentUser);
            await signOutFirebase();
        }

        try {
            const result = await googleSignIn();
            setUserResultProp(result);

            setAuthRoleType("user");
            setLoaderBackdrop(true);
            handleLoaderClose();
            
        } catch (error: any) {
            console.log("Sign In error: ", error);
            signOutFirebase();  
            handleLoaderClose();
        }
    }


    // checks if window is closed to sign out the user 
    useEffect(() => {
        const interval = setInterval(() => {

            if (window.closed) {
                signOutFirebase();
                handleLoaderClose();
                clearInterval(interval);
            }
        }, 1);

        return () => clearInterval(interval);
    }, []);


    return (
      <div>
        <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {loaderBackdrop && <LoginLoader result={userResultProp} backdrop={setLoaderBackdrop} routeType={authRoleType}/>}

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
              {/* <form className="flex flex-col"> */}
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
                      // onClick={handleSignIn}

                      text="Sign in"
                    />
                  </div>
                  <button
                    onClick={handleSignIn}
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
              {/* </form> */}
            </div>
            <div className=" items-center">
              <StudentPageBtn text="Don't have an account?" />
            </div>
          </div>
        </div>
      </div>
    );


    // return (
    //     <div className="bg-blue-gradient flex flex-col md:flex-row h-screen">
    //         <Backdrop
    //             sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    //             open={backdrop}
    //         >
    //             <CircularProgress color="inherit" />
    //         </Backdrop>
    //         {loaderBackdrop && <LoginLoader result={userResultProp} backdrop={setLoaderBackdrop} routeType={authRoleType}/>}

    //         {/* First Column */}
    //         <div className="bg-white border-2 h-full shadow-lg w-full md:w-1/3 flex-col justify-center px-12 my-auto hidden md:block">
    //             <img
    //                 src="/sait-logo.png"
    //                 alt="Campus Connect"
    //                 className=" rounded-lg m-3 w-80 md:h-auto mx-auto mt-32"
    //             />
    //             <Link href="/admin/register">
    //                 <h2 className="text-lg text-left mt-36 text-saitBlue underline tracking-wide">Not Registered?</h2>
    //             </Link>
    //             {/* <p className="text-md mt-2 text-left text-gray-400">  out of contrast original*/}
    //             <p className="text-md mt-2 mb-3 text-left text-gray-800">
    //                 Register for an account to access the admin portal, where you can manage your campus's events and clubs.
    //             </p>
    //         </div>

    //         {/* Main Column */}
    //         <div className="w-full md:w-2/3 flex flex-col items-center justify-center bg-red-gradient p-8">
    //             <h1 className="text-saitWhite text-4xl mb-20 font-bold tracking-wider">CAMPUS CONNECT LOGIN</h1>
    //             <div className="flex flex-col space-y-10">
    //                 {/* EMAIL INPUT */}
    //                 <div className="flex flex-row justify-center items-center bg-saitWhite bg-opacity-25 rounded-xl py-2 px-8 shadow-lg">
    //                     <FaRegUserCircle size={30}
    //                         // className="mr-2 text-saitBlue"       // original : out of contrast with blue gradient
    //                         className="mr-2 text-slate-900"
    //                     />
    //                     <input
    //                         type="email"
    //                         id="email"
    //                         name="email"
    //                         placeholder="Email"
    //                         aria-label="Email"
    //                         // className="w-70 font-light text-saitWhite placeholder-white bg-transparent my-1 ml-4 focus:outline-none focus:border-transparent"   // original  : out of contrast with blue gradient
    //                         className="w-70 font-normal text-saitWhite placeholder-slate-900 bg-transparent my-1 ml-4 focus:outline-none focus:border-transparent"
    //                     />
    //                 </div>

    //                 {/* PASSWORD INPUT */}
    //                 <div>
    //                     <div className="flex flex-row justify-center items-center bg-saitWhite bg-opacity-25 rounded-xl -mt-3 py-2 px-8 shadow-lg">
    //                         <MdOutlinePassword size={30}
    //                             // className="mr-2 text-saitBlue"       // original : out of contrast with blue gradient
    //                             className="mr-2 text-slate-900"
    //                         />
    //                         <input
    //                             type="password"
    //                             id="password"
    //                             name="password"
    //                             placeholder="Password"
    //                             aria-label="Password"
    //                             // className="w-70 font-light text-saitWhite placeholder-saitWhite bg-transparent my-1 ml-4 focus:outline-none appearance-none"  // original : out of contrast with blue gradient       
    //                             className="w-70 font-normal text-saitWhite placeholder-slate-900 bg-transparent my-1 ml-4 focus:outline-none appearance-none"
    //                         />
    //                     </div>
    //                 </div>

    //                 {/* Forgot Password and Login Button */}
    //                 <div className="flex justify-between items-center">
    //                     <a href="#"
    //                         // className="text-saitWhite text-md underline"         // original : out of contrast with blue gradient    
    //                         className="text-saitWhite text-md underline hover:text-saitWhite"
    //                     >Forgot Password?</a>
    //                     <button
    //                         type="submit"
    //                         // className="bg-saitBlue text-saitWhite font-bold py-2 px-8 rounded-xl hover:bg-opacity-90 focus:outline-none"     // original : out of contrast with blue gradient        
    //                         className="bg-saitBlue text-saitWhite font-bold py-2 px-8 rounded-xl hover:bg-opacity-60 focus:outline-none"
    //                     >
    //                         Login Now
    //                     </button>
    //                 </div>

    //                 {/* Microsoft Login */}
    //                 <div className="flex flex-col items-center space-y-5">
    //                     <div>
    //                         <p
    //                             // className="text-saitWhite text-md"       // original : out of contrast with blue gradient    
    //                             className="text-saitWhite text-md"
    //                         >Or Sign in with</p>
    //                     </div>

    //                     <button className="bg-saitBlue h-24 w-full flex flex-row justify-center items-center hover:bg-opacity-15 border-white border-2 rounded-2xl shadow-xl">
    //                         <img src="/microsoft.png" alt="Microsoft Logo" className="w-24 h-auto  " />
    //                         <p
    //                             // className="w-40 font-light text-saitWhite -ml-16"        // original : out of contrast with blue gradient    
    //                             className="w-40 font-normal text-saitWhite -ml-16"
    //                         >Microsoft</p>
    //                     </button>

    //                     <button onClick={handleSignIn} className="h-24 w-full flex flex-row justify-center items-center bg-saitBlue hover:bg-opacity-15 border-white border-2 rounded-2xl p-3 cursor-pointer shadow-xl">
    //                         <img src="/google-logo.png" alt="Google Logo" className="w-10 h-auto " />
    //                         <p
    //                             // className=" w-40 font-light text-saitWhite"
    //                             className=" w-40 font-normal text-saitWhite"
    //                         >{loading ? "Signing in..." : "Sign in with Google"}</p>
    //                     </button>                       
    //                 </div>
                    
    //             </div>



    //         </div>
    //         {/* Additional Info for Small Screens */}
    //         <div className="block md:hidden my-12 px-12 mx-auto text-center">
    //             <Link href="/admin/register">
    //                 <h2 className="text-lg text-saitWhite underline tracking-wide hover:text-opacity-60">Not Registered?</h2>
    //             </Link>
    //             <p className="text-md mt-2 text-saitWhite">
    //                 Register for an account to access the admin portal, where you can manage your campus's events and clubs.
    //             </p>
    //         </div>
    //     </div>
    // );
}
