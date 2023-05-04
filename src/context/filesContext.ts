import { FileI, UserI } from "@/util/types";
import { UseQueryResult } from "@tanstack/react-query";
import { Dispatch, SetStateAction, createContext } from "react";

export const SideBarContext = createContext<{
  files: FileI[] | undefined;
  setFiles: Dispatch<SetStateAction<FileI[] | undefined>>;
}>({ files: undefined, setFiles: () => undefined });
