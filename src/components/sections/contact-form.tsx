"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, MapPin, MessageCircle, Store } from "lucide-react";
import { orderTypes } from "@/config/catalog";
import { whatsappLink } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  FieldError,
  Input,
  Label,
  Select,
  Textarea,
} from "@/components/ui/form-controls";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/magic/reveal";

const typeValues = orderTypes.map((t) => t.value) as [
  (typeof orderTypes)[number]["value"],
  ...(typeof orderTypes)[number]["value"][],
];

const schema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Escribe tu nombre (mínimo 2 letras).")
      .max(60, "El nombre es muy largo (máximo 60 caracteres)."),
    type: z.enum(typeValues, { error: "Elige qué se te antoja." }),
    delivery: z.enum(["domicilio", "recoger"]),
    address: z.string().trim().max(120, "Usa máximo 120 caracteres.").optional(),
    details: z
      .string()
      .trim()
      .min(10, "Cuéntanos un poco más (mínimo 10 caracteres).")
      .max(500, "Usa máximo 500 caracteres."),
  })
  .superRefine((values, ctx) => {
    if (values.delivery === "domicilio" && (values.address?.length ?? 0) < 5) {
      ctx.addIssue({
        code: "custom",
        path: ["address"],
        message: "Escribe tu calle y colonia para el envío.",
      });
    }
  });

type FormValues = z.infer<typeof schema>;

function buildMessage(values: FormValues) {
  const typeLabel =
    orderTypes.find((t) => t.value === values.type)?.label ?? values.type;
  const delivery =
    values.delivery === "domicilio"
      ? `Envío a domicilio (${values.address})`
      : "Paso a recoger";

  return [
    `Hola DeLIZcias, soy ${values.name}.`,
    `Me interesa: ${typeLabel}.`,
    `Entrega: ${delivery}.`,
    `Detalle: ${values.details}`,
  ].join("\n");
}

export function ContactForm() {
  const [sentLink, setSentLink] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      type: "" as unknown as FormValues["type"],
      delivery: "domicilio",
      address: "",
      details: "",
    },
  });

  const delivery = watch("delivery");

  const onSubmit = (values: FormValues) => {
    const link = whatsappLink(buildMessage(values));
    const win = window.open(link, "_blank");
    if (win) win.opener = null;
    setSentLink(link);
  };

  return (
    <section
      id="contacto"
      aria-labelledby="titulo-contacto"
      className="scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <h2
            id="titulo-contacto"
            className="font-display text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl"
          >
            Arma tu pedido
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-stone-600">
            Llena el formulario y se abrirá WhatsApp con tu mensaje ya escrito.
            Ahí confirmamos disponibilidad y precio contigo.
          </p>
          <ul className="mt-8 space-y-4 text-stone-700">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-700">
                <MessageCircle className="size-5" aria-hidden="true" />
              </span>
              <span>También puedes preguntar dudas sobre sabores y presentaciones.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <span>Pide con envío a domicilio o pasa a recoger.</span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass rounded-[2rem] p-5 shadow-xl shadow-pink-500/10 sm:p-8">
            {sentLink ? (
              <div role="status" className="py-6 text-center">
                <CheckCircle2
                  className="mx-auto size-14 text-emerald-600"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-display text-2xl font-bold text-stone-900">
                  Tu mensaje está listo
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-stone-600">
                  Abrimos WhatsApp en una pestaña nueva. Si no se abrió, usa el
                  botón de abajo.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button asChild variant="whatsapp" size="lg">
                    <a href={sentLink} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon className="size-5" />
                      Abrir WhatsApp
                    </a>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      reset();
                      setSentLink(null);
                    }}
                  >
                    Hacer otro pedido
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div>
                  <Label htmlFor="name">Tu nombre</Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder="Ej. Liz Martínez"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                  />
                  <FieldError id="name-error" message={errors.name?.message} />
                </div>

                <div>
                  <Label htmlFor="type">¿Qué se te antoja?</Label>
                  <Select
                    id="type"
                    aria-invalid={!!errors.type}
                    aria-describedby={errors.type ? "type-error" : undefined}
                    {...register("type")}
                  >
                    <option value="" disabled>
                      Elige una opción
                    </option>
                    {orderTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </Select>
                  <FieldError id="type-error" message={errors.type?.message} />
                </div>

                <fieldset>
                  <legend className="mb-1.5 text-sm font-semibold text-stone-800">
                    ¿Cómo lo recibes?
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-pink-100 bg-white/90 p-4 text-sm font-semibold text-stone-800 transition hover:border-pink-300 has-[:checked]:border-pink-600 has-[:checked]:bg-pink-50 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-pink-100">
                      <input
                        type="radio"
                        value="domicilio"
                        className="size-4 accent-pink-600"
                        {...register("delivery")}
                      />
                      <MapPin className="size-4 text-pink-700" aria-hidden="true" />
                      Envío a domicilio
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-pink-100 bg-white/90 p-4 text-sm font-semibold text-stone-800 transition hover:border-pink-300 has-[:checked]:border-pink-600 has-[:checked]:bg-pink-50 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-pink-100">
                      <input
                        type="radio"
                        value="recoger"
                        className="size-4 accent-pink-600"
                        {...register("delivery")}
                      />
                      <Store className="size-4 text-pink-700" aria-hidden="true" />
                      Paso a recoger
                    </label>
                  </div>
                </fieldset>

                {delivery === "domicilio" && (
                  <div>
                    <Label htmlFor="address">Calle y colonia</Label>
                    <Input
                      id="address"
                      autoComplete="street-address"
                      placeholder="Ej. Av. Reforma 123, Col. Centro"
                      aria-invalid={!!errors.address}
                      aria-describedby={errors.address ? "address-error" : undefined}
                      {...register("address")}
                    />
                    <FieldError id="address-error" message={errors.address?.message} />
                  </div>
                )}

                <div>
                  <Label htmlFor="details">Tu pedido o tu duda</Label>
                  <Textarea
                    id="details"
                    placeholder="Ej. 2 carlotas de limón y 1 litro de horchata para el sábado"
                    aria-invalid={!!errors.details}
                    aria-describedby={errors.details ? "details-error" : undefined}
                    {...register("details")}
                  />
                  <FieldError id="details-error" message={errors.details?.message} />
                </div>

                <Button
                  type="submit"
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  <WhatsAppIcon className="size-5" />
                  Enviar por WhatsApp
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
