
# CRUD en Api Rest

Este proyecto implementa operaciones CRUD (Create, Read, Update, Delete) con autenticación encriptada en una base de datos utilizando una API REST. La aplicación se conecta a una base de datos que incluye las entidades "usuarios," "categorías," y "productos," permitiendo la manipulación de datos a través de direcciones y métodos HTTP.

## Tecnologías Utilizadas

-   VS Code: Entorno de desarrollo integrado (IDE).
-   Node.js: Entorno de ejecución de JavaScript en el servidor.
-   Dependencias:
    -   JWT: Para la autenticación de usuarios.
    -   Express: Framework web para Node.js que simplifica la creación de APIs.
    -   Bcrypt: Para el hash de contraseñas.
-   Mongoose: Biblioteca de modelado de objetos MongoDB para Node.js.

## Instrucciones de Ejecución

1.  Clona este repositorio en tu máquina local.
2.  Abre el proyecto en VS Code.
3.  Abre una terminal en VS Code y navega hasta la carpeta del proyecto.
4.  Instala las dependencias usando el comando `npm install`.
5.  Ejecuta la aplicación usando el comando `npm run dev`.

La aplicación estará disponible en la dirección `http://localhost:puerto`, donde `puerto` es el puerto en el que la aplicación está configurada para escuchar las solicitudes HTTP.
    
Para realizar operaciones CRUD, utiliza las siguientes rutas y métodos HTTP:

-   **Usuarios:**
    
    -   `GET /usuarios`: Obtiene todos los usuarios.
    -   `POST /usuarios`: Crea un nuevo usuario.
    -   `PUT /usuarios/:id`: Actualiza un usuario existente.
    -   `DELETE /usuarios/:id`: Elimina un usuario.
-   **Categorías:**
    
    -   `GET /categorias`: Obtiene todas las categorías.
    -   `POST /categorias`: Crea una nueva categoría.
    -   `PUT /categorias/:id`: Actualiza una categoría existente.
    -   `DELETE /categorias/:id`: Elimina una categoría.
-   **Productos:**
    
    -   `GET /productos`: Obtiene todos los productos.
    -   `POST /productos`: Crea un nuevo producto.
    -   `PUT /productos/:id`: Actualiza un producto existente.
    -   `DELETE /productos/:id`: Elimina un producto.
    - 
La aplicación necesita que crees un usuario y luego poder realizar las operciones CRUD. Para loguearte, debes ingresar un mail valido y un pass que contenga números, mayúsculas y minúsculas, con los campos "email" y "password" en la siguiente ruta:
- **Autenicación**
    -   `POST /login`: Loguear un usuario.
    - 
La aplicación devolverá los datos en formato JSON para las operaciones de listar, creación y actualización.

¡Disfruta explorando y trabajando con la API REST!
