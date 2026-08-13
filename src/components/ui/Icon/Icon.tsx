'use client';

export type IconId =
  | 'security'
  | 'fuel'
  | 'cleaning'
  | 'integral-care'
  | 'maintenance'
  | 'secure-storage'
  | 'on-demand-availability'
  | 'boat-launch-and-retrieval'
  | 'battery-charging'
  | 'repairs'
  | 'certificate'
  | 'communication'
  | 'anchor'
  | 'handshake'
  | 'compass';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  id: IconId;
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
