import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthContextProvider } from "@/app/_utils/auth-context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminUserProvider } from '@/app/_utils/adminUser-context';


const inter = localFont({
  src: [
    { path: "./assets/fonts/Inter-Bold.ttf", weight: "700" },
    { path: "./assets/fonts/Inter-SemiBold.ttf", weight: "600" },
    { path: "./assets/fonts/Inter-Regular.ttf", weight: "400" },
    { path: "./assets/fonts/Inter-Light.ttf", weight: "300" },
  ],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Campus Connect",
  description: "A platform for students to connect with their campus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthContextProvider>
          <AdminUserProvider>
            <ToastContainer 
              position="top-center" 
              autoClose={3000} 
              hideProgressBar={false} 
              newestOnTop
              rtl={false}               // Support for right-to-left text
              closeOnClick 
              pauseOnHover 
              draggable 
              theme="colored"         
            />
            {children}
          </AdminUserProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
