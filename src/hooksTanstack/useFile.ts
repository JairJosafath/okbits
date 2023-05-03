import { API_ENDPOINT } from "@/service/dev";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { FileI, EmailI } from "@/util/types";

export default function useFile() {
  const client = useQueryClient();
  function getFiles() {
    return useQuery({
      queryKey: ["files"],
      queryFn: async () => {
        const res = await fetch(API_ENDPOINT + "/files", {
          credentials: "include",
        });
        const data: FileI[] = await res.json();
        console.log(data, "runs");
        return data;
      },
    });
  }

  function getFileById({ id }: { id: string | number }) {
    return useQuery({
      queryKey: ["file", id, "single"],
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
        const res = await fetch(API_ENDPOINT + "/files/storage/" + filename, {
          credentials: "include",
        });
        const data = await res.text();
        return data;
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
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return await res.json();
    },
    onSuccess: () => {
      client.invalidateQueries(["files"]);
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
    onSuccess: () => {
      client.invalidateQueries(["files"]);
      client.invalidateQueries(["file"]);
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
    onSuccess: () => {
      client.invalidateQueries(["files"]);
      client.invalidateQueries(["file"]);
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
