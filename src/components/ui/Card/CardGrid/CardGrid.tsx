import Image from 'next/image';

import styles from './CardGrid.module.css';

export interface CardItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export default function CardGrid({ cards }: { cards: CardItem[] }) {
  return (
    <ul
      role="list"
      className={`${styles.grid} m-0 grid list-none grid-cols-1 gap-7 p-0`}
    >
      {cards.map(({ id, title, description, imageSrc, imageAlt }) => {
        return (
          <li key={id} className="w-full">
            <article className={styles.card_content}>
              <figure className={styles.image_container}>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  title={imageAlt}
                  fill
                  loading="lazy"
                  className="object-cover object-center"
                />
              </figure>
              <div className="flex grow flex-col p-6 text-left">
                <h3 className="mb-2 text-2xl font-bold">{title}</h3>
                <p className="mb-2 text-lg leading-relaxed">{description}</p>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
