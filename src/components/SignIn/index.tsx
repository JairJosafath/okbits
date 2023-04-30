"use client";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import LabeledInput from "../LabeledInput";
import Button from "../Button";
import useFetch from "@/hooks/useFetch";
import useAuth from "@/hooks/useAuth";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";

interface Props {
  state: "reset" | "signup" | "signin" | "confirmreset" | "newpassword";
  setState: Dispatch<
    SetStateAction<
      "reset" | "signup" | "signin" | "confirmreset" | "newpassword"
    >
  >;
}

export default function SignIn({ state, setState }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setCredentials, user } = useAuth();
  const { user: contextUser, setUser } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (user.id) {
      setUser?.(user);
      router.replace("/");
    }
  }, [user.id]);
  function signIn() {
    setCredentials({ username, password });
  }

  return (
    <>
      <div className="grid auto-rows-min gap-10 p-5 items-center bg-gray-100 justify-center h-3/4">
        <LabeledInput
          label="email"
          onChange={(e) => setUsername(e.target.value)}
          type="email"
          pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
        />
        <LabeledInput
          label="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <p
          className="w-60 mx-auto bg-gray-100 pl-12 cursor-pointer"
          onClick={() => setState("reset")}
        >
          Forgot Password
        </p>
        <p
          className="w-60 mx-auto bg-gray-100 pl-12 cursor-pointer"
          onClick={() => setState("signup")}
        >
          Create Account
        </p>
      </div>
      {/* footer */}
      <div className="flex justify-center bg-gray-100">
        <Button label="Sign In" onClick={signIn} />
      </div>
    </>
  );
}
