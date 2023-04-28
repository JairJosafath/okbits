export default function Icon({ color, path }: { color: string; path: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`w-7 h-7 hover:bg-${color}-500 p-1 rounded-md scale-75  active:opacity-100 z-10`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}
