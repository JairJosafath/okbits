"use client";

import Button from "@/components/Button";
import LabeledCheckbox from "@/components/LabeledCheckbox";
import LabeledInput from "@/components/LabeledInput";
import Topbar from "@/components/Topbar";
import useFile from "@/hooksTanstack/useFile";
import { EmailI } from "@/util/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Share({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { shareFile } = useFile();

  const { isSuccess: shareSuccess } = shareFile;
  const [email, setEmail] = useState<EmailI>({
    to: "",
    subject: "",

    cc: "",
    text: "",
    attached: {
      pdf: false,
      csv: false,
      json: false,
    },
  });

  function updateEmail(params: EmailI) {
    setEmail({ ...email, ...params });
  }
  return (
    <div className=" flex flex-1 justify-center">
      <div
        className="auto-rows-min gap-6 h-min  w-full m-5 max-w-lg shadow-md
      rounded-md grid justify-center"
      >
        <p className="h-6 text-center text-lg font-semibold m-4 ">Share File</p>
        <div className="grid items-center justify-center gap-6">
          <LabeledInput
            label="to"
            onChange={(e) => {
              updateEmail({ to: e.currentTarget.value });
            }}
          />
          <LabeledInput
            label="cc"
            onChange={(e) => {
              updateEmail({ cc: e.currentTarget.value });
            }}
          />
          <LabeledInput
            label="subject"
            onChange={(e) => {
              updateEmail({ subject: e.currentTarget.value });
            }}
          />
        </div>
        <div className="flex gap-6 items-center">
          <label>Attached files:</label>
          <p>Filename</p>

          <LabeledCheckbox
            label="PDF"
            onChange={(e) => {
              updateEmail({
                attached: { ...email.attached, pdf: e.currentTarget.checked },
              });
            }}
          />
          <LabeledCheckbox
            label="CSV"
            onChange={(e) => {
              updateEmail({
                attached: { ...email.attached, csv: e.currentTarget.checked },
              });
            }}
          />
          <LabeledCheckbox
            label="JSON"
            onChange={(e) => {
              updateEmail({
                attached: { ...email.attached, json: e.currentTarget.checked },
              });
            }}
          />
        </div>
        <div className="grid">
          <label>Content</label>
          <textarea
            className="border h-32 resize-none rounded-lg focus-visible:outline-none focus-visible:border focus-visible:border-gray-500 p-2"
            onChange={(e) => {
              updateEmail({ text: e.currentTarget.value });
            }}
          />
        </div>
        <div className="mb-4 flex justify-center items-center gap-8">
          <Button label="cancel" onClick={() => router.back()} />
          <Button
            label="share"
            onClick={() => shareFile.mutate({ id: parseInt(params.id), email })}
          />
        </div>
      </div>
    </div>
  );
}
