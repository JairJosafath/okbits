import { API_ENDPOINT } from "@/service/dev";
import { EmailI } from "@/util/types";
import axios from "axios";

// async (file: FormData) => {
//     const res = await fetch(API_ENDPOINT + "/files/add", {
//       method: "post",

//       credentials: "include",

//       body: file,
//     });

//     return res.json();
//   }
export const API = {
  file: {
    add: async (input: FormData) => {
      const { data } = await axios.post(`${API_ENDPOINT}/files/add`, input, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    getOne: async (file_id: string | number) => {
      const { data } = await axios.get(`${API_ENDPOINT}/files/${file_id}`, {
        withCredentials: true,
      });
      return data;
    },
    getMulti: async () => {
      console.log("fecthing getFiles axios");
      const { data } = await axios.get(`${API_ENDPOINT}/files`, {
        withCredentials: true,
      });
      return data;
    },
    update: async (file_id: string | number, input: FormData) => {
      const { data } = await axios.post(
        `${API_ENDPOINT}/files/update/${file_id}`,
        input,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    delete: async (file_id: string | number) => {
      const { data } = await axios.delete(`${API_ENDPOINT}/files/${file_id}`, {
        withCredentials: true,
      });
      return data;
    },
    getData: async (filename: string) => {
      const { data } = await axios.get(
        `${API_ENDPOINT}/files/storage/${filename}`,
        { withCredentials: true }
      );
      return data;
    },
    share: async ({ id, email }: { id: number | string; email: EmailI }) => {
      const { data } = await axios.post(
        `${API_ENDPOINT}/files/share/${id}`,
        { email: email },
        {
          withCredentials: true,
        }
      );
      return data;
    },
  },
  user: {
    add: async () => {},
    getOne: async () => {},
    getMulti: async () => {},
    update: async () => {},
    delete: async () => {},
  },
  profile: {
    add: async () => {},
    getOne: async () => {},
    getMulti: async () => {},
    update: async () => {},
    delete: async () => {},
  },
};
