# DM Companion

Aplicación web y Android diseñada para asistir a Dungeon Masters
durante partidas de Dungeons & Dragons 5e.

## Tecnologías

- React
- Vite
- JavaScript
- CSS
- CapacitorJS

## Funcionalidades

### 1. Bestiario

Permite consultar monstruos de Dungeons & Dragons 5e.

- Listado de monstruos.
- Búsqueda por nombre.
- Consulta de estadísticas.
- Paginación.
- Tarjetas reutilizables.

### 2. Generador de botín

Genera recompensas aleatorias según el nivel de desafío.

- Selección del nivel de desafío (CR).
- Generación de monedas.
- Consulta de objetos desde la API.
- Recompensas relacionadas con la dificultad.

### 3. Bandeja de dados

Permite realizar lanzamientos de los dados:

- d4
- d6
- d8
- d10
- d12
- d20
- d100

Los resultados se generan aleatoriamente mediante JavaScript.

## API utilizada

Dungeons & Dragons 5e API

https://www.dnd5eapi.co/

Se utilizan los endpoints de monstruos, equipamiento y objetos mágicos.

## Aplicación web

https://dm-companion-webmovil.vercel.app

## Aplicación Android

La aplicación utiliza CapacitorJS para integrar React con Android.

El APK de prueba está disponible en GitHub Releases:

https://github.com/jespitialeiva-art/dm-companion_webmovil/releases/tag/v1.0.0

## Ejecución del proyecto

1. Descargar o clonar el repositorio.
2. Instalar las dependencias:

   npm install

3. Ejecutar la aplicación:

   npm run dev

4. Generar la versión de producción:

   npm run build

## Compilación Android

El proyecto utiliza CapacitorJS y GitHub Actions.

Para sincronizar los archivos web con Android:

npm run build
npx cap sync android

La compilación Android se realiza mediante GitHub Actions.

## Repositorio

https://github.com/jespitialeiva-art/dm-companion_webmovil