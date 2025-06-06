# Proyecto final backend 3

## Descripción
Este proyecto es un servidor de un e-commerce en donde se registran los usuarios, se logean y pueden agregar productos al carrito, ver los productos que agregaron, eliminarlos, crear una compra que te devuelve el ticket con todos los datos de la compra.

## Caracteristicas
- Crear productos, actualizar productos, eliminarlos
- Ver el detalle de los productos
- Crear un carrito de compras
- Crear un usuario y registrarse
- Crear un ticket de compra

## Tecnologías utulizadas
- Node js
- Express
- MongoDB con Mongoose
- JWT con autenticación
- Passport js
- Faker.js para datos de prueba
- Socket.io para documentación de la API
- Jest y Supertest para tests
- Docker para contenerización

## Instalación
Para ejecutar el proyecto de manera local, sigue estos pasos:

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/MartinMatarrese/proyectofinalbackend3
    ```

2. Instalar las dependencias:

    ```bash
    npm install
    ```

3. Crear un archivo .env con tus variables de entorno(como MONGO_URL y SECRET_KEY)


4. Ejecutar la aplicación

    ```bash
    npm start
    ```

## Imagen docker
Podés correr la imagen de este proyecto directamente desde Docker Hub:

[https://hub.docker.com/r/martin1694/api-proyectofinalbackend3](https://hub.docker.com/r/martin1694/api-proyectofinalbackend3)

Para ejecutarla:

```bash
docker run -p 8080:8080 --env-file .env martin1694/api-proyectofinalbackend3
```

## Documentación de la API
Una vez que la API esté corriendo localmente o en un contenedor Docker, podes acceder a la documentación completa generada con Swagger en:

[http://localhost:8080/docs](http://localhost:8080/docs)

## Autor
Martin Matarrese