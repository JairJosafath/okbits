"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
interface Props {
  status: { status: string; msg: string };
  setStatus: Dispatch<SetStateAction<{ status: string; msg: string }>>;
}
export default function Status({ status, setStatus }: Props) {
  const statusStyles =
    status.status === "loading"
      ? "bg-orange-100 animate-pulse"
      : status.status === "success"
      ? " bg-green-100"
      : status.status === "failed"
      ? " bg-red-100 animate-drop-it"
      : status.status === "fade"
      ? "opacity-0 transition-all duration-1000"
      : "hidden";

  useEffect(() => {
    setTimeout(() => {
      setStatus({ status: "", msg: "" });
    }, 3000);
  }, [status.status]);
  return (
    <div
      className={
        `absolute top-[45px] h-[40px] w-[100px] left-1/2 
      translate-x-[-50px] bg-blue-100 shadow-lg
    rounded-xl flex justify-center items-center transition-all duration-300
    ` + statusStyles
      }
    >
      <p className={"text-gray-600 text-center font-bold" + statusStyles}>
        {status.status}
      </p>
    </div>
  );
}
