import { describe, expect, it } from 'vitest';

import { formatDateAR, formatDateTimeAR, formatTimeAR } from './datetime.util';

describe('datetime.util (America/Argentina/Buenos_Aires)', () => {
  it('convierte un ISO UTC a fecha y hora de Argentina, independiente del huso local', () => {
    // 15:30 UTC = 12:30 en Buenos Aires (UTC-3)
    const iso = '2026-10-17T15:30:00.000Z';

    expect(formatDateTimeAR(iso)).toBe('17/10/2026 12:30');
    expect(formatDateAR(iso)).toBe('17/10/2026');
    expect(formatTimeAR(iso)).toBe('12:30');
  });

  it('cambia el día calendario cuando UTC cae en el día anterior en Argentina', () => {
    // 02:00 UTC = 23:00 del día anterior en Buenos Aires
    const iso = '2026-10-17T02:00:00.000Z';

    expect(formatDateTimeAR(iso)).toBe('16/10/2026 23:00');
  });

  it('formatea una fecha ISO sin hora como DD/MM/AAAA sin corrimiento de día', () => {
    expect(formatDateTimeAR('2026-10-17')).toBe('17/10/2026');
    expect(formatDateAR('2026-10-17')).toBe('17/10/2026');
  });
});
