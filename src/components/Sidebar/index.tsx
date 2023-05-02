"use client";
import Icon from "../Icon";
import useFile from "@/hooksTanstack/useFile";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Sidebar() {
  const { getFiles, deleteFile, updateFile } = useFile();
  const { data: dataFiles } = getFiles;
  const { isSuccess } = deleteFile;
  const {
    isSuccess: updateSuccess,
    isError: updateError,
    isLoading: updateLoading,
  } = updateFile;
  const router = useRouter();

  useEffect(() => {
    // async function fn() {

    //   console.log({ data });
    // }
    // fn();
    console.log({
      updateSuccess,
      updateError,
      updateLoading,
    });
  }, [updateSuccess, updateError, updateLoading]);

  return (
    <div className="w-60  bg-gray-100 ">
      <input
        className="w-11/12 m-1 rounded-xl px-2 mt-6 mb-4 
        border focus-visible:outline-none focus-visible:border focus-visible:border-gray-500
        "
        placeholder="Search"
      />

      <label className="p-2 border-b w-full block">your files</label>

      <div>
        {dataFiles?.length &&
          dataFiles?.map((file) => (
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
                    if (file?.id) deleteFile.mutate(file?.id);
                  }}
                />
                <Icon
                  effect="hover:bg-blue-500"
                  path="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
