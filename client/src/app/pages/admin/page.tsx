"use client";

import { useUserAuth } from "@/app/_utils/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { user } = useUserAuth();
  const [isClient, setIsClient] = useState(false);                // dummy state to track code is running client-side
  const router = useRouter();

  const [authorizedUser, setAuthorizedUser] = useState(false);  

  const validateUser = async () => {
    try {
      if (user?.role === "Admin" || !user.role) {
        setAuthorizedUser(true);
      } else {
        setAuthorizedUser(false);
      }
    } catch (error) {
      console.error("Error validating user: ", error);
    }
  }  

  useEffect(() => {
    setIsClient(true);                                          // set to true only after component has mounted on the client
  }, []);

  useEffect(() => {
    if (user) {
      validateUser();
      return;
    }

    if (isClient && !user) {
      const timer = setTimeout(() => {
        router.push("/admin/login");
      }, 5000);

      return () => clearTimeout(timer);        
    }
  }, [user, isClient, router]);


  if (!isClient) {
    return null;                                                // prevent rendering until the component is mounted on the client side
  }

  return (
    authorizedUser ? (
      <main className="min-h-screen bg-gray-100 text-black m-4">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard - Overview</h1>
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {/* App Logins Chart */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">App Logins</h2>
            {/* Example Chart Placeholder */}
            <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
              <span className="text-gray-500">[ Chart Placeholder ]</span>
            </div>
          </div>

          {/* Articles Section */}
          <div className="bg-white p-4 rounded-xl shadow-md flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Articles</h2>
            <div className="flex-1 bg-blue-600 text-white rounded-md p-4 mb-4">
              <h3 className="font-bold">Upon Arrival in Canada</h3>
              <p className="text-sm">Published: 11/1/2024</p>
              <button className="bg-blue-800 text-white rounded-md mt-2 px-3 py-1 hover:bg-blue-700">
                Update Article
              </button>
              <button className="bg-red-500 text-white rounded-md mt-2 px-3 py-1 hover:bg-red-600">
                Delete Article
              </button>
            </div>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
          </div>

          {/* Notifications Section */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            <div className="flex items-center justify-center h-48">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="absolute w-full h-full" viewBox="0 0 36 36">
                  <circle
                    className="text-gray-200"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth="3"
                    cx="18"
                    cy="18"
                    r="15.9155"
                  />
                  <circle
                    className="text-blue-500"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth="3"
                    strokeDasharray="60, 100"
                    cx="18"
                    cy="18"
                    r="15.9155"
                  />
                </svg>
                <span className="text-xl font-bold">612/1024</span>
              </div>
            </div>
            <p className="text-center text-gray-500 mt-2">
              Students that read the last "Birthday Bash" notification
            </p>
          </div>

          {/* Events Section */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Events</h2>
            <div className="flex items-center justify-center h-48">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="absolute w-full h-full" viewBox="0 0 36 36">
                  <circle
                    className="text-gray-200"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth="3"
                    cx="18"
                    cy="18"
                    r="15.9155"
                  />
                  <circle
                    className="text-purple-500"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth="3"
                    strokeDasharray="20, 100"
                    cx="18"
                    cy="18"
                    r="15.9155"
                  />
                </svg>
                <span className="text-xl font-bold">17/85</span>
              </div>
            </div>
            <p className="text-center text-gray-500 mt-2">
              Spots taken for the next "Wings and Sing" event
            </p>
          </div>

          {/* Permission Requests */}
          <div className="bg-white p-4 rounded-xl shadow-md col-span-1 xl:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Permission Requests</h2>
            <div className="space-y-4">
              {/* Request 1 */}
              <div className="flex justify-between items-center p-2 border rounded-md">
                <div>
                  <p className="font-bold">Jaeuen Lee</p>
                  <p className="text-sm text-gray-500">10 min ago</p>
                  <p>Permission to create the UI Design Group.</p>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    ✓
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    ✕
                  </button>
                </div>
              </div>

              {/* Request 2 */}
              <div className="flex justify-between items-center p-2 border rounded-md">
                <div>
                  <p className="font-bold">Jawad Latif</p>
                  <p className="text-sm text-gray-500">30 min ago</p>
                  <p>Permission to create an Admin account.</p>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    ✓
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    ✕
                  </button>
                </div>
              </div>

              {/* Request 3 */}
              <div className="flex justify-between items-center p-2 border rounded-md">
                <div>
                  <p className="font-bold">David Palacios</p>
                  <p className="text-sm text-gray-500">40 min ago</p>
                  <p>Permission to create the Latin Culture Group.</p>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    ✓
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    ) : (
      <main className="bg-slate-800 flex flex-row justify-center items-center w-full h-full md:flex-row md:items-center z-50 top-0 left-0 fixed">
        <p className="text-white">You must Log In as an Administrator to view this page. Redirecting to login...</p>
      </main>
    )
  );
}
