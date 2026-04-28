<div align="center">
    <img src="https://media.discordapp.net/attachments/1416081559945216020/1416081640383578172/logo.png?ex=69f0d0cc&is=69ef7f4c&hm=5f185a147a9c09432cda09caba2f9f86e3c7f6006cff9c6d8bb613f7c25d08a8" width="400" alt="Haworth Roleplay logo." title="Haworth Roleplay logo." />
</div>

---

## English

### Overview
Haworth Roleplay is a modular, event-driven backend system built in TypeScript for a multiplayer game environment (SA-MP/open.mp), designed to simulate real-world systems such as economy, businesses, and player interactions.

The project focuses on system design, scalability, and translating real-world workflows into interactive systems.

### Purpose
This project serves as a personal engineering environment in which we design and experiment with systems inspired by real-world processes (economics, logistics, communication).

It enables us to learn continuously, test ideas, and enhance our ability to structure complex systems and interactions.

### What this project demonstrates
- Designing modular and scalable systems
- Structuring complex logic across multiple domains
- Event-driven architecture in a real-time environment
- Translating real-world processes into software systems
- Ownership of a long-term, evolving project

### Architecture
- **Modular System Design**  
  The project is structured around a modular architecture where each feature lives in its own isolated module under `src/modules/`. This allows systems to evolve independently, improves maintainability, and makes it easier to scale or extend specific domains without impacting others.

- **Event-Driven Communication**  
  Systems communicate primarily through events rather than direct dependencies. This reduces tight coupling between modules and enables more flexible interactions, especially in a real-time multiplayer environment where multiple systems must react to the same state changes.

- **Command Abstraction Layer**  
  A base `Command` class is used as a foundation and extended into more specialized command types (e.g., faction, staff). This enforces consistency across command handling while allowing domain-specific logic to remain clean and reusable.

- **Manager Pattern for Core Logic**  
  Shared responsibilities such as dialogs, timers, and state coordination are centralized into manager classes (e.g., `DialogManager`, `TimerManager`). This avoids duplication and creates a clear separation between orchestration logic and feature-specific behavior.

- **Separation of Concerns (Game Engine vs Application Logic)**  
  The system separates low-level game engine interactions (handled via Pawn scripts) from higher-level application logic written in TypeScript. This approach enables more modern development practices while still integrating with the constraints of the game environment.

- **Real-World System Modeling**  
  Many systems (economy, jobs, businesses) are designed to reflect real-world workflows. This requires structuring logic across multiple domains and coordinating interactions between them, reinforcing a system-oriented approach rather than isolated feature development.

- **Long-Term Iterative Development**  
  The project has been developed as an evolving system over time, with continuous refactoring and expansion. This has required maintaining backwards compatibility, improving structure progressively, and adapting systems as complexity grows.
  
### Core Systems
- **Player Systems**  
  [Authentication and registration](src/modules/server/auth/). Core entry point for player state and identity management.

- **Communication Systems**  
  [In-game chat](src/modules/server/chat/) and [phone messaging](src/modules/phone/), enabling real-time player interaction and coordination.

- **Economy System**  
  [Banking, transactions, and payday](src/modules/economy/), designed to simulate financial flows and player progression.

- **World & Ownership Systems**  
  [Businesses](src/modules/business/), [houses](src/modules/house/), and [jobs](src/modules/jobs/), defining how players generate value and interact with the environment.

- **Faction & Permission Systems**  
  [Factions and role-based permissions](src/modules/factions/), supporting structured group interactions.

- **Vehicle Systems**  
  [Vehicle management, customization, and spawning](src/modules/vehicles/), integrated with player and economy systems.

- **Combat Systems**  
  [Weapon handling and damage tracking](src/modules/weapons/), ensuring consistent interaction logic.

- **Inventory & Animation Systems**  
  [Inventory](src/modules/inventory/) and [animations](src/modules/animations/), supporting player actions and state representation.

- **Administration Systems**  
  [Staff tools and reporting](src/modules/staff/), designed for moderation and system oversight.

- **World Rendering Systems**  
  [Maps](src/modules/maps/), [objects](src/modules/objects/), and [textdraws](src/modules/textdraws/), handling visual and interactive world elements.

### Tech Stack
- Framework: Infernus 0.14.4
- Language: TypeScript 5.3.3
- Database: MongoDB with Mongoose as ODM
- Build: @rslib/core
- Logging: Winston
- Utilities: dayjs, moment, bcryptjs
- Package Manager: pnpm

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
Haworth Roleplay es un sistema backend modular y orientado a eventos construido en TypeScript para un entorno de juego multijugador (SA-MP/open.mp), diseñado para simular sistemas del mundo real como economía, negocios e interacciones entre jugadores.

El proyecto se centra en el diseño de sistemas, la escalabilidad y la traducción de flujos de trabajo del mundo real en sistemas interactivos.

---

### Propósito
Este proyecto sirve como un entorno de ingeniería personal en el que diseñamos y experimentamos con sistemas inspirados en procesos del mundo real (economía, logística, comunicación).

Permite aprender de forma continua, probar ideas y mejorar la capacidad de estructurar sistemas e interacciones complejas.

---

### Lo que este proyecto demuestra
- Diseño de sistemas modulares y escalables  
- Estructuración de lógica compleja en múltiples dominios  
- Arquitectura orientada a eventos en un entorno en tiempo real  
- Traducción de procesos del mundo real a sistemas de software  
- Propiedad y desarrollo de un proyecto a largo plazo y en evolución  

---

### Arquitectura

- **Diseño de sistema modular**  
  El proyecto está estructurado bajo una arquitectura modular donde cada funcionalidad vive en su propio módulo aislado dentro de `src/modules/`. Esto permite que los sistemas evolucionen de forma independiente, mejora la mantenibilidad y facilita escalar o extender dominios específicos sin afectar a los demás.

- **Comunicación orientada a eventos**  
  Los sistemas se comunican principalmente a través de eventos en lugar de dependencias directas. Esto reduce el acoplamiento entre módulos y permite interacciones más flexibles, especialmente en un entorno multijugador en tiempo real donde múltiples sistemas deben reaccionar a los mismos cambios de estado.

- **Capa de abstracción de comandos**  
  Se utiliza una clase base `Command` como fundamento, extendida en tipos más especializados de comandos (por ejemplo, faction o staff). Esto garantiza consistencia en el manejo de comandos mientras mantiene la lógica específica de cada dominio limpia y reutilizable.

- **Patrón de managers para lógica central**  
  Responsabilidades compartidas como diálogos, timers y coordinación de estado están centralizadas en clases manager (por ejemplo, `DialogManager`, `TimerManager`). Esto evita duplicación y crea una separación clara entre la lógica de orquestación y el comportamiento específico de cada funcionalidad.

- **Separación de responsabilidades (motor del juego vs lógica de aplicación)**  
  El sistema separa las interacciones de bajo nivel del motor del juego (manejadas mediante scripts en Pawn) de la lógica de aplicación de alto nivel escrita en TypeScript. Este enfoque permite prácticas modernas de desarrollo mientras se mantiene la integración con las limitaciones del entorno del juego.

- **Modelado de sistemas del mundo real**  
  Muchos sistemas (economía, trabajos, negocios) están diseñados para reflejar flujos de trabajo del mundo real. Esto requiere estructurar lógica en múltiples dominios y coordinar interacciones entre ellos, reforzando un enfoque orientado a sistemas en lugar de desarrollo de funcionalidades aisladas.

- **Desarrollo iterativo a largo plazo**  
  El proyecto ha sido desarrollado como un sistema en evolución a lo largo del tiempo, con refactorización y expansión continua. Esto ha requerido mantener compatibilidad hacia atrás, mejorar progresivamente la estructura y adaptar los sistemas a medida que crece la complejidad.

---

### Sistemas principales

- **Sistema de jugadores**  
  [Autenticación y registro](src/modules/server/auth/). Punto de entrada principal para la gestión del estado e identidad del jugador.

- **Sistemas de comunicación**  
  [Chat en el juego](src/modules/server/chat/) y [mensajería telefónica](src/modules/phone/), permitiendo interacción y coordinación en tiempo real entre jugadores.

- **Sistema de economía**  
  [Banca, transacciones y pago de salario](src/modules/economy/), diseñado para simular flujos financieros y progresión del jugador.

- **Sistemas del mundo y propiedad**  
  [Negocios](src/modules/business/), [casas](src/modules/house/) y [trabajos](src/modules/jobs/), que definen cómo los jugadores generan valor e interactúan con el entorno.

- **Sistema de facciones y permisos**  
  [Facciones y permisos basados en roles](src/modules/factions/), que soportan interacciones estructuradas en grupo.

- **Sistema de vehículos**  
  [Gestión, personalización y spawn de vehículos](src/modules/vehicles/), integrado con los sistemas de jugador y economía.

- **Sistema de combate**  
  [Manejo de armas y seguimiento de daño](src/modules/weapons/), asegurando una lógica de interacción consistente.

- **Sistema de inventario y animaciones**
  [Inventario](src/modules/inventory/) y [animaciones](src/modules/animations/), que soportan acciones del jugador y representación de estado.

- **Sistema de administración**  
  [Herramientas de staff y reportes](src/modules/staff/), diseñado para moderación y supervisión del sistema.

- **Sistema de renderizado del mundo**  
  [Mapas](src/modules/maps/), [objetos](src/modules/objects/) y [textdraws](src/modules/textdraws/), encargados de los elementos visuales e interactivos del mundo.

### Stack Tecnológico
- Framework: Infernus 0.14.4
- Lenguaje: TypeScript 5.3.3
- Base de datos: MongoDB con Mongoose como ODM
- Build: @rslib/core
- Logging: Winston
- Utilidades: dayjs, moment, bcryptjs
- Gestor de paquetes: pnpm

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