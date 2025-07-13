//Address is different everytime I deploy the contract
//0x5FbDB2315678afecb367f032d93F642f64180aa3

import ChatAppJSON from "./ChatApp.json";

export const ChatAppAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const ChatAppABI = ChatAppJSON.abi;

import {
  Users,
  MessageCircle,
  Mail,
  Settings,
  HelpCircle,
  FileText,
  LogOut,
} from "lucide-react";

export const MENU_ITEMS = [
  { label: "All Users", href: "/allUsers", icon: Users },
  { label: "Chat", href: "/chat", icon: MessageCircle },
  { label: "Contact", href: "/contact", icon: Mail },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
  { label: "Terms", href: "/terms", icon: FileText },
  { label: "Logout", href: "/logout", icon: LogOut },
];
