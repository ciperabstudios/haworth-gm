<div align="center">
    <img src="https://media.discordapp.net/attachments/1416081559945216020/1416081640383578172/logo.png?ex=69f0d0cc&is=69ef7f4c&hm=5f185a147a9c09432cda09caba2f9f86e3c7f6006cff9c6d8bb613f7c25d08a8" width="400" alt="Haworth Roleplay logo." title="Haworth Roleplay logo." />
</div>

---

## English

### Overview
- The project is a SA-MP/open.mp gamemode for a roleplay server made in TypeScript, created with [@infernus/core](https://github.com/dockfries/infernus) by dockfries, in collaboration with Ciperab Studios.

### Features
- [Player authentication and registration](src/modules/server/auth/).
- [In-game chat system](src/modules/server/chat/).
- [Vehicle management, customization, and spawning](src/modules/vehicles/).
- [Weapon handling and damage tracking](src/modules/weapons/).
- [Economy system with payday and banking](src/modules/economy/).
- [Business ownership and management](src/modules/business/).
- [Job assignments and payments](src/modules/jobs/).
- [Faction membership and permissions](src/modules/factions/).
- [House ownership and properties](src/modules/house/).
- [Phone system with messaging](src/modules/phone/).
- [Administrative tools and reports](src/modules/staff/).
- [Custom maps, objects, and textdraws](src/modules/maps/), [objects](src/modules/objects/), [textdraws](src/modules/textdraws/).
- [Animation systems](src/modules/animations/), [inventory systems](src/modules/inventory/).

### Tech Stack
- Framework: Infernus 0.14.4
- Language: TypeScript 5.3.3
- Database: MongoDB with Mongoose as ODM
- Build: @rslib/core
- Logging: Winston
- Utilities: dayjs, moment, bcryptjs
- Package Manager: pnpm

### Architecture
- Modular pattern: Each feature in `src/modules/` is self-contained with `index.ts`, `commands.ts`, `core.ts`, etc.
- Event-driven: Uses Infernus lifecycle events and custom events in `src/classes/events/`.
- Manager pattern: DialogManager, PaginatedDialog, TimerManager in `src/classes/managers/`.
- Command hierarchy: Base `Command` class, extended by `FactionCommand` and `StaffCommand` in `src/classes/commands/`.
- Database access: Mongoose schemas in `src/database/` for type-safe operations.

### Project Structure
- `src/main.ts`: Main entry.
- `src/modules/`: Core features.
- `src/events/`: Event handlers.
- `src/database/`: MongoDB schemas.
- `src/classes/`: Base classes for commands, events, managers.
- `src/utils/`: Utility functions.
- `gamemodes/`: Pawn scripts (e.g., `polyfill.pwn`).
- `filterscripts/`: Additional scripts.
- `models/`: Game assets (TXD, DFF files).
- `scriptfiles/`: Configuration files.
- `package.json`: Dependencies and scripts.

### Setup & Execution
- Install: `pnpm install` (from `package.json`).
- Dev: `npm run dev` (watches and runs dev server via PowerShell script).
- Build: `npm run build` (produces `dist/bundle.js` via rslib).


---


## Español

### Descripción General
- El proyecto es un gamemode de SA-MP/open.mp para un servidor de roleplay hecho en TypeScript, creado utilizando la librería [@infernus/core](https://github.com/dockfries/infernus) hecha por dockfries, en colaboración con Ciperab Studios.

### Funcionalidades
- [Autenticación y registro de jugadores](src/modules/server/auth/).
- [Sistema de chat en juego](src/modules/server/chat/).
- [Gestión, personalización y spawn de vehículos](src/modules/vehicles/).
- [Manejo de armas y seguimiento de daño](src/modules/weapons/).
- [Sistema económico con payday y banca](src/modules/economy/).
- [Propiedad y gestión de negocios](src/modules/business/).
- [Asignación de trabajos y pagos](src/modules/jobs/).
- [Membresía y permisos de facciones](src/modules/factions/).
- [Propiedad de casas e interiores](src/modules/house/).
- [Sistema telefónico con mensajería](src/modules/phone/).
- [Herramientas administrativas y reportes](src/modules/staff/).
- [Mapas personalizados](src/modules/maps/), [objetos](src/modules/objects/), [textdraws](src/modules/textdraws/).
- [Sistemas de animaciones](src/modules/animations/), [inventario](src/modules/inventory/).

### Stack Tecnológico
- Framework: Infernus 0.14.4
- Lenguaje: TypeScript 5.3.3
- Base de datos: MongoDB con Mongoose como ODM
- Build: @rslib/core
- Logging: Winston
- Utilidades: dayjs, moment, bcryptjs
- Gestor de paquetes: pnpm

### Arquitectura
- Patrón modular: Cada característica en `src/modules/` es autocontenida con `index.ts`, `commands.ts`, `core.ts`, etc.
- Orientada a eventos: Usa eventos de ciclo de vida de Infernus y eventos personalizados en `src/classes/events/`.
- Patrón manager: DialogManager, PaginatedDialog, TimerManager en `src/classes/managers/`.
- Jerarquía de comandos: Clase base `Command`, extendida por `FactionCommand` y `StaffCommand` en `src/classes/commands/`.
- Acceso a base de datos: Esquemas de Mongoose en `src/database/` para operaciones con tipos seguros.

### Estructura del Proyecto
- `src/main.ts`: Entrada principal.
- `src/modules/`: Características principales.
- `src/events/`: Manejadores de eventos.
- `src/database/`: Esquemas MongoDB.
- `src/classes/`: Clases base para comandos, eventos, managers.
- `src/utils/`: Funciones utilitarias.
- `gamemodes/`: Scripts Pawn (ej. `polyfill.pwn`).
- `filterscripts/`: Scripts adicionales.
- `models/`: Assets del juego (archivos TXD, DFF).
- `scriptfiles/`: Archivos de configuración.
- `package.json`: Dependencias y scripts.

### Instalación y Ejecución
- Instalar: `pnpm install` (de `package.json`).
- Dev: `npm run dev` (vigila y ejecuta servidor dev vía script PowerShell).
- Build: `npm run build` (produce `dist/bundle.js` vía rslib).