import LabeledCheckbox from "@/components/LabeledCheckbox";
import LabeledInput from "@/components/LabeledInput";
import Topbar from "@/components/Topbar";

export default function Share() {
  return (
    <div>
      {/* Topbar */}
      <Topbar />

      <div className="flex h-screen w-full top-0 left-0 absolute pt-10 justify-center">
        <div className="auto-rows-min gap-6 h-min  w-full m-5 bg-red-400 max-w-lg rounded-md grid justify-center">
          <p className="h-6 text-center text-lg font-semibold m-4 ">
            Share File
          </p>
          <div className="grid items-center justify-center gap-6">
            <LabeledInput label="to" />
            <LabeledInput label="cc" />
            <LabeledInput label="subject" />
          </div>

          <div className="flex gap-6 items-center">
            <label>Attached files:</label>
            <LabeledCheckbox label="PDF" />
            <LabeledCheckbox label="CSV" />
            <LabeledCheckbox label="JSON" />
          </div>
          <div className="grid">
            <label>Content</label>
            <textarea className="h-32 resize-none rounded-lg" />
          </div>
          <div className="mb-4">
            <button className="bg-blue-500 rounded-md p-1">Cancel</button>
            <button className="bg-blue-500 rounded-md p-1">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
