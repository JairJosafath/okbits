import { ClassAttributes, HTMLAttributes, PropsWithChildren } from "react";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  label: string;
  color?: string;
  custom?: string;
}

export default function Button({
  label,
  color = "",
  custom = "",
  ...props
}: Props) {
  return (
    <button
      className={`bg-blue-700 px-2 py-1 rounded-md
    text-gray-200
    hover:bg-blue-500
    hover:shadow-md
    hover:shadow-gray-400
    active:scale-95
    transition-all
    duration-300
    max-h-10
    ${color}
    ${custom}
    `}
      {...props}
    >
      {label}
    </button>
  );
}
