# Hype — Backend

API REST construida con Node.js + Express + TypeScript + PostgreSQL (Prisma ORM).

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [PostgreSQL](https://www.postgresql.org/download/) instalado y corriendo en local

## Instalación

### 1. Clonar el repositorio e ir a la carpeta del backend

```bash
cd hype-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear la base de datos en PostgreSQL

Abre pgAdmin o psql y ejecuta:

```sql
CREATE DATABASE hype_db;
```

### 4. Configurar las variables de entorno

Crea un archivo `.env` en la raíz de `hype-backend/` con el siguiente contenido:

```env
DATABASE_URL="postgresql://TU_USUARIO:TU_CONTRASEÑA@localhost:5432/hype_db"
JWT_SECRET="string_secreto_largo"
API_KEY_TICKETMASTER="tu_api_key_de_ticketmaster"
```

- **DATABASE_URL**: cambia `TU_USUARIO` y `TU_CONTRASEÑA` por las credenciales de tu PostgreSQL local (por defecto el usuario es `postgres`).
- **JWT_SECRET**: cualquier cadena de texto larga y aleatoria.
- **API_KEY_TICKETMASTER**: clave de la [Ticketmaster Discovery API](https://developer.ticketmaster.com/). El registro es gratuito.

### 5. Crear las tablas (migraciones de Prisma)

```bash
npx prisma migrate deploy
```

Esto crea automáticamente todas las tablas necesarias en la base de datos.

### 6. Cargar los eventos mock

```bash
npm run seed:mock
```

Importa los eventos locales de ejemplo que usa la sección de descubrimiento.

### 7. Arrancar el servidor en modo desarrollo

```bash
npm run dev
```

El servidor queda escuchando en `http://localhost:3000`.

## Scripts disponibles

`npm run dev` | Arranca el servidor en modo desarrollo con recarga automática 
`npm run build` | Compila TypeScript a JavaScript 
`npm start` | Arranca el servidor compilado (requiere `npm run build` antes) 
`npm run seed:mock` | Carga los eventos mock en la base de datos

## Endpoints 

| POST | `/auth/register` | Registro de usuario 
| POST | `/auth/login` | Login, devuelve JWT 
| GET | `/events` | Listado de eventos (Ticketmaster + mock) 
| GET | `/saved-events` | Eventos guardados del usuario 
| POST | `/saved-events` | Guardar un evento 
| DELETE | `/saved-events/:id` | Eliminar evento guardado 
| PATCH | `/saved-events/:id/folder` | Cambiar carpeta de un evento guardado 
| GET | `/users/me` | Perfil del usuario autenticado 
| PUT | `/users/me` | Actualizar perfil 
