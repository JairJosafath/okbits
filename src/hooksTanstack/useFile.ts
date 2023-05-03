import { API_ENDPOINT } from "@/service/dev";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { FileI, EmailI } from "@/util/types";
import { useContext } from "react";
import { SideBarContext } from "@/context/filesContext";
import { API } from "@/app/api/file";

export default function useFile() {
  const client = useQueryClient();
  const { files, setFiles } = useContext(SideBarContext);
  function getFiles() {
    return useQuery({
      queryKey: ["files"],
      queryFn: () => API.file.getMulti(),
    });
  }

  function getFileById({ id }: { id: string }) {
    return useQuery({
      queryKey: ["file", id],
      queryFn: () => API.file.getOne(id),
    });
  }
  function getFileData(filename: string) {
    return useQuery({
      queryKey: ["fileData", filename],
      queryFn: () => API.file.getData(filename),
    });
  }

  const uploadFile = useMutation({
    mutationFn: (file: FormData) => API.file.add(file),
    onSuccess: (variables) => {
      client.invalidateQueries(["files"]);
      client.invalidateQueries(["file", variables.id]);
      client.invalidateQueries([
        "fileData",
        decodeURIComponent(variables.alias),
      ]);
    },
  });
  const updateFile = useMutation({
    mutationFn: (file: FormData) =>
      API.file.update(file.get("id")?.toString() || 0, file),
    onSuccess: (variables) => {
      client.invalidateQueries(["files"]);
      client.invalidateQueries(["file", variables.id]);
      client.invalidateQueries(["fileData", variables.alias]);
    },
  });
  const deleteFile = useMutation({
    mutationFn: (id: number | string) => API.file.delete(id),
    onSuccess: () => {
      client.invalidateQueries(["files"]);
    },
  });

  const shareFile = useMutation({
    mutationFn: ({ id, email }: { id: number | string; email: EmailI }) =>
      API.file.share({ id, email }),
  });
  return {
    uploadFile,
    updateFile,
    deleteFile,
    getFileById,
    getFileData,
    shareFile,
    getFiles,
  };
}
