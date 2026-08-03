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
  | 'repairs';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  id: IconId;
  size?: number;
}

export default function Icon({ id, size = 24, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <use href={`#${id}`} />
    </svg>
  );
}
