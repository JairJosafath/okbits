import Button from "@/components/Button";
import LabeledInput from "@/components/LabeledInput";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="bg-gray-0 w-full grid auto-rows-min gap-6 p-6 ">
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
          <Button
            label="Share"
            color="bg-green-700 px-2 py-1 rounded-md
    text-gray-200
    hover:bg-green-500"
          >
            share
          </Button>
          <Button
            label="Delete"
            color="bg-red-700 px-2 py-1 rounded-md
    text-gray-200
    hover:bg-red-500"
          >
            delete
          </Button>
        </div>
      </div>
      {/* File output */}
      <div className="grid gap-6 w-full">
        <textarea className="border h-64 resize-none rounded-lg max-w-2xl w-4/5 justify-self-center focus-visible:border focus-visible:border-gray-500 p-2" />
        <div className="flex gap-6 justify-self-center">
          <Button label="Cancel">cancel</Button>
          <Button label="Save">save</Button>
        </div>
      </div>
    </div>
  );
}
