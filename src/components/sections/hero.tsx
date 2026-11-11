"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { assets } from "@/config/assets";
import { heroProducts } from "@/config/catalog";
import { whatsappLink } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FoodImage } from "@/components/ui/food-image";
import { WhatsAppIcon } from "@/components/ui/icons";
import { WordReveal } from "@/components/magic/word-reveal";

/** Posición y movimiento de cada tarjeta flotante del collage. */
const cardLayout = [
  {
    wrapper: "col-span-3 row-span-4 col-start-1 row-start-1",
    tilt: "-3deg",
    anim: "animate-float",
    emoji: "🍰",
  },
  {
    wrapper: "col-span-3 row-span-3 col-start-4 row-start-2",
    tilt: "3deg",
    anim: "animate-float-slow",
    emoji: "🐮",
  },
  {
    wrapper: "col-span-3 row-span-3 col-start-2 row-start-5",
    tilt: "-2deg",
    anim: "animate-float",
    emoji: "🥤",
  },
] as const;

type HeroProduct = (typeof heroProducts)[number];
type HeroCardLayout = (typeof cardLayout)[number];

function HeroProductCard({
  product,
  layout,
  index,
}: {
  product: HeroProduct;
  layout: HeroCardLayout;
  index: number;
}) {
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const rotateY = useSpring(rawPointerX, { stiffness: 180, damping: 20 });
  const rotateX = useSpring(rawPointerY, { stiffness: 180, damping: 20 });

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    rawPointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 18);
    rawPointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -18);
  }

  function resetPointer() {
    rawPointerX.set(0);
    rawPointerY.set(0);
  }

  return (
    <motion.div
      className={layout.wrapper}
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.5 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className={`${layout.anim} relative h-full w-full motion-reduce:animate-none`}
        style={{
          ["--tilt" as string]: layout.tilt,
          transform: `rotate(${layout.tilt})`,
          perspective: 1000,
        }}
      >
        <motion.div
          className="glass group relative h-full w-full overflow-hidden rounded-[1.75rem] p-1.5 shadow-xl shadow-pink-500/15 transition-shadow hover:shadow-2xl hover:shadow-pink-500/25"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-[1.35rem]"
            style={{ transform: "translateZ(28px)", transformStyle: "preserve-3d" }}
          >
            <FoodImage
              src={assets.hero[product.key]}
              alt={`${product.name}, ${product.note.toLowerCase()} de DeLIZcias`}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 220px, 45vw"
              fallbackEmoji={layout.emoji}
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div
              className="absolute inset-x-2 bottom-2 rounded-2xl bg-white/85 px-3 py-1.5 backdrop-blur"
              style={{ transform: "translateZ(32px)" }}
            >
              <p className="text-sm font-bold leading-tight text-stone-900">
                {product.name}
              </p>
              <p className="text-xs font-medium text-pink-700">
                {product.note}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pt-40 lg:pb-24"
    >
      {/* Manchas de color de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 size-96 rounded-full bg-pink-200/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-64 size-96 rounded-full bg-amber-200/60 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="#categorias" className="inline-block">
              <Badge className="group cursor-pointer px-4 py-1.5 text-[13px] shadow-sm transition hover:border-pink-300 hover:shadow-md">
                <Sparkles
                  className="size-3.5 text-amber-500 transition group-hover:rotate-12"
                  aria-hidden="true"
                />
                ¡Los mejores antojos y postres directos a tu puerta!
              </Badge>
            </a>
          </motion.div>

          <h1 className="mt-6 font-display text-[2.75rem] font-bold leading-[1.02] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl">
            <WordReveal text="Antójate de algo" delay={0.15} />
            <br />
            <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
              <WordReveal text="dulce, fresco y rico" delay={0.45} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600"
          >
            Carlotas, vaquitas locas, horchata bien fría y botanas para todos los
            días. Dinos qué se te antoja y te lo llevamos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild variant="whatsapp" size="lg">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-5" />
                Pedir por WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#categorias">
                Explorar catálogo
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Composición visual de productos estrella */}
        <div
          className="relative mx-auto grid aspect-[5/6] w-full max-w-md grid-cols-6 grid-rows-8 gap-3 sm:max-w-lg"
          role="group"
          aria-label="Productos estrella"
        >
          {heroProducts.map((product, i) => (
            <HeroProductCard
              key={product.key}
              product={product}
              layout={cardLayout[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
