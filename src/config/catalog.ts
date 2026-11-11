import type { CategoryImageKey } from "./assets";

/**
 * Catálogo visual y métodos de pago.
 * Las presentaciones y descripciones son de ejemplo: ajústalas a tu menú real.
 */

export type Category = {
  id: CategoryImageKey;
  emoji: string;
  title: string;
  description: string;
  /** Presentación que aparece como insignia sobre la foto. */
  presentation: string;
  /** Clases de posición en el Bento Grid (escritorio). */
  span: string;
};

export const categories: Category[] = [
  {
    id: "postres",
    emoji: "🍰",
    title: "Postres",
    description: "Carlotas y gelatinas hechas en casa, listas para compartir.",
    presentation: "Vaso o charola",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: "bebidas",
    emoji: "🥤",
    title: "Bebidas",
    description: "Horchata y jamaica bien frías.",
    presentation: "Vaso o litro",
    span: "lg:col-span-2",
  },
  {
    id: "antojitos",
    emoji: "🥞",
    title: "Antojitos",
    description: "Hotcakes y vaquitas locas.",
    presentation: "Orden individual",
    span: "lg:col-span-1",
  },
  {
    id: "botanas",
    emoji: "🍿",
    title: "Botanas",
    description: "Chicharrones y gomiboings.",
    presentation: "Bolsa",
    span: "lg:col-span-1",
  },
  {
    id: "congelados",
    emoji: "❄️",
    title: "Productos congelados",
    description: "Yogurt congelado y cubitos para los días de calor.",
    presentation: "Vaso o bolsa",
    span: "md:col-span-2 lg:col-span-4",
  },
];

export const marqueeItems = [
  "Postres caseros",
  "Bebidas frías",
  "Antojitos calientes",
  "Botanas deliciosas",
  "Envíos rápidos",
  "Pedidos por WhatsApp",
];

export const heroProducts = [
  { key: "carlota", name: "Carlotas", note: "Postre" },
  { key: "vaquita", name: "Vaquitas locas", note: "Antojito" },
  { key: "horchata", name: "Horchata", note: "Bebida" },
] as const;

export type PaymentMethod = {
  id: "efectivo" | "transferencia" | "tarjeta";
  title: string;
  summary: string;
  detail: string;
};

export const paymentMethods: PaymentMethod[] = [
  {
    id: "efectivo",
    title: "Efectivo",
    summary: "Paga al recibir",
    detail:
      "Pagas en efectivo cuando recibes tu pedido o cuando pasas a recogerlo. Si necesitas cambio, avísanos al confirmar.",
  },
  {
    id: "transferencia",
    title: "Transferencia bancaria",
    summary: "Paga desde tu app",
    detail:
      "Te mandamos los datos de la cuenta por WhatsApp al confirmar tu pedido. Envíanos tu comprobante y lo preparamos.",
  },
  {
    id: "tarjeta",
    title: "Tarjeta",
    summary: "Débito o crédito",
    detail:
      "Aceptamos tarjeta de débito y crédito. Dinos al hacer tu pedido que pagarás con tarjeta para llevar la terminal.",
  },
];

export const orderTypes = [
  { value: "postres", label: "Postres" },
  { value: "bebidas", label: "Bebidas" },
  { value: "antojitos", label: "Antojitos" },
  { value: "botanas", label: "Botanas" },
  { value: "congelados", label: "Productos congelados" },
  { value: "duda", label: "Tengo una duda" },
] as const;
