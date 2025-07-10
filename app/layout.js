import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatAppProvider } from "@/Context/ChatAppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ChatApp",
  description: "ChatApp - A decentralized chat application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ChatAppProvider>
          {children}
        </ChatAppProvider>
      </body>
    </html>
  );
}
