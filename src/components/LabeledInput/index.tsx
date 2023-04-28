export default function LabeledInput({ label }: { label: string }) {
  return (
    <div className="flex justify-around gap-2">
      <label className="w-16 text-center">{label}</label>
      <input />
    </div>
  );
}
