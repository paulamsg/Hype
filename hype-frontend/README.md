# Hype — Frontend

Aplicación web construida con React 19 + TypeScript + Vite + SCSS.

> El backend debe estar corriendo antes de arrancar el frontend. Consulta el README de `hype-backend/`.

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- El backend de Hype corriendo en local (por defecto en `http://localhost:3000`)

## Instalación

### 1. Ir a la carpeta del frontend

```bash
cd hype-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crea un archivo `.env` en la raíz de `hype-frontend/` con el siguiente contenido:

```env
VITE_SERVER_URL=http://localhost:3000
VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset
```

- **VITE_SERVER_URL**: URL donde está corriendo el backend. Si lo tienes en local con la configuración por defecto, déjalo como está.
- **VITE_CLOUDINARY_CLOUD_NAME** y **VITE_CLOUDINARY_UPLOAD_PRESET**: solo son necesarios para la funcionalidad de subida de fotos en el perfil. Si no los configuras, el resto de la app funciona con normalidad. Puedes crear una cuenta gratuita en [Cloudinary](https://cloudinary.com/).

### 4. Arrancar la aplicación en modo desarrollo

```bash
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

## Scripts disponibles

`npm run dev` | Arranca la app en modo desarrollo con recarga automática 
`npm run build` | Compila la app para producción 
`npm run preview` | Previsualiza el build de producción en local 

## Rutas de la aplicación

`/login` | Inicio de sesión 
`/register` | Registro de usuario 
`/discover` | Descubrimiento de eventos (requiere login) 
`/perfil` | Perfil del usuario (requiere login) 
