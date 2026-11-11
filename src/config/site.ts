/** Datos generales del negocio. Edita aquí y se actualiza en toda la página. */

const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5210000000000";

export const siteConfig = {
  name: "DeLIZcias",
  tagline: "Postres, bebidas, antojitos y botanas",
  description:
    "DeLIZcias: postres caseros, bebidas frías, antojitos y botanas con entrega a domicilio. Haz tu pedido por WhatsApp.",
  /** Solo dígitos, con código de país. Se configura en .env.local */
  whatsappNumber: rawNumber.replace(/\D/g, ""),
  defaultMessage: "Hola DeLIZcias, quisiera hacer un pedido",
  hours: [
    { days: "Lunes a viernes", time: "10:00 a 20:00" },
    { days: "Sábados", time: "10:00 a 18:00" },
    { days: "Domingos", time: "Cerrado" },
  ],
  socials: [
    { id: "instagram", label: "Instagram de DeLIZcias", href: "#" },
    { id: "facebook", label: "Facebook de DeLIZcias", href: "#" },
    { id: "tiktok", label: "TikTok de DeLIZcias", href: "#" },
  ],
  nav: [
    { label: "Inicio", href: "#inicio" },
    { label: "Categorías", href: "#categorias" },
    { label: "Métodos de pago", href: "#pagos" },
    { label: "Contacto", href: "#contacto" },
  ],
} as const;

/** Enlace directo a WhatsApp con mensaje prellenado. */
export function whatsappLink(message: string = siteConfig.defaultMessage) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
