import Image from "next/image";
import { Inter } from "next/font/google";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="h-screen bg-black">
      {/* Topbar */}
      <Topbar />
      <div className="flex h-full w-full top-0 left-0 absolute pt-10">
        {/* Sidebar */}
        <Sidebar />
        {/* Main */}
        <Main />
      </div>
    </main>
  );
}
