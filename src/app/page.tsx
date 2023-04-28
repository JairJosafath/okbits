import Image from "next/image";
import { Inter } from "next/font/google";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      {/* Main */}
      <Main />
    </>
  );
}
