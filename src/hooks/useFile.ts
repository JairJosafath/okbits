import { FileI } from "@/util/types";
import { useEffect, useState } from "react";

export default function useFile() {
  const [file, setFile] = useState<FileI>({ name: "" });
}
