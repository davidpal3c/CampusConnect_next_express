import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthContextProvider } from "./_utils/auth-context";


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
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
