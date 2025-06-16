import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      className={cn(className)}
      width="128"
      height="112"
      viewBox="0 0 128 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M64 0L0 112H128L64 0ZM65.3409 20.8783L109.442 97.3554L65.3409 71.0532V20.8783Z"
        fill="currentColor"
      />
    </svg>
  );
}
