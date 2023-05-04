"use client";
import Button from "@/components/Button";
import LabeledInput from "@/components/LabeledInput";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { useState } from "react";

export default function Page() {
  const [state, setState] = useState<
    "signin" | "signup" | "reset" | "confirmreset" | "newpassword"
  >("signin");

  return (
    <div className="absolute top-0 h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="h-2/5 w-1/2 bg-gray-100 min-w-fit min-h-fit max-h-max max-w-2xl shadow-md">
        {/* header */}
        <div className="h-10 bg-blue-600 flex justify-evenly">
          <Button
            label="Sign In"
            custom={`my-1 hover:shadow-black/30 hover:shadow-lg ${
              state === "signin" ? "bg-blue-400" : ""
            }`}
            onClick={() => setState("signin")}
          >
            Sign In
          </Button>
          <Button
            label="Sign Up"
            custom={`my-1 hover:shadow-black/30 hover:shadow-lg ${
              state === "signup" ? "bg-blue-400" : ""
            }`}
            onClick={() => setState("signup")}
          >
            Sign Up
          </Button>
        </div>
        {/* content */}
        {state === "signin" && <SignIn state={state} setState={setState} />}
        {state === "signup" && <SignUp state={state} setState={setState} />}
        {state === "reset" && (
          <>
            {/* <div className="grid auto-rows-min gap-10 p-5 items-center bg-gray-100 justify-center h-3/4">
              <LabeledInput label="email" />
              <LabeledInput label="password" />
              <LabeledInput label="confirm password" />
            </div>
            {/* footer 
            <div className="flex justify-center bg-gray-100">
              <Button label="Create Account" />
            </div> */}
            Work In Progress
          </>
        )}
      </div>
    </div>
  );
}
