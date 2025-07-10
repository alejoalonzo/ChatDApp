import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ChatAppProvider } from "@/Context/ChatAppContext";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Especifica los pesos que quieres
  display: "swap", // Optimización para carga rápida
});

export const metadata = {
  title: "ChatApp",
  description: "ChatApp - A decentralized chat application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans`}>
        <ChatAppProvider>{children}</ChatAppProvider>
      </body>
    </html>
  );
}
