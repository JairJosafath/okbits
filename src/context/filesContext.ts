import { FileI, UserI } from "@/util/types";
import { UseQueryResult } from "@tanstack/react-query";
import { Dispatch, SetStateAction, createContext } from "react";

export const FilesContext = createContext<
  | {
      Files: UseQueryResult<FileI[], unknown>;
      setFiles:
        | Dispatch<SetStateAction<UseQueryResult<FileI[], unknown>>>
        | undefined;
    }
  | undefined
>(undefined);
