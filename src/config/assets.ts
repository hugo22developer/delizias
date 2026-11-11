/**
 * Todas las imágenes e íconos de la marca viven aquí.
 *
 * Para reemplazar un recurso por el real:
 *   1. Pon el archivo en /public (por ejemplo /public/brand/logo.svg).
 *   2. Cambia la URL de abajo por la ruta local ("/brand/logo.svg").
 *
 * Las fotos de producto usan Unsplash mediante el ID de la foto. Si alguna no
 * te gusta, cambia solo el ID (la parte "photo-...") o pon tu propia foto.
 * Si una imagen falla al cargar, la página muestra un fondo de color en su lugar.
 */

const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const assets = {
  logo: {
    // Placeholder: reemplaza por tu logotipo (idealmente SVG o PNG transparente).
    header: "https://placehold.co/200x80/fdf2f8/db2777?text=DeLIZcias+Logo",
    footer: "https://placehold.co/200x80/fdf2f8/db2777?text=DeLIZcias+Logo",
    alt: "DeLIZcias",
    width: 200,
    height: 80,
  },

  /** Fotos de las 5 categorías del catálogo. */
  categories: {
    postres: unsplash("photo-1578985545062-69928b1d9587"),
    bebidas: unsplash("photo-1544145945-f90425340c7e"),
    antojitos: unsplash("photo-1567620905732-2d1ec7ab7445"),
    botanas: unsplash("photo-1566478989037-eec170784d0b"),
    congelados: unsplash("photo-1563805042-7684c019e1cb", 1600),
  },

  /** Productos estrella del Hero. */
  hero: {
    carlota: unsplash("photo-1565958011703-44f9829ba187", 800),
    vaquita: unsplash("photo-1551024601-bec78aea704b", 800),
    horchata: unsplash("photo-1556679343-c7306c1976bc", 800),
  },
} as const;

export type CategoryImageKey = keyof typeof assets.categories;
