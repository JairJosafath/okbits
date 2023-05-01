import { API_ENDPOINT } from "@/service/dev";
import { FileI } from "@/util/types";
import { useEffect, useState } from "react";
import useFetch from "./useFetch";

export default function useFile() {
  const [file, setFile] = useState<FileI>({ id: 0 });
  const [upload, setUpload] = useState<FileI>();
  const [download, setDownload] = useState<FileI>({ id: 0 });
  const [update, setUpdate] = useState<FileI>({ id: 0 });
  const [_delete, setDelete] = useState<FileI>({ id: 0 });
  const { setReq, data, isLoading, isError } = useFetch();

  function uploadFile(upload: FileI) {
    console.log(upload, "upload");
    // setReq({
    //   input: `${API_ENDPOINT}/files/add`,
    //   init: {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formdata),
    //   },
    // });
  }

  useEffect(() => {
    console.log("result uploading file", data);
  }, [data]);

  useEffect(() => {
    if (upload) uploadFile(upload);
  }, [upload]);
  return {
    file,
    setUpload,
    setDownload,
    setDelete,
    setUpdate,
  };
}
