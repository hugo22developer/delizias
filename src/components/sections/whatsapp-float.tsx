import { whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Botón flotante persistente. El tooltip se muestra con hover o con foco de teclado. */
export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hacer un pedido por WhatsApp"
        className="group relative flex size-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-600/40 transition duration-200 hover:scale-110 hover:bg-emerald-700 active:scale-95"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-emerald-500/60 motion-safe:animate-ping [animation-duration:2.4s]"
        />
        <WhatsAppIcon className="size-8" />

        <span
          role="tooltip"
          className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-lg transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        >
          ¡Haz tu pedido aquí! 🍓
        </span>
      </a>
    </div>
  );
}
