interface Props extends React.ComponentPropsWithoutRef<"svg"> {
  label?: string;
  color?: string;
  custom?: string;
  effect: string;
  path: string;
}

export default function Icon({ effect, path, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={
        "w-7 h-7 p-1 rounded-md scale-75 active:opacity-100 z-20 " + effect
      }
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}
