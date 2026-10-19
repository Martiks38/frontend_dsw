# MarinaGuard — Frontend

Aplicación web para la gestión de una guardería náutica: cada socio administra sus embarcaciones y solicita servicios, los operarios atienden las tareas asignadas y los administradores gestionan socios, empleados, embarcaciones y contratos de guarda.

Este repositorio contiene el **frontend** (Next.js). El backend (NestJS) vive en un repositorio aparte y es necesario para que la aplicación funcione.

> Trabajo práctico de la materia **Desarrollo de Software** — UTN Facultad Regional Rosario.
> Autor: Giuliano Martín Cappa.

## Tecnologías

- [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Zod 4](https://zod.dev/) para validación de formularios
- [lucide-react](https://lucide.dev/) para íconos
- [Vitest](https://vitest.dev/) + Testing Library para tests unitarios y de componentes
- [Playwright](https://playwright.dev/) para tests end-to-end
- ESLint 9 + Prettier + Husky + lint-staged para calidad de código
- Gestor de paquetes: **pnpm**

## Requisitos previos

- Node.js 20.9 o superior (requisito de Next.js 16)
- [pnpm](https://pnpm.io/installation)
- El **backend** de MarinaGuard corriendo y accesible

## Instalación

1. Cloná el repositorio y entrá a la carpeta del frontend:

   ```bash
   git clone https://github.com/Martiks38/frontend_dsw
   cd frontend_dsw
   ```

2. Instalá las dependencias:

   ```bash
   pnpm install
   ```

3. Creá un archivo `.env` en la raíz del proyecto:

   ```dotenv
   API_URL=http://localhost:3001
   ```

   | Variable  | Descripción                                                                                                                            |
   | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
   | `API_URL` | URL base del backend, **sin** el sufijo `/api` ni barra final. Solo se usa del lado del servidor (Server Components y Server Actions). |

   <!-- TODO: agregar acá cualquier otra variable de entorno que use el proyecto, si existiera -->

4. Asegurate de que el backend esté corriendo en esa URL y de que su variable `FRONTEND_URL` apunte a donde corre este frontend (por defecto `http://localhost:3000`), porque de eso depende la configuración de CORS y los links de los emails.

## Ejecución

```bash
# Modo desarrollo (http://localhost:3000)
pnpm dev

# Build de producción
pnpm build

# Servir el build de producción
pnpm start
```

## Tests

```bash
# Tests unitarios y de componentes (modo watch)
pnpm test

# Tests unitarios y de componentes (una sola corrida)
pnpm test:run

# Tests unitarios con interfaz gráfica
pnpm test:ui
```

Los tests end-to-end usan Playwright. La primera vez hay que descargar los navegadores:

```bash
pnpm exec playwright install
```

```bash
# Tests end-to-end
pnpm test:e2e

# Tests end-to-end con interfaz gráfica
pnpm test:e2e:ui
```

<!-- TODO: confirmar si playwright.config.ts levanta el servidor de desarrollo por su cuenta y si los tests e2e requieren el backend corriendo con datos del seed -->

## Calidad de código

```bash
# Linter
pnpm lint

# Linter con corrección automática
pnpm lint:fix

# Chequeo de tipos sin emitir archivos
pnpm typecheck
```

Husky y lint-staged corren validaciones automáticas antes de cada commit.

## Estructura del proyecto

```
src/
  app/
    (public)/            # Páginas públicas: inicio, login
    (dashboard)/         # Área autenticada (layout con sidebar y título de página)
      dashboard/         # Panel principal, solicitudes, servicios, embarcaciones,
                         # clientes, empleados, guardería y perfil
    actions/             # Server Actions agrupadas por dominio (boat, client, employee, profile, ...)
  components/
    ui/                  # Componentes reutilizables (StatCard, StatusBadge, ConfirmDialog, Pagination, ...)
    ...                  # Componentes por funcionalidad (dashboard, boats, service-request, perfil, ...)
  interfaces/            # Tipos TypeScript de los datos que devuelve el backend
  validations/           # Esquemas Zod de los formularios
  data/                  # Datos estáticos (por ejemplo, el catálogo de servicios con sus íconos)
  lib/                   # Utilidades de servidor: auth, fetch autenticado al backend, etc.
```

## Arquitectura

- **Server Components por defecto.** Las páginas obtienen sus datos en el servidor con `serverFetch`, un helper que reenvía la cookie de sesión al backend y devuelve `null` ante cualquier falla (sin sesión, timeout, error del servidor).
- **Autenticación con cookie httpOnly.** El JWT nunca es accesible desde JavaScript del navegador. Frontend y backend están en dominios distintos, por lo que el navegador no envía la cookie al backend directamente: toda llamada autenticada pasa por el servidor de Next.js (Server Components o Server Actions), que lee la cookie y la reenvía.
- **Server Actions para mutaciones.** Los formularios (alta de clientes, empleados y embarcaciones, cambio de contraseña, solicitud de servicios, etc.) usan Server Actions con `useActionState`, validación con Zod del lado del servidor y errores por campo.
- **Un único panel, tres roles.** La vista cambia según el rol del usuario autenticado; además, el backend calcula qué acciones puede ejecutar cada usuario sobre cada solicitud, y el frontend solo las muestra.
- **Componentes cliente solo donde hay interactividad** (filtros, wizard de solicitud, diálogos de confirmación).

## Roles y funcionalidades

- **Socio**: ve el resumen de su cuenta, sus embarcaciones y el estado de su guarda; solicita uno o varios servicios para una embarcación con un asistente paso a paso; consulta el detalle de sus solicitudes y cancela las que siguen pendientes; edita su perfil y cambia su contraseña.
- **Operario**: ve sus tareas del día y su próxima tarea; consulta las solicitudes que tiene asignadas; actualiza su estado (en proceso / completada) y deja comentarios internos; registra la salida y el regreso de embarcaciones en los servicios de botadura y retiro.
- **Administrador**: ve el resumen general del sistema; gestiona socios, empleados y embarcaciones (alta de embarcación junto con su contrato de guarda); activa o desactiva cuentas; asigna operarios a las solicitudes pendientes; hace seguimiento de los servicios en curso y de la ocupación de la guardería.

Además, cualquier usuario puede recuperar su contraseña por email desde la pantalla de inicio de sesión.

## Accesibilidad

Se priorizó el HTML semántico y la navegación por teclado y lector de pantalla:

- Estructura con regiones (`header`, `nav`, `section`, `article`) y jerarquía de encabezados coherente.
- Todos los campos de formulario tienen `label` asociado, agrupación con `fieldset`/`legend` cuando corresponde, y errores vinculados con `aria-describedby` / `aria-invalid`.
- Mensajes de resultado y error anunciados con `role="status"` y `aria-live`.
- Tablas reales (`caption`, `th scope`) solo para datos tabulares; listas de definición (`dl`) para pares etiqueta-valor.
- Diálogos de confirmación con el elemento nativo `<dialog>` (foco atrapado y cierre con `Escape`).
- Indicadores de foco visibles y estado actual marcado con `aria-current`.

## Credenciales de prueba

Si el backend se cargó con los datos de ejemplo (`pnpm db:seed` en el repositorio del backend), todos los usuarios tienen la contraseña `Password123!`:

| Rol             | Email                               |
| --------------- | ----------------------------------- |
| Administrador   | `valentina.suarez@nautico.com.ar`   |
| Operario        | `marcos.ibanez@nautico.com.ar`      |
| Socio           | `julian.pereyra@gmail.com`          |
| Socio (empresa) | `contacto@nauticadellitoral.com.ar` |

## Despliegue

<!-- TODO: completar con las URLs reales una vez definidas -->

- **Aplicación en producción (Vercel):** _pendiente_
- **API en producción (Render):** _pendiente_

## Documentación

- Instrucciones de instalación y ejecución: este documento.
- Documentación de la API y del modelo de datos: ver el repositorio del backend [readme backend](https://github.com/Martiks38/backend_dsw/blob/main/README.md).
- Propuesta del trabajo práctico: [proposal.md](https://github.com/Martiks38/tp_desarrollo_software/blob/main/proposal.md).

## Contacto

Giuliano Martín Cappa — UTN Facultad Regional Rosario, Desarrollo de Software.
