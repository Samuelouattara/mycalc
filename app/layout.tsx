import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/dashboardLayout/Navbar";
import MainContent from "@/components/dashboardLayout/MainContent";
import SideBar from "@/components/dashboardLayout/SideBar";
import NextTopLoader from "nextjs-toploader";

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
      <body className={`${poppins.variable} font-sans antialiased bg-white`}>
        <NextTopLoader 
          color="#1C274D"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #1C274D,0 0 5px #1C274D"
        />
        <div className="flex h-screen p-4 space-x-4">
          <SideBar />
          <div className="flex-1 flex flex-col space-y-4">
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
