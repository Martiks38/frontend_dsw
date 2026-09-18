'use client';

import { useEffect, useState } from 'react';

export function useIsVisible(
  ref: React.RefObject<Element | null>,
  options?: IntersectionObserverInit
) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const elem = ref.current;

    if (!elem) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    observer.observe(elem);

    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
}
