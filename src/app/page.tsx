"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { API } from "./api/axios";
import useFile from "@/hooksTanstack/useFile";
import { FileI } from "@/util/types";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user } = useContext(AuthContext);

  const {
    deleteFile,
    useSearchFiles: searchFiles,
    useGetFiles: getFiles,
    uploadFile,
  } = useFile();
  const { data: dataFiles } = getFiles();
  const [hotFiles, setHotFiles] = useState<FileI[]>(dataFiles); //workaround for inconsistent updates using invalidates after upload query
  useEffect(() => {
    if (uploadFile.status === "success")
      if (hotFiles) setHotFiles([...hotFiles, uploadFile?.data?.result]);
  }, [uploadFile.status]);

  useEffect(() => {
    setHotFiles(dataFiles);
  }, [dataFiles]);

  return (
    <>
      {/* Main */}
      <Sidebar
        deleteFile={deleteFile}
        dataFiles={hotFiles}
        searchFile={searchFiles}
      />
      <Main uploadFile={uploadFile} dataFiles={dataFiles} />
    </>
  );
}
