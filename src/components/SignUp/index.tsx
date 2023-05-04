import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LabeledInput from "../LabeledInput";
import Button from "../Button";
import useAuth from "@/hooks/useAuth";

interface Props {
  state: "reset" | "signup" | "signin" | "confirmreset" | "newpassword";
  setState: Dispatch<
    SetStateAction<
      "reset" | "signup" | "signin" | "confirmreset" | "newpassword"
    >
  >;
}

export default function SignUp({ state, setState }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { setCredentialsU } = useAuth();

  const warnPassword =
    password !== passwordConfirmation ? "border-red-500" : "";
  const warnEmail = !new RegExp(/^\S+@\S+\.\S+$/).test(username);

  function signUp() {
    setCredentialsU({ username, password });
  }

  return (
    <>
      <div className="grid auto-rows-min gap-10 p-5 items-center bg-gray-100 justify-center h-3/4">
        <LabeledInput
          label="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="email"
        />
        <LabeledInput
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <LabeledInput
          label="confirm password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          type="password"
          custom={warnPassword}
        />
        {(warnPassword || warnEmail) && (
          <label className="text-sm text-center text-red-500">
            <p>{warnPassword && "Passwords do not match"}</p>
            <p>{warnEmail && "Email does not match criteria"}</p>
          </label>
        )}
      </div>
      {/* footer */}
      <div className="flex justify-center bg-gray-100">
        <Button label="Create Account" onClick={signUp} />
      </div>
    </>
  );
}
