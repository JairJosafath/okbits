import { useCallback, useEffect, useState } from "react";
import useFetch from "./useFetch";
import { API_ENDPOINT } from "@/service/dev";
import { UserI } from "@/util/types";

export default function useAuth() {
  const [user, setUser] = useState<UserI>({ username: "", id: 0 });
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const { setReq, data, isLoading, isError } = useFetch();
  function sigIn(username: string, password: string) {
    setReq({
      input: `${API_ENDPOINT}/signin`,
      init: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow",
        body: JSON.stringify({
          username,
          password,
        }),
      },
    });
  }

  useEffect(() => {
    console.log(credentials);
    const { username, password } = credentials;
    if (username && password) sigIn(username, password);
  }, [credentials.password, credentials.username]);

  useEffect(() => {
    const temp: any = data;
    if (temp?.msg === "Success") {
      const tempuser: UserI = temp.user;
      setUser(tempuser);
    }
  }, [data]);
  return { setCredentials, user };
}
