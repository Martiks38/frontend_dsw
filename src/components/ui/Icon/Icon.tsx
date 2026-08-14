'use client';

import type { IconName } from '@/types';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  id: IconName;
  size?: number;
  title: string;
}

export default function Icon({
  id,
  size = 24,
  className,
  title,
  ...rest
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <title>{title}</title>
      <use href={`#${id}`} />
    </svg>
  );
}
