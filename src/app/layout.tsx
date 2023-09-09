import PrimaryNavbar from "@/components/primaryNavbar";
import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "../utils/context/AuthContext";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Loader from "../../public/images/loader.gif";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Inventory Management Site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        {" "}
        <AuthProvider>
          <Suspense fallback={<p>Loading....</p>}>
            <PrimaryNavbar />
            <main>{children}</main>
          </Suspense>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
