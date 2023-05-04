import { API_ENDPOINT } from "@/service/dev";
import { UserI } from "@/util/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useProfile() {
  const client = useQueryClient();
  const updateProfile = useMutation({
    mutationFn: async (data: UserI) => {
      const res = await fetch(API_ENDPOINT + "/profile/update", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        credentials: "include",
        body: JSON.stringify({ username: data.username, alias: data.alias }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      console.log({ data });
      client.invalidateQueries(["profile", data.user.id]);
    },
  });

  const deleteProfile = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(API_ENDPOINT + "/profile/", {
        method: "delete",
        credentials: "include",
      });
      return res.json();
    },
    onSuccess: () => {
      client.invalidateQueries(["profile"]);
    },
  });

  function useGetProfile(id: string) {
    return useQuery(["profile", id], async () => {
      const res = await fetch(API_ENDPOINT + "/profile/", {
        credentials: "include",
      });
      return res.json();
    });
  }
  return { updateProfile, deleteProfile, useGetProfile };
}
