"use client";
import { Dispatch, SetStateAction, useState } from "react";
import LabeledInput from "../LabeledInput";
import Button from "../Button";

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

  function signIn() {
    console.log({ username, password });
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
