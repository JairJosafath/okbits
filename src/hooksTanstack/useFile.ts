import { API_ENDPOINT } from "@/service/dev";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FileI } from "@/util/types";

// export

// // export const createFile = useMutation({
// //   mutationFn: async (file: FileI) => {
// //     const res = await fetch(API_ENDPOINT + "/files/add", {
// //       method: "post",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },

// //       credentials: "include",

// //       body: JSON.stringify(file),
// //     });
// //     const data = await res.json();
// //     return data;
// //   },
// // });

// // return useMutation({
// //   queryKey: ["files"],
// //   queryFn: async () => {
// //     const res = await fetch(API_ENDPOINT + "/files/" + id, {
// //       credentials: "include",
// //     });
// //     const data = await res.json();
// //     console.log("dataaa", data);
// //     return data;
// //   },
// // });
// // return useQuery(id && ["file", id], () =>
// //   fetch(API_ENDPOINT + "/files/" + id, { credentials: "include" }).then(
// //     (res) => console.log(res.data, "tanstack test")
// //   )
// // );
// // }
export default function useFile() {
  const queryClient = useQueryClient();
  function getFileById(id: string | number) {
    return useQuery({
      queryKey: ["file"],
      queryFn: async () => {
        const res = await fetch(API_ENDPOINT + "/files/" + id, {
          credentials: "include",
        });
        const data: FileI = await res.json();
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
      const data = await res.json();
      return data;
    },
  });
  function updateFile(id: number | string) {
    useMutation({
      mutationFn: async (file: FileI) => {
        const res = await fetch(API_ENDPOINT + "/files/update/" + id, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify(file),
        });
        const data = await res.json();
        return data;
      },
    });
  }
  const deleteFile = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(API_ENDPOINT + "/files/" + id, {
        method: "delete",
        credentials: "include",
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
  };
}
