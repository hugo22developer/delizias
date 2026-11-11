"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Banknote, CreditCard, Landmark, ShieldCheck, type LucideIcon } from "lucide-react";
import { paymentMethods, type PaymentMethod } from "@/config/catalog";
import { Reveal } from "@/components/magic/reveal";
import { cn } from "@/lib/utils";

const icons: Record<PaymentMethod["id"], LucideIcon> = {
  efectivo: Banknote,
  transferencia: Landmark,
  tarjeta: CreditCard,
};

export function PaymentMethods() {
  const [selected, setSelected] = useState<PaymentMethod["id"]>("efectivo");
  const active = paymentMethods.find((m) => m.id === selected) ?? paymentMethods[0];

  return (
    <section
      id="pagos"
      aria-labelledby="titulo-pagos"
      className="scroll-mt-24 px-4 py-10 sm:px-6 lg:py-16"
    >
      <Reveal className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-pink-100 bg-gradient-to-br from-white via-pink-50 to-amber-50 p-6 shadow-xl shadow-pink-500/10 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-pink-600 text-white shadow-lg shadow-pink-500/30">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </span>
            <h2
              id="titulo-pagos"
              className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl"
            >
              Paga como te quede mejor
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              Aceptamos tres formas de pago. Elige una para ver cómo funciona.
            </p>
          </div>

          <div>
            <div
              role="group"
              aria-label="Métodos de pago"
              className="grid gap-3 sm:grid-cols-3"
            >
              {paymentMethods.map((method) => {
                const Icon = icons[method.id];
                const isActive = method.id === selected;
                return (
                  <button
                    key={method.id}
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="detalle-pago"
                    onClick={() => setSelected(method.id)}
                    className={cn(
                      "group flex flex-col items-start gap-3 rounded-3xl border p-5 text-left transition duration-200 hover:-translate-y-1 active:scale-[0.98]",
                      isActive
                        ? "border-pink-600 bg-pink-600 text-white shadow-xl shadow-pink-500/30"
                        : "glass text-stone-800 hover:border-pink-300 hover:shadow-lg hover:shadow-pink-500/10",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-11 items-center justify-center rounded-2xl transition",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-pink-100 text-pink-700 group-hover:bg-pink-200",
                      )}
                    >
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-base font-bold leading-tight">
                        {method.title}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 block text-sm",
                          isActive ? "text-pink-50" : "text-stone-600",
                        )}
                      >
                        {method.summary}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              id="detalle-pago"
              aria-live="polite"
              className="glass mt-4 min-h-24 rounded-3xl p-5"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="text-base leading-relaxed text-stone-700"
                >
                  <strong className="font-bold text-stone-900">{active.title}: </strong>
                  {active.detail}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
