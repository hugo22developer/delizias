import { Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/sections/logo";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/ui/icons";

const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-pink-100 bg-gradient-to-b from-white to-pink-50 px-4 pb-10 pt-16 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo variant="footer" />
          <p className="mt-4 max-w-xs leading-relaxed text-stone-600">
            {siteConfig.tagline}, hechos para que te antojes y pidas fácil.
          </p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-base font-bold text-stone-900">
            <Clock className="size-4 text-pink-700" aria-hidden="true" />
            Horario de atención
          </h2>
          <dl className="mt-4 space-y-2 text-stone-700">
            {siteConfig.hours.map((row) => (
              <div key={row.days} className="flex justify-between gap-4 text-sm">
                <dt>{row.days}</dt>
                <dd className="font-semibold">{row.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="text-base font-bold text-stone-900">Síguenos</h2>
          <ul className="mt-4 flex gap-3">
            {siteConfig.socials.map((social) => {
              const Icon = socialIcons[social.id];
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-11 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-700 transition hover:-translate-y-0.5 hover:bg-pink-600 hover:text-white hover:shadow-lg hover:shadow-pink-500/25 active:scale-95"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-pink-100 pt-6 text-sm text-stone-600 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos
          reservados.
        </p>
        <p>Hecho con cariño y mucho antojo por {siteConfig.name}.</p>
      </div>
    </footer>
  );
}
