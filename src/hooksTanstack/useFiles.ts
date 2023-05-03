import { API_ENDPOINT } from "@/service/dev";
import { FileI } from "@/util/types";
import { useQuery } from "@tanstack/react-query";

export default function useFiles() {
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
