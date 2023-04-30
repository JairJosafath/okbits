import { UserI } from "@/util/types";
import { Dispatch, SetStateAction, createContext } from "react";

export const AuthContext = createContext<{
  user: UserI;
  setUser: Dispatch<SetStateAction<UserI>> | undefined;
}>({ user: { id: 0, username: "" }, setUser: undefined });
