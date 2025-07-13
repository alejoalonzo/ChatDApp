import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ChatAppProvider } from "@/Context/ChatAppContext";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "ChatApp",
  description: "ChatApp - A decentralized chat application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans">
        <ChatAppProvider>{children}</ChatAppProvider>
      </body>
    </html>
  );
}
