import PrimaryNavbar from "@/components/primaryNavbar";
import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "../utils/context/AuthContext";
import { ProtectedRoutes } from "@/utils/context/protectedRoutes";
import { Toaster } from "react-hot-toast";

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
          <ProtectedRoutes>
            <PrimaryNavbar />
            <main>{children}</main>
            <Toaster />
          </ProtectedRoutes>
        </AuthProvider>
      </body>
    </html>
  );
}
