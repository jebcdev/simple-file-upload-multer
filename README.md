# API de Subida de Archivos con Node.js, Express y TypeScript

## Descripción
Esta es una API RESTful desarrollada con TypeScript, Node.js y Express para la subida de archivos. Utiliza `multer` para la gestión de archivos y varias medidas de seguridad como `helmet`, `cors` y `morgan`.

## Características
- Subida de archivos con `multer`.
- Restricción de tipos de archivos permitidos (`jpeg`, `png`, `jpg`, `gif`, `webp`, `svg`).
- Límite de tamaño de archivo de 10MB.
- Creación automática del directorio de subida si no existe.
- Middleware de seguridad y logging (`helmet`, `cors`, `morgan`).

## Tecnologías Utilizadas
- Node.js
- Express.js
- TypeScript
- Multer
- Morgan
- Helmet
- Cors

## Instalación
1. Clonar el repositorio:
    ```sh
    git clone https://github.com/jebcdev/simple-file-upload-multer
    cd simple-file-upload-multer
    ```
2. Instalar dependencias:
    ```sh
    npm install
    ```
3. Crear un archivo `.env` en la raíz del proyecto y agregar las siguientes variables:
    ```env
    PORT=4000
    API_PREFIX=/api/v1
    ```
4. Compilar el proyecto (opcional si usas TypeScript en tiempo de ejecución):
    ```sh
    npm run build
    ```

## Uso
### Iniciar el servidor
```sh
npm run dev  # Modo desarrollo
npm start    # Modo producción
```
El servidor se ejecutará en: `http://localhost:4000/api/v1`

### Endpoints
#### 1. **Bienvenida**
- **URL:** `GET /api/v1`
- **Descripción:** Retorna un mensaje de bienvenida y detalles de la API.
- **Respuesta Ejemplo:**
    ```json
    {
        "message": "Welcome to the API",
        "data": {
            "version": "0.0.2",
            "author": "{ JEBC-DeV }",
            "description": "API RESTful with TypeScript, Node.js, Express",
            "contact": "@jebcdev"
        }
    }
    ```

#### 2. **Subir un archivo**
- **URL:** `POST /api/v1/upload`
- **Descripción:** Permite la subida de archivos al servidor.
- **Parámetros:**
    - `file`: Archivo a subir (campo en `multipart/form-data`).
- **Respuesta exitosa:**
    ```json
    {
        "currentDir": "CURRENT_WORKING_DIR",
        "file": {
            "fieldname": "file",
            "originalname": "archivo.png",
            "encoding": "7bit",
            "mimetype": "image/png",
            "destination": "./dist/uploads/",
            "filename": "1707912345-archivo.png",
            "path": "./dist/uploads/1707912345-archivo.png",
            "size": 123456
        }
    }
    ```

## Estructura del Proyecto
```
project-root/
│── src/
│   │── app.ts
│   │── server.ts
│   │── modules/
│   │   └── _root/
│   │       │── _root.routes.ts
│   │       └── _root.controller.ts
│   │── utils/
│   │   └── my-file-upload.ts
│── .env
│── package.json
│── tsconfig.json
│── README.md
```

### Basado en :
https://github.com/jebcdev/base-express-typescript-server