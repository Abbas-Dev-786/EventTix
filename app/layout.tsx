import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import { headers } from "next/headers"; // added
import ContextProvider from "@/context";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Eventix",
  description: "Eventix is a platform for event management.",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = headers();
  const cookies = headersObj.get("cookie");

  return (
    <html lang="en">
      <body className={poppins.variable}>
        <Toaster />
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}
