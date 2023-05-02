"use client";

import useFile from "@/hooksTanstack/useFile";
import { useQueryClient } from "@tanstack/react-query";
import { DragEvent, useEffect, useRef, useState } from "react";
// import {};

export default function Main() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState<File>();
  const { uploadFile, getFiles, shareFile } = useFile();
  const { isError, isLoading, isSuccess } = uploadFile;

  const queryClient = useQueryClient();
  function getData(event: DragEvent<HTMLDivElement>) {
    const dataTransfer = event.dataTransfer;
    const files = dataTransfer.files;
    setData(files[0]);
  }
  // useEffect(() => {
  //   console.log("runs sidebar datafetch");
  // }, [isSuccess]);
  // useEffect(() => {
  //   console.log({ isLoading, isSuccess });
  // }, [isLoading, isSuccess]);
  useEffect(() => {
    if (data) {
      const formData = new FormData();
      formData.append("file", data);
      uploadFile.mutate(formData);
    }
  }, [data]);

  return (
    <div className="flex-1  bg-gray-0 flex justify-center">
      <input
        hidden
        type="file"
        accept=".unl"
        ref={fileInput}
        onChange={(e) => {
          setData(e.currentTarget?.files?.[0]);
        }}
      />
      <div
        className={`
        flex-1
      h-52
      max-w-2xl
      bg-gray-200
      mx-7
      my-10
      border-2
      border-gray-400
      flex
      justify-center
      items-center
      hover:bg-gray-400
      hover:cursor-pointer
      rounded-lg
      border-dashed
      hover:text-white
      active:scale-95
      transitions-all
      duration-300
      ${animate && "animate-drop-it"}
      `}
        onClick={() => fileInput.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault();
          setAnimate(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setAnimate(true);
        }}
        onDragEnd={(e) => {
          e.preventDefault();
          setAnimate(false);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setAnimate(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setAnimate(false);
          getData(e);
        }}
      >
        <p>Drop Your File Here</p>
      </div>
    </div>
  );
}
