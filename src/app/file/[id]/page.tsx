"use client";
import Button from "@/components/Button";
import LabeledInput from "@/components/LabeledInput";
import useFile from "@/hooksTanstack/useFile";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const { getFileById } = useFile();
  const { data: fileById } = getFileById(id);
  const [textfile, setTextFile] = useState("");

  useEffect(() => {
    if (fileById?.data_unl) {
      const temp = fileById?.data_unl;
      console.log(fileById?.data_unl);
      const blob = new Blob([temp]);
      const txt = new FileReader().readAsText(blob);
      console.log(txt, "txt");
    }
  }, [fileById?.data_unl]);
  return (
    <div className="bg-gray-0 w-full grid auto-rows-min gap-6 p-6 ">
      {/* File info and controls */}
      <div className="w-full flex justify-around">
        {/* info */}
        <div className="grid gap-2">
          <LabeledInput label="file name" value={fileById?.name} />
          <LabeledInput
            label="created on"
            value={new Date(fileById?.createdat || "").toString()}
          />
          <LabeledInput
            label="last modified"
            value={new Date(fileById?.updatedat || "").toString()}
          />
          <LabeledInput label="size" value={fileById?.size} />
        </div>
        {/* controls */}
        <div className="grid">
          <Button
            label="Share"
            color="bg-green-700 px-2 py-1 rounded-md
    text-gray-200
    hover:bg-green-500"
          >
            share
          </Button>
          <Button
            label="Delete"
            color="bg-red-700 px-2 py-1 rounded-md
    text-gray-200
    hover:bg-red-500"
          >
            delete
          </Button>
        </div>
      </div>
      {/* File output */}
      <div className="grid gap-6 w-full">
        <textarea
          className="border h-64 resize-none rounded-lg max-w-2xl w-4/5 justify-self-center focus-visible:border focus-visible:border-gray-500 p-2"
          value={""}
        />
        <div className="flex gap-6 justify-self-center">
          <Button label="Cancel">cancel</Button>
          <Button label="Save">save</Button>
        </div>
      </div>
    </div>
  );
}
