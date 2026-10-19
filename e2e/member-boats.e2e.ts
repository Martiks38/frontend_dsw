import { expect, type Page, test } from '@playwright/test';

const MEMBER = {
  email: process.env.E2E_MEMBER_EMAIL ?? 'julian.pereyra@gmail.com',
  password: process.env.E2E_MEMBER_PASSWORD ?? 'Password123!',
};

async function loginAsMember(page: Page) {
  await page.goto('/iniciar-sesion');

  await page.getByLabel('Email', { exact: true }).fill(MEMBER.email);
  // el botón de mostrar/ocultar contraseña también puede contener "contraseña"
  await page.getByLabel('Contraseña', { exact: true }).fill(MEMBER.password);
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  await expect(page).toHaveTitle(/Dashboard/);
}

test('un socio inicia sesión y ve sus embarcaciones', async ({ page }) => {
  await loginAsMember(page);

  // La sesión vive en una cookie httpOnly: no debe ser legible desde JS.
  const cookies = await page.context().cookies();
  expect(cookies.some((cookie) => cookie.httpOnly)).toBe(true);

  const nav = page.getByRole('navigation', { name: 'Secciones del panel' });
  await nav.getByRole('link', { name: 'Mis embarcaciones' }).click();

  await expect(page).toHaveTitle(/Mis embarcaciones/);

  const main = page.getByRole('main');
  const cards = main.locator('section[aria-labelledby="page-heading"]');
  const emptyMessage = main.getByText(/No hay embar\w*ciones registradas/);

  await expect(cards.or(emptyMessage)).toBeVisible();
});

test('el sidebar se expande y se contrae', async ({ page }) => {
  await loginAsMember(page);

  const toggle = page.getByRole('button', { name: 'Menú de navegación' });
  const nav = page.getByRole('navigation', { name: 'Secciones del panel' });
  const navWidth = async () => (await nav.boundingBox())?.width ?? 0;

  // Contraído por defecto.
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect.poll(navWidth).toBeLessThan(100);

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect.poll(navWidth).toBeGreaterThan(150);

  // Por debajo de 640px el sidebar tapa todo y el contenido sale del árbol.
  if ((page.viewportSize()?.width ?? 1280) < 640) {
    await expect(page.getByRole('main')).toBeHidden();
  }

  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await expect.poll(navWidth).toBeLessThan(100);
});
