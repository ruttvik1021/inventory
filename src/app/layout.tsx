import PrimaryNavbar from "@/components/primaryNavbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
        {/* <I18nextProvider i18n={i18n}> */}
        <PrimaryNavbar />
        <main>{children}</main>
        {/* </I18nextProvider> */}
      </body>
    </html>
  );
}
