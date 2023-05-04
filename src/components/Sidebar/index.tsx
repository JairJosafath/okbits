"use client";
import Icon from "../Icon";
// import useFile from "@/hooksTanstack/useFile";
import { useRouter } from "next/navigation";
import { FileI } from "@/util/types";
import { useContext, useEffect, useState } from "react";
import useFile from "@/hooksTanstack/useFile";
import { SideBarContext } from "@/context/filesContext";
import {
  UseMutationResult,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { StatusContext } from "@/context/statusContext";

export default function Sidebar({
  dataFiles,
  deleteFile,
  searchFile,
}: {
  dataFiles: FileI[];
  deleteFile: UseMutationResult<any, unknown, string | number, unknown>;
  searchFile: (query: string) => UseQueryResult<any, unknown>;
}) {
  const router = useRouter();
  const [files, setFiles] = useState<FileI[]>(dataFiles);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(search);
  const { data } = searchFile(query);
  const { setStatus } = useContext(StatusContext);
  const [results, setResults] = useState<FileI[]>();
  useEffect(() => {
    setResults(data);
  }, [data]);
  useEffect(() => {
    setFiles(dataFiles);
  }, [dataFiles]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (search.length > 2) {
      timeout = setTimeout(() => {
        setQuery(search);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [search]);
  useEffect(() => {
    setStatus({
      status: deleteFile.isLoading
        ? "loading"
        : deleteFile.isSuccess
        ? "success"
        : deleteFile.isError
        ? "error"
        : "",
      msg: "",
    });
  }, [deleteFile.isSuccess, deleteFile.isError, deleteFile.isLoading]);
  return (
    <div className="w-60  bg-gray-100 ">
      <input
        className="w-11/12 m-1 rounded-xl px-2 mt-6 mb-4 
        border focus-visible:outline-none focus-visible:border focus-visible:border-gray-500
        "
        value={search}
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {search && (
        <>
          <label className="p-2 border-b w-full block bg-slate-800 text-white">
            search results
          </label>
          <div className="bg-blue-100">
            {results?.map((file: FileI) => (
              // TODO
              // tanstack not updating the state
              <div
                key={file.id}
                className="file m-1 rounded-md px-2 py-1 hover:bg-blue-300 
            hover:cursor-pointer active:bg-blue-200 transition-all duration-300
            flex justify-between items-center z-20
            "
                onClick={() => {
                  if (file?.id) router.push("/file/" + file?.id);
                }}
              >
                {file.name}
                <div className={"flex controls"}>
                  <Icon
                    effect="hover:bg-red-500"
                    path="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (file?.id) {
                        deleteFile.mutate(file?.id);
                        setFiles(
                          files.filter((local) => local.id !== file?.id)
                        );
                        setResults(
                          results.filter((local) => local.id !== file?.id)
                        );
                      }
                    }}
                  />
                  <Icon
                    effect="hover:bg-blue-500"
                    path="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (file?.id) {
                        router.push("/share/" + file?.id);
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <label className="p-2 border-b w-full block">your files</label>

      <div>
        {files?.length > 0 &&
          files?.map((file: FileI) => (
            // TODO
            // tanstack not updating the state
            <div
              key={file.id}
              className="file m-1 rounded-md px-2 py-1 hover:bg-gray-300 
            hover:cursor-pointer active:bg-gray-200 transition-all duration-300
            flex justify-between items-center z-20
            "
              onClick={() => {
                if (file?.id) router.push("/file/" + file?.id);
              }}
            >
              {file.name}
              <div className={"flex controls"}>
                <Icon
                  effect="hover:bg-red-500"
                  path="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (file?.id) {
                      deleteFile.mutate(file?.id);
                      setFiles(files.filter((local) => local.id !== file?.id));
                    }
                  }}
                />
                <Icon
                  effect="hover:bg-blue-500"
                  path="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (file?.id) {
                      router.push("/share/" + file?.id);
                    }
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
