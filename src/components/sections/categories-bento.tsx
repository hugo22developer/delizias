import { ArrowUpRight } from "lucide-react";
import { assets } from "@/config/assets";
import { categories } from "@/config/catalog";
import { whatsappLink } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { FoodImage } from "@/components/ui/food-image";
import { Reveal } from "@/components/magic/reveal";
import { cn } from "@/lib/utils";

export function CategoriesBento() {
  return (
    <section
      id="categorias"
      aria-labelledby="titulo-categorias"
      className="scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h2
            id="titulo-categorias"
            className="font-display text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl"
          >
            Elige tu antojo
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-stone-600">
            Cinco categorías para endulzar, refrescar o botanear. Toca una para
            pedirla directo por WhatsApp.
          </p>
        </Reveal>

        <ul className="mt-12 grid auto-rows-[18rem] gap-4 md:grid-cols-2 lg:auto-rows-[15rem] lg:grid-cols-4">
          {categories.map((category, i) => {
            const isLarge = category.id === "postres";
            const message = `Hola DeLIZcias, quisiera pedir ${category.title.toLowerCase()}`;
            return (
              <li key={category.id} className={cn("min-h-0", category.span)}>
                <Reveal className="h-full" delay={i * 0.06}>
                  <article className="sheen group relative h-full overflow-hidden rounded-[2rem] border border-pink-100 bg-pink-50 shadow-md shadow-pink-500/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-pink-500/20">
                    <FoodImage
                      src={assets.categories[category.id]}
                      alt={`${category.title} de DeLIZcias`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      fallbackEmoji={category.emoji}
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />

                    <Badge className="absolute left-4 top-4 z-10 shadow-sm">
                      <span aria-hidden="true">{category.emoji}</span>
                      {category.presentation}
                    </Badge>

                    <div className="glass absolute inset-x-3 bottom-3 z-10 flex items-end justify-between gap-3 rounded-3xl p-4">
                      <div className="min-w-0">
                        <h3
                          className={cn(
                            "font-display font-bold leading-tight text-stone-900",
                            isLarge ? "text-3xl" : "text-xl",
                          )}
                        >
                          {category.title}
                        </h3>
                        <p
                          className={cn(
                            "mt-1 text-sm leading-snug text-stone-700",
                            !isLarge && "line-clamp-2",
                          )}
                        >
                          {category.description}
                        </p>
                      </div>
                      <a
                        href={whatsappLink(message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Pedir ${category.title.toLowerCase()} por WhatsApp`}
                        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-pink-600 text-white shadow-lg shadow-pink-500/30 transition hover:scale-110 hover:bg-pink-700 active:scale-95"
                      >
                        <ArrowUpRight className="size-5" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
