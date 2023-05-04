interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  color?: string;
  custom?: string;
}

export default function LabeledCheckbox({ label, ...props }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <p>{label}</p>
      <input type="checkbox" {...props} />
    </div>
  );
}
