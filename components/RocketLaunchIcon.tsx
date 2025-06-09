import { ComponentProps } from "react";

export const RocketLaunchIcon = ({ className, ...props }: ComponentProps<"svg">) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-5 h-5 ${className}`}
      {...props}
    >
      <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      <path d="M7.5 11.5l5-5" />
      <path d="M16.5 11.5l-5-5" />
    </svg>
  );