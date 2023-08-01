import PrimaryNavbar from "@/components/primaryNavbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "../utils/AuthContext";
// import { ProtectedRoutes } from "@/utils/protectedRoutes";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <AuthProvider>
          {/* <ProtectedRoutes> */}
          <PrimaryNavbar />
          <main>{children}</main>
          {/* </ProtectedRoutes> */}
        </AuthProvider>
      </body>
    </html>
  );
}
