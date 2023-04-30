interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  custom?: string;
}

export default function LabeledInput({ label, custom, ...props }: Props) {
  return (
    <div className="flex justify-around gap-2 ">
      <label className="w-full text-center">{label}</label>
      <input
        className={`border rounded-md px-4 focus-visible:outline-none focus-visible:border focus-visible:border-gray-500 ${custom}`}
        {...props}
      />
    </div>
  );
}
