import LabeledInput from "@/components/LabeledInput";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="bg-orange-500 w-full grid auto-rows-min gap-6 p-6 ">
      {/* File info and controls */}
      <div className="w-full flex justify-around">
        {/* info */}
        <div className="grid gap-2">
          <LabeledInput label="file name" />
          <LabeledInput label="created on" />
          <LabeledInput label="last modified" />
          <LabeledInput label="size" />
        </div>
        {/* controls */}
        <div className="grid">
          <button>share</button>
          <button>delete</button>
        </div>
      </div>
      {/* File output */}
      <div className="grid gap-6 w-full">
        <textarea className="h-64 resize-none rounded-lg max-w-2xl w-4/5 justify-self-center" />
        <div className="flex gap-6 justify-self-center">
          <button>cancel</button>
          <button>save</button>
        </div>
      </div>
    </div>
  );
}
