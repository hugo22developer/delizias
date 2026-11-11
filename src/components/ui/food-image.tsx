"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type FoodImageProps = Omit<ImageProps, "onError"> & {
  /** Emoji que se muestra si la foto no carga. */
  fallbackEmoji?: string;
};

/**
 * next/image con respaldo: si la foto falla (enlace roto, sin conexión),
 * se muestra un fondo de color con un emoji en lugar de un cuadro vacío.
 */
export function FoodImage({
  className,
  fallbackEmoji = "🍓",
  alt,
  ...props
}: FoodImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-amber-100 text-6xl",
          className,
        )}
      >
        <span aria-hidden="true">{fallbackEmoji}</span>
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
