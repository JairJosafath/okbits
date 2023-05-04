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
  const [credentialsU, setCredentialsU] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const { setReq, data, isLoading, isError } = useFetch();
  const [signout, setSignout] = useState<boolean>(false);
  function sigIn(username: string, password: string) {
    setReq({
      input: `${API_ENDPOINT}/signin`,
      init: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      },
    });
  }
  function signUp(username: string, password: string) {
    setReq({
      input: `${API_ENDPOINT}/signup`,
      init: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      },
    });
  }
  function signUserOut() {
    setReq({
      input: `${API_ENDPOINT}/signout`,
      init: { method: "POST" },
    });
    setUser({ username: "", id: 0 });
  }

  useEffect(() => {
    const { username, password } = credentials;
    if (username && password) sigIn(username, password);
  }, [credentials.password, credentials.username]);
  useEffect(() => {
    const { username, password } = credentialsU;
    if (username && password) signUp(username, password);
  }, [credentialsU.password, credentialsU.username]);

  useEffect(() => {
    if (signout) signUserOut();
    return () => setSignout(false);
  }, [signout]);

  useEffect(() => {
    const temp: any = data;
    if (temp?.msg === "Success") {
      const tempuser: UserI = temp.user;
      setUser(tempuser);
    }
  }, [data]);

  return { setCredentials, user, setSignout, setCredentialsU };
}
