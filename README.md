# App Admin Test

Starter frontend con `Angular 21`, `Ng-Zorro 21`, rutas standalone, base responsive, pruebas unitarias y archivos iniciales para Docker.

## Requisitos (multi-plataforma)

El proyecto es compatible con **macOS**, **Windows** y **Linux**. Los requisitos base son los mismos en todos los sistemas:

| Requisito | Versión mínima |
|-----------|----------------|
| Node.js   | 22.x (LTS recomendada) |
| npm       | 10.x |
| Git       | Cualquiera reciente |

### Instalación de requisitos por sistema operativo

| SO | Node.js / npm |
|----|---------------|
| **macOS** | [nvm](https://github.com/nvm-sh/nvm) o descarga desde [nodejs.org](https://nodejs.org) |
| **Linux** | `nvm` o gestor de paquetes (`apt`, `dnf`, etc.) según tu distribución |
| **Windows** | [nvm-windows](https://github.com/coreybutler/nvm-windows) o instalador desde [nodejs.org](https://nodejs.org) |

> **Windows:** Para una experiencia similar a Unix, opcionalmente puedes usar [WSL 2](https://learn.microsoft.com/windows/wsl/install) + Node dentro de WSL.

### Docker (opcional)

Si vas a usar contenedores:

- **macOS / Linux:** Docker Engine o Docker Desktop
- **Windows:** Docker Desktop (con WSL 2 o Hyper-V)

## Comandos

En cualquier sistema, tras clonar el repositorio:

```bash
npm install
npm run api:db:init
npm start
```

La app quedará disponible en `http://localhost:4200` y el API en `http://localhost:3000`.

### Nota para Windows (sin WSL)

El comando `npm start` intenta liberar el puerto 3000 antes de iniciar. Si usas Windows sin WSL ni Git Bash, ese paso puede fallar. En ese caso:

- Cierra manualmente cualquier proceso en el puerto 3000, o
- Usa WSL 2 o Git Bash para ejecutar los comandos

## Scripts útiles

```bash
npm run api:db:init
npm start
npm run start:front
npm run api
npm run build:prod
npm run test:ci
```

## Pruebas y cobertura

```bash
npm run test:ci          # Ejecuta tests con cobertura (sin watch, modo CI)
npm run test             # Ejecuta tests en modo interactivo (watch)
```

### Configuración de cobertura

| Parámetro | Valor | Descripción |
|-----------|-------|-------------|
| **Umbrales mínimos** | | |
| Statements | 80% | Porcentaje de sentencias ejecutadas |
| Branches | 75% | Porcentaje de ramas probadas |
| Functions | 80% | Porcentaje de funciones cubiertas |
| Lines | 80% | Porcentaje de líneas cubiertas |
| **Incluidos** | `src/app/**/*.ts` | Archivos que se miden |
| **Excluidos** | `**/*.spec.ts`, `**/*.routes.ts`, `**/main.ts`, `**/*.interface.ts`, `**/app.config.ts`, `**/index.ts` | Archivos excluidos del reporte |
| **Salida** | `coverage/` | Reporte HTML generado tras los tests |

Configuración en `angular.json` (test options) y `vitest.config.ts` (pool: threads para estabilidad en CI).

## Make (macOS y Linux)

En sistemas Unix, dispones de estos atajos:

```bash
make install
make api-db-init
make api
make start
make build
make test
make docker-up
make docker-down
```

En **Windows**, usa directamente los scripts de npm (ver [Scripts útiles](#scripts-útiles)).

## Docker

```bash
docker compose up --build
```

## Demostraciones

Vídeos o capturas del uso de la aplicación en diferentes dispositivos:

### Desktop

![Desktop-App-Fondo](https://github.com/user-attachments/assets/836b6519-fb7b-4a64-b413-e03109622023)

### Mobile

<!-- Aquí: capturas, GIFs o enlaces a vídeo mostrando el uso en móvil/responsive -->

