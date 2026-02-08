<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Teslo API

1. Instalar dependencias
```
npm install
```

2. Clonar el archivo __.env.template__ y renombrarlo a __.env__

3. Cambiar las variables de entorno

4. Levantar la base de datos
```
docker-compose up -d
```
5. Levantar 
```
npm run start:dev
```

6. Ejercutar Seed
```
http://localhost:3005/api/seed
```

## 📘 Documentación de la API (Swagger)

La API está completamente documentada utilizando **Swagger (OpenAPI)**, lo que permite explorar y probar todos los endpoints de forma interactiva.

### 🔹 Swagger UI
Con el proyecto en ejecución, la documentación interactiva se encuentra disponible en:
```
http://localhost:3005/api
```

Desde allí es posible:
- Ver todos los endpoints disponibles
- Probar requests directamente desde el navegador
- Visualizar los esquemas de datos (DTOs y entidades)
- Ver los requerimientos de autenticación (JWT)

---

### 🔹 Especificación OpenAPI

El archivo de especificación OpenAPI se encuentra incluido en el repositorio __swagger.json__






