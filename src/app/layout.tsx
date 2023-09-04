import PrimaryNavbar from "@/components/primaryNavbar";
import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "../utils/context/AuthContext";
import { Toaster } from "react-hot-toast";
import CheckAuth from "@/utils/checkAuth";

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
        <AuthProvider>
          <PrimaryNavbar />
          <CheckAuth>
            <main>{children}</main>
          </CheckAuth>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
