export default function LabeledCheckbox({ label }: { label: string }) {
  return (
    <div className="flex gap-2 items-center">
      <p>{label}</p>
      <input type="checkbox" />
    </div>
  );
}
