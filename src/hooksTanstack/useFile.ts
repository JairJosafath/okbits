import { API_ENDPOINT } from "@/service/dev";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import { FileI, EmailI } from "@/util/types";

export default function useFile() {
  const queryClient = useQueryClient();
  function getFileById(id: string | number) {
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
        const res = await fetch(API_ENDPOINT + "/files/storage/" + filename, {
          credentials: "include",
        });
        const data = await res.text();
        return data;
      },
    });
  }
  function getFiles() {
    return useQuery({
      queryKey: ["files"],
      queryFn: async () => {
        const res = await fetch(API_ENDPOINT + "/files", {
          credentials: "include",
        });
        const data: FileI[] = await res.json();
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
      const data = await res.json();

      return data;
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["files"]);
    // },
  });
  const updateFile = useMutation({
    mutationFn: async (file: FormData) => {
      const res = await fetch(
        API_ENDPOINT + "/files/update/" + file.get("id"),
        {
          method: "post",
          credentials: "include",
          // headers: { "Content-Type": "multipart/form-data" },
          body: file,
        }
      );
      const data = await res.json();
      return data;
    },
  });
  const deleteFile = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(API_ENDPOINT + "/files/" + id, {
        method: "delete",
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
    // onSuccess: () => queryClient.invalidateQueries(["files"]),
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
    getFiles,
    getFileData,
    shareFile,
  };
}
