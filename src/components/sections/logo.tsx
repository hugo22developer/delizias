import { assets } from "@/config/assets";
import { cn } from "@/lib/utils";

/**
 * Logotipo de la marca. Usa <img> a propósito: el logo real puede ser un SVG
 * o PNG local y así se reemplaza solo cambiando la URL en src/config/assets.ts.
 */
export function Logo({
  variant = "header",
  className,
}: {
  variant?: "header" | "footer";
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={assets.logo[variant]}
      alt={assets.logo.alt}
      width={assets.logo.width}
      height={assets.logo.height}
      className={cn("h-9 w-auto rounded-lg sm:h-10", className)}
    />
  );
}
