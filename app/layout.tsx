import ClientLayout from "./clientLayout";
import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Xeoverse",
  description: "Welcome to the Xeoverse.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children}
          <Analytics />
        </ClientLayout>
      </body>
    </html>
  );
}
