import { cn } from "@/lib/utils";

/**
 * Carrusel infinito en CSS puro (server component, sin JS).
 * El contenido se duplica para que el bucle sea continuo.
 */
export function Marquee({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div className="flex min-w-full shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {children}
      </div>
      <div
        aria-hidden="true"
        className="flex min-w-full shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none"
      >
        {children}
      </div>
    </div>
  );
}
