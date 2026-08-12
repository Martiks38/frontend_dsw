interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'crane',
    src: '/images/facilities/facilities-crane.webp',
    alt: 'Grúa pórtico de izado y movimiento para embarcaciones',
  },
  {
    id: 'dry-marina',
    src: '/images/facilities/facilities-dry-marina.webp',
    alt: 'Lancha a motor sobre caballetes de apoyo en la marina seca',
  },
  {
    id: 'docks',
    src: '/images/facilities/facilities-docks.webp',
    alt: 'Embarcaciones y veleros amarrados en los muelles de la marina',
  },
  {
    id: 'warehouse',
    src: '/images/facilities/facilities-warehouse.webp',
    alt: 'Interior de nave industrial o galpón de guardería náutica en altura',
  },
];
