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

export default function useFile() {
  const client = useQueryClient();
  const { files, setFiles } = useContext(SideBarContext);
  function getFiles() {
    return useQuery({
      queryKey: ["files"],
      queryFn: async () => {
        const res = await fetch(API_ENDPOINT + "/files", {
          credentials: "include",
        });
        const data: FileI[] | object = await res.json();
        if (data instanceof Array) {
          setFiles(data);
          return data;
        } else return [];
      },
    });
  }

  function getFileById({ id }: { id: string }) {
    return useQuery({
      queryKey: ["file", id],
      queryFn: async () => {
        const res = await fetch(API_ENDPOINT + "/files/" + id, {
          credentials: "include",
        });
        const data: FileI = await res.json();
        return data;
      },
    });
  }
  function getFileData(filename: string) {
    return useQuery({
      queryKey: ["fileData", filename],
      queryFn: async () => {
        if (filename) {
          const res = await fetch(API_ENDPOINT + "/files/storage/" + filename, {
            credentials: "include",
          });
          const data = await res.text();
          return data;
        }
        return null;
      },
    });
  }

  const uploadFile = useMutation({
    mutationFn: async (file: FormData) => {
      const res = await fetch(API_ENDPOINT + "/files/add", {
        method: "post",

        credentials: "include",

        body: file,
      });

      return res.json();
    },
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
    mutationFn: async (file: FormData) => {
      const res = await fetch(
        API_ENDPOINT + "/files/update/" + file.get("id"),
        {
          method: "post",
          credentials: "include",
          body: file,
        }
      );
      return res.json();
    },
    onSuccess: (variables) => {
      client.invalidateQueries(["files"]);
      client.invalidateQueries(["file", variables.id]);
      client.invalidateQueries(["fileData", variables.alias]);
    },
  });
  const deleteFile = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(API_ENDPOINT + "/files/" + id, {
        method: "delete",
        credentials: "include",
      });
      return res.json();
    },
    onSuccess: (variables, context) => {
      client.invalidateQueries(["files"]);
      // manually update sidebar, since the tanstack query doesnt work all the time
    },
  });

  const shareFile = useMutation({
    mutationFn: async (input: { id: number; email: EmailI }) => {
      const res = await fetch(API_ENDPOINT + "/files/share/" + input.id, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input.email,
        }),
      });
      const data = await res.json();
      return data;
    },
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
