# MiniBlog API - Proyecto Integrador 🚀

## Descripción del Proyecto

MiniBlog es una API REST robusta diseñada para gestionar un sistema de contenidos.Permite administrar autores y sus publicaciones, asegurando la persistencia de datos en una base de datos PostgreSQL y siguiendo las mejores prácticas de la arquitectura REST

## Estructura del Proyecto

- `src/`: Código fuente organizado en Rutas, Controladores y Servicios.
- `sql/`: Scripts de configuración (`setup.sql`) y datos iniciales (`seed.sql`).
- `tests/`: Pruebas unitarias con Jest y Supertest.

## Configuración y Ejecución Local

1. **Instalar dependencias**: `npm install`
2. **Configurar variables**: Copiar `.env.example` a `.env` y completar credenciales.
3. **Base de Datos**: Ejecutar `sql/setup.sql` y `sql/seed.sql` en PostgreSQL.
4. **Iniciar**: `npm run dev` para desarrollo o `npm start` para producción.

## Pruebas

Para ejecutar la suite de tests unitarios que cubren los casos críticos (CRUD y validaciones), usa el comando:

```bash
npm test
```

## 🌐 Enlace del Proyecto (Deploy)

La API se encuentra desplegada y operativa en **Railway**. Puedes probar los endpoints principales haciendo clic en los siguientes enlaces:

- **📍 Listado de Autores (Prueba principal):** [https://miniblog-backend-production.up.railway.app/api/authors](https://miniblog-backend-production.up.railway.app/api/authors)
- **📍 Listado de Publicaciones:** [https://miniblog-backend-production.up.railway.app/api/posts](https://miniblog-backend-production.up.railway.app/api/posts)
- **📍 Estado del Servidor:** [https://miniblog-backend-production.up.railway.app/health](https://miniblog-backend-production.up.railway.app/health)
