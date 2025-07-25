import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/dashboardLayout/Navbar";
import MainContent from "@/components/dashboardLayout/MainContent";
import SideBar from "@/components/dashboardLayout/SideBar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MyCalc - Calculateur intelligent",
  description: "Application de calcul moderne et intuitive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <div className="flex h-screen bg-gray-50">
          <SideBar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <MainContent>
              {children}
            </MainContent>
          </div>
        </div>
      </body>
    </html>
  );
}
