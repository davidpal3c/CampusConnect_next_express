import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthContextProvider } from "@/app/_utils/auth-context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserDataProvider } from '@/app/_utils/userData-context';


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
  title: "CampusConnect",
  description: "A platform for students and alumni to connect with their campus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased` }>
        <UserDataProvider>
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
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </UserDataProvider>
      </body>
    </html>
  );
}
