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

export default function SignUp({ state, setState }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const warnPassword =
    password !== passwordConfirmation ? "border-red-500" : "";
  const warnEmail = !new RegExp(/^\S+@\S+\.\S+$/).test(username);

  console.log(warnEmail);
  function signUp() {
    console.log({ username, password, passwordConfirmation });
  }

  return (
    <>
      <div className="grid auto-rows-min gap-10 p-5 items-center bg-gray-100 justify-center h-3/4">
        <LabeledInput
          label="email"
          onChange={(e) => setUsername(e.target.value)}
          type="email"
        />
        <LabeledInput
          label="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <LabeledInput
          label="confirm password"
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
