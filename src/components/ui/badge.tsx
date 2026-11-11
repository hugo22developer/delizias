import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-pink-100 bg-white/85 px-3 py-1 text-xs font-semibold text-pink-700 backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
