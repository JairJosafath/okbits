import { Dispatch, SetStateAction, createContext } from "react";
interface Props {
  status: { status: string; msg: string };
  setStatus: Dispatch<SetStateAction<{ status: string; msg: string }>>;
}
export const StatusContext = createContext<Props>({
  status: { status: "", msg: "" },
  setStatus: () => undefined,
});
