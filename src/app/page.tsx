"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/authContext";
import { API } from "./api/file";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* Main */}

      {user && <Main />}
    </>
  );
}
