"use client";
import { useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import { FileI, UserI } from "@/util/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useFile from "@/hooksTanstack/useFile";
import { SideBarContext } from "@/context/filesContext";
import Status from "@/components/Status";
import { StatusContext } from "@/context/statusContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const [user, setUser] = useState<UserI>({ username: "", id: 0 });
  const router = useRouter();
  const [status, setStatus] = useState<{ status: string; msg: string }>({
    status: "",
    msg: "",
  });

  useEffect(() => {
    async function autoLogin() {
      const response = await fetch("http://localhost:3001/auto-signin", {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 401) {
        router.push("/auth");
        return;
      }
      const { user } = await response.json();
      if (user.id) {
        setUser(user);
      } else if (!user) {
        router.push("/auth");
      }
    }
    if (user.id === -1) {
      router.push("/auth");
    } else if (!user.id) autoLogin();
  }, [user.id]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <>
            {/* Topbar */}

            <AuthContext.Provider value={{ user, setUser }}>
              <StatusContext.Provider value={{ status, setStatus }}>
                <Topbar />
                <div className="flex h-full w-full top-0 left-0 absolute pt-10">
                  {children}
                </div>
              </StatusContext.Provider>
            </AuthContext.Provider>
          </>
          <Status status={status} setStatus={setStatus} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
