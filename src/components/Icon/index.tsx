export default function Icon({
  effect,
  path,
}: {
  effect: string;
  path: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={
        "w-7 h-7 p-1 rounded-md scale-75 active:opacity-100 z-10 " + effect
      }
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}
