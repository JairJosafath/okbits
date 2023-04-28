"use client";

import Button from "@/components/Button";
import LabeledCheckbox from "@/components/LabeledCheckbox";
import LabeledInput from "@/components/LabeledInput";
import Topbar from "@/components/Topbar";
export default function Share() {
  return (
    <div className=" flex flex-1 justify-center">
      <div
        className="auto-rows-min gap-6 h-min  w-full m-5 max-w-lg shadow-md
      rounded-md grid justify-center"
      >
        <p className="h-6 text-center text-lg font-semibold m-4 ">Share File</p>
        <div className="grid items-center justify-center gap-6">
          <LabeledInput label="to" />
          <LabeledInput label="cc" />
          <LabeledInput label="subject" />
        </div>

        <div className="flex gap-6 items-center">
          <label>Attached files:</label>
          <p>Filename</p>
          <LabeledCheckbox label="PDF" />
          <LabeledCheckbox label="CSV" />
          <LabeledCheckbox label="JSON" />
        </div>
        <div className="grid">
          <label>Content</label>
          <textarea className="border h-32 resize-none rounded-lg focus-visible:outline-none focus-visible:border focus-visible:border-gray-500 p-2" />
        </div>
        <div className="mb-4 flex justify-center items-center gap-8">
          <Button label="cancel" onClick={() => console.log("cancel")} />
          <Button label="share" onClick={() => console.log("share")} />
        </div>
      </div>
    </div>
  );
}
