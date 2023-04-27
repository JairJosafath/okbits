"use client";

import { DragEvent } from "react";

export default function Main() {
  function getData(event: DragEvent<HTMLDivElement>) {
    const dt = event.dataTransfer;
    const files = dt.files;
    console.log(files[0].name);
  }
  return (
    <div className="flex-1  bg-blue-200">
      <div
        className="
      h-52
      bg-green-400
      mx-7
      my-10
      border-2
      border-gray-500
      flex
      justify-center
      items-center
      hover:bg-slate-700
      hover:cursor-pointer
      rounded-lg
      border-dashed
      hover:text-white
      "
        onDragEnter={(e) => {
          e.preventDefault();
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnd={(e) => {
          e.preventDefault();
        }}
        onDragLeave={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          getData(e);
        }}
      >
        <p>Drop Your File Here</p>
      </div>
    </div>
  );
}
