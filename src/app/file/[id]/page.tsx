"use client";
import Button from "@/components/Button";
import LabeledInput from "@/components/LabeledInput";
import { AuthContext } from "@/context/authContext";
import { SideBarContext } from "@/context/filesContext";
import useFile from "@/hooksTanstack/useFile";
import { FileI } from "@/util/types";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id; //file id
  const { user } = useContext(AuthContext);
  const {
    getFileById,
    getFileData,
    updateFile,
    shareFile,
    getFiles,
    deleteFile,
  } = useFile();
  const { files: sidebarFiles, setFiles: setSidebarFiles } =
    useContext(SideBarContext);
  const {
    data: files,
    isLoading: isLoadingFiles,
    isError: isErrorFiles,
  } = getFiles();

  const { isSuccess: isSuccessDeleteFile } = deleteFile;
  const {
    data: fileById,
    isError: isErrorGetFileById,
    isLoading: isLoadingGetFileById,
    isSuccess: isSuccessGetFileById,
  } = getFileById({ id });

  const { isSuccess: isSuccessUpdateFile } = updateFile;
  const { isSuccess: shareSuccess } = shareFile;
  const [textfile, setTextFile] = useState("");
  const { data: file } = getFileData(encodeURIComponent(fileById?.alias || ""));
  const [tempFile, setTempFile] = useState({
    id: fileById?.id,
    name: fileById?.name,
    data: textfile,
  });
  const router = useRouter();

  useEffect(() => {
    if (file) setTextFile(file);
    setTempFile({
      id: fileById?.id,
      name: fileById?.name,
      data: file || "",
    });
  }, [file]);

  useEffect(() => {
    if (isSuccessUpdateFile || isSuccessDeleteFile) setSidebarFiles(files);
    console.log("trigger hot reload update", { files });
  }, [isSuccessUpdateFile, isSuccessDeleteFile]);

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
          <LabeledInput
            label="file name"
            value={tempFile.name}
            onChange={(e) => {
              setTempFile({ ...tempFile, name: e.target.value });
            }}
          />
          <LabeledInput
            label="created on"
            value={new Date(fileById?.createdat || "").toString()}
            custom={"border-none"}
            disabled
          />
          <LabeledInput
            label="last modified"
            value={new Date(fileById?.updatedat || "").toString()}
            custom={"border-none"}
            disabled
          />
          <LabeledInput
            label="size"
            value={fileById?.size}
            custom={"border-none"}
            disabled
          />
        </div>
        {/* controls */}
        <div className="grid">
          <Button
            label="Share"
            color="bg-green-700 px-2 py-1 rounded-md
    text-gray-200
    hover:bg-green-500"
            onClick={() => {
              router.push("share/" + id);
            }}
          >
            share
          </Button>
          <Button
            label="Delete"
            color="bg-red-700 px-2 py-1 rounded-md
    text-gray-200
    hover:bg-red-500"
            onClick={() => {
              deleteFile.mutate(id);
              router.push("/");
            }}
          >
            delete
          </Button>
        </div>
      </div>
      {/* File output */}
      <div className="grid gap-6 w-full">
        <textarea
          className="border h-64 resize-none rounded-lg max-w-2xl w-4/5 justify-self-center focus-visible:border focus-visible:border-gray-500 p-2"
          value={tempFile.data}
          onChange={(e) => {
            setTempFile({ ...tempFile, data: e.target.value });
          }}
        />
        <div className="flex gap-6 justify-self-center">
          <Button
            label="Cancel"
            onClick={() => {
              router.push("/");
            }}
          >
            reset
          </Button>
          <Button
            label="Reset"
            onClick={() => {
              setTempFile({
                id: fileById?.id,
                data: textfile,
                name: fileById?.name,
              });
            }}
          >
            reset
          </Button>
          <Button
            label="Save"
            onClick={() => {
              const temp = new File([tempFile.data], "updated.unl", {
                type: "",
              });
              const formdata = new FormData();
              formdata.append("name", tempFile?.name || "");
              formdata.append("id", tempFile.id?.toString() || "");
              formdata.append("file", temp);
              updateFile.mutate(formdata);
            }}
          >
            save
          </Button>
        </div>
      </div>
      {files?.map((file: FileI) => (
        //testing tanstack invalidate on same page
        <div key={file.id}>{file.name}</div>
      ))}
    </div>
  );
}
