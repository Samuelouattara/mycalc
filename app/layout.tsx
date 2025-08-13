import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/dashboardLayout/Navbar";
import MainContent from "@/components/dashboardLayout/MainContent";
import SideBar from "@/components/dashboardLayout/SideBar";
import SidebarInitializer from "@/components/SidebarInitializer";
import NextTopLoader from "nextjs-toploader";
import AuthLayoutWrapper from "@/components/AuthLayoutWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OuattCALC? - Calculateur intelligent",
  description: "Application de calcul moderne et intuitive",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`${poppins.variable} font-sans antialiased bg-white mobile-optimized`}>
        <NextTopLoader 
          color="#1c284dff"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #1C274D,0 0 5px #1C274D"
        />
        <AuthLayoutWrapper>
          {children}
        </AuthLayoutWrapper>
      </body>
    </html>
  );
}
