import { Heart } from "lucide-react";
import { marqueeItems } from "@/config/catalog";
import { Marquee } from "@/components/magic/marquee";

export function MarqueeStrip() {
  return (
    <section
      aria-label="Lo que ofrecemos"
      className="border-y border-pink-100 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 py-4 text-white"
    >
      <Marquee>
        {marqueeItems.map((item) => (
          <div
            key={item}
            className="flex shrink-0 items-center gap-6 pr-6 font-display text-xl font-semibold sm:text-2xl"
          >
            <span>{item}</span>
            <Heart className="size-4 fill-current text-amber-200" aria-hidden="true" />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
