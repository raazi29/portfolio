
import { cn } from '@/lib/utils';
import React from "react";

const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <button
      className={cn(
        "animate-shimmer inline-flex h-12 items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };
