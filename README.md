# DeLIZcias – Landing Page

Landing page de DeLIZcias (postres, bebidas, antojitos y botanas) pensada para convertir visitas en pedidos por WhatsApp.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · framer-motion · Lenis · react-hook-form + zod · lucide-react.

## Empezar

```bash
npm install
cp .env.example .env.local   # y pon tu número de WhatsApp
npm run dev                  # http://localhost:3000
```

Otros comandos: `npm run build`, `npm run start`, `npm run typecheck`.

## Lo primero que tienes que cambiar

1. **Número de WhatsApp:** `.env.local` → `NEXT_PUBLIC_WHATSAPP_NUMBER` (código de país + número, solo dígitos; México: `521` + 10 dígitos).
2. **Logo y fotos:** `src/config/assets.ts`. Todas las URLs de imágenes están ahí. Para usar archivos propios, ponlos en `/public` y cambia la URL por la ruta local (por ejemplo `/brand/logo.svg`).
3. **Horario, redes sociales y menú de navegación:** `src/config/site.ts`.
4. **Categorías, presentaciones, textos de pago y opciones del formulario:** `src/config/catalog.ts`. Las presentaciones ("Vaso o charola", etc.) y los detalles de pago son ejemplos: ajústalos a tu negocio.

## Estructura

```
src/
├─ app/                 layout, página y estilos globales (tokens de Tailwind v4)
├─ config/              assets, datos del sitio y catálogo (lo que editarás)
├─ components/
│  ├─ sections/         Navbar, Hero, Marquee, Bento, Pagos, Formulario, Footer, WhatsApp flotante
│  ├─ ui/               Button, Badge, campos de formulario, íconos, FoodImage
│  ├─ magic/            Marquee, Reveal, WordReveal
│  └─ providers/        Smooth scroll (Lenis)
└─ lib/utils.ts
```

Las secciones sin estado (Marquee, Bento, Footer, botón flotante) son Server Components. Solo son Client Components las que necesitan interacción: Navbar, Hero, Pagos y Formulario.

## Notas

- Si una foto de Unsplash no carga, la tarjeta muestra un fondo de color con un emoji en lugar de un cuadro vacío.
- `@studio-freight/lenis` está marcado como obsoleto en npm (ahora se llama `lenis`). Funciona igual; para migrar cambia el paquete y el import en `src/components/providers/smooth-scroll.tsx`.
- Respeta `prefers-reduced-motion`: sin scroll inercial ni animaciones continuas para quien lo tenga activado.
