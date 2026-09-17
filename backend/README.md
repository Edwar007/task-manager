# Task Manager — Backend

Backend de una aplicación de gestión de tareas desarrollado con **Node.js, TypeScript, Express, Prisma y SQLite**.

El objetivo de este backend es proporcionar una API REST para gestionar usuarios y tareas, incorporando autenticación mediante **JWT**, autorización por usuario, validación de datos, persistencia en base de datos y pruebas automatizadas.

---

## Tecnologías utilizadas

* **Node.js** — entorno de ejecución para JavaScript/TypeScript.
* **TypeScript** — tipado estático y mayor seguridad durante el desarrollo.
* **Express** — framework utilizado para construir la API HTTP.
* **Prisma ORM** — herramienta para interactuar con la base de datos mediante TypeScript.
* **SQLite** — base de datos utilizada para la persistencia de información.
* **Zod** — validación y definición de esquemas de entrada.
* **JWT (JSON Web Token)** — autenticación mediante tokens.
* **bcrypt** — hash seguro de contraseñas.
* **Vitest** — framework utilizado para las pruebas automatizadas.
* **Supertest** — utilizado para realizar pruebas HTTP sobre la API.
* **Git / GitHub** — control de versiones y almacenamiento del código.

---

# 1. Requisitos previos

Antes de ejecutar el proyecto se necesita tener instalado:

* Node.js
* npm
* Git

Se recomienda utilizar una versión moderna de Node.js.

Para comprobar las instalaciones:

```bash
node -v
npm -v
git --version
```

---

# 2. Clonar el proyecto

Clonar el repositorio:

```bash
git clone https://github.com/Edwar007/task-manager.git
```

Entrar al proyecto:

```bash
cd task-manager
```

El backend se encuentra dentro de:

```text
backend/
```

Entrar al backend:

```bash
cd backend
```

---

# 3. Instalar las dependencias

Dentro de `backend/` ejecutar:

```bash
npm install
```

Este comando instala automáticamente las dependencias definidas en `package.json`.

Por lo tanto, **no es necesario instalar individualmente Express, Prisma, Vitest, JWT, bcrypt, Zod, etc.**

Entre las dependencias utilizadas por el proyecto se encuentran:

```text
express
prisma
@prisma/client
jsonwebtoken
bcrypt
zod
vitest
supertest
```

Además de sus respectivos paquetes de tipos para TypeScript cuando son necesarios.

---

# 4. Configurar las variables de entorno

El proyecto utiliza variables de entorno para almacenar configuración que no debe estar directamente dentro del código.

Existe un archivo:

```text
.env.example
```

Este archivo sirve como referencia para crear el archivo local:

```text
.env
```

Ejemplo:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
```

> El valor de `JWT_SECRET` debe ser reemplazado por una clave propia cuando se utilice el proyecto fuera del entorno de aprendizaje.

El archivo `.env` **no debe subirse a GitHub**.

Por esa razón está incluido dentro de `.gitignore`.

---

# 5. Configuración de Prisma

Prisma es el ORM utilizado para conectar la aplicación con SQLite.

La configuración principal se encuentra en:

```text
prisma/schema.prisma
```

y el archivo de configuración de Prisma se encuentra en:

```text
prisma7.config.ts
```

El esquema define los modelos de la base de datos.

Actualmente existen principalmente dos entidades:

```text
User
Task
```

La relación es:

```text
User 1 ──────── N Task
```

Es decir, un usuario puede tener muchas tareas y cada tarea pertenece a un usuario.

---

# 6. Crear la base de datos

La base de datos utilizada es SQLite.

SQLite no necesita instalar un servidor de base de datos adicional.

La aplicación utiliza un archivo local:

```text
dev.db
```

Este archivo se genera localmente y está excluido del repositorio mediante `.gitignore`.

Después de instalar las dependencias, las migraciones de Prisma pueden aplicarse mediante:

```bash
npx prisma migrate dev
```

Este comando permite crear o actualizar la estructura de la base de datos de acuerdo con las migraciones existentes.

Las migraciones del proyecto se encuentran en:

```text
prisma/migrations/
```

Actualmente las migraciones registran, entre otros cambios:

* creación del sistema de usuarios;
* incorporación de la relación entre usuarios y tareas.

---

# 7. Cliente de Prisma

La aplicación utiliza `PrismaClient` para realizar operaciones sobre la base de datos.

La instancia se encuentra centralizada en:

```text
src/lib/prisma.ts
```

Esto permite que los repositorios utilicen una única instancia de Prisma para realizar las operaciones de persistencia.

El flujo general es:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Prisma
    ↓
SQLite
```

---

# 8. Ejecutar el backend

Una vez instaladas las dependencias y configuradas las variables de entorno, el backend puede ejecutarse mediante el script definido en `package.json`.

Ejemplo:

```bash
npm run dev
```

El servidor Express se encarga de iniciar la API.

---

# 9. Arquitectura del backend

El proyecto utiliza una arquitectura separada por responsabilidades.

```text
src/
├── config/
├── controllers/
├── errors/
├── lib/
├── middlewares/
├── repositories/
├── routes/
├── schemas/
├── services/
└── types/
```

Cada parte tiene una responsabilidad específica.

---

## Controllers

Los controllers reciben las peticiones HTTP y se encargan de coordinar la respuesta.

Por ejemplo:

```text
controllers/
├── task.controller.ts
└── user.controller.ts
```

El controller no debería contener toda la lógica de negocio.

Su responsabilidad principal es trabajar con:

* `Request`
* `Response`
* datos recibidos
* servicios
* códigos HTTP

---

## Services

Los services contienen la lógica de negocio de la aplicación.

```text
services/
├── task.service.ts
└── user.service.ts
```

Por ejemplo, la autenticación se procesa mediante el servicio de usuarios.

El service puede:

1. recibir los datos;
2. consultar el repositorio;
3. comprobar información;
4. realizar operaciones de negocio;
5. generar un token;
6. devolver el resultado.

---

## Repositories

Los repositories se encargan de la comunicación con la base de datos.

```text
repositories/
├── task.repository.ts
└── user.repository.ts
```

La separación permite evitar que los controllers y services tengan que conocer directamente todos los detalles de Prisma.

El flujo queda:

```text
HTTP
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Prisma
 ↓
SQLite
```

---

# 10. Rutas de la API

Las rutas se encuentran en:

```text
src/routes/
```

Actualmente existen rutas relacionadas con usuarios y tareas.

## Tasks

### Obtener tareas

```http
GET /tasks
```

Obtiene las tareas correspondientes al usuario autenticado.

### Obtener una tarea

```http
GET /tasks/:id
```

Obtiene una tarea específica.

### Crear una tarea

```http
POST /tasks
```

Ejemplo de cuerpo:

```json
{
  "title": "Aprender React",
  "description": "Crear el frontend del proyecto"
}
```

### Actualizar una tarea

```http
PUT /tasks/:id
```

### Completar o reabrir una tarea

```http
PATCH /tasks/:id/complete
```

### Eliminar una tarea

```http
DELETE /tasks/:id
```

---

# 11. Usuarios

El backend también incorpora un sistema básico de usuarios.

Las operaciones incluyen:

* creación de usuarios;
* consulta de usuarios;
* actualización;
* eliminación;
* inicio de sesión;
* cambio de contraseña.

Las rutas correspondientes se encuentran en:

```text
src/routes/user.routes.ts
```

---

# 12. Autenticación con JWT

La autenticación utiliza **JSON Web Tokens**.

El proceso general es:

```text
Usuario
   ↓
Login
   ↓
Email + password
   ↓
Validación
   ↓
Comparación de contraseña
   ↓
JWT
   ↓
Cliente
```

Después de iniciar sesión, el cliente recibe un token.

Para acceder a endpoints protegidos debe enviarlo mediante el header:

```http
Authorization: Bearer TOKEN
```

---

# 13. Contraseñas

Las contraseñas no se almacenan directamente como texto plano.

Antes de guardarlas se utiliza:

```text
bcrypt
```

El proceso es:

```text
Password original
       ↓
bcrypt
       ↓
Hash
       ↓
Base de datos
```

Durante el login, bcrypt permite comparar la contraseña proporcionada con el hash almacenado.

---

# 14. Middleware de autenticación

La autenticación se implementa mediante:

```text
src/middlewares/auth.middleware.ts
```

Este middleware:

1. obtiene el header `Authorization`;
2. comprueba que utilice `Bearer`;
3. obtiene el token;
4. verifica el JWT;
5. obtiene la información del usuario;
6. permite continuar si el token es válido;
7. rechaza la petición si el token es inválido o expiró.

---

# 15. Autorización

Autenticación y autorización no son exactamente lo mismo.

### Autenticación

Responde:

> ¿Quién eres?

### Autorización

Responde:

> ¿Tienes permiso para acceder a este recurso?

El proyecto implementa autorización para evitar que un usuario pueda modificar o eliminar tareas pertenecientes a otro usuario.

Esto se realiza mediante:

```text
src/middlewares/authorize-user.middleware.ts
```

El concepto general es:

```text
Usuario autenticado
       ↓
Identificar usuario
       ↓
Identificar tarea
       ↓
Comprobar propietario
       ↓
¿Pertenece al usuario?
     ↙       ↘
   Sí         No
   ↓           ↓
Continuar    403/401
```

---

# 16. Validación de datos

El proyecto utiliza:

```text
Zod
```

para validar los datos recibidos por la API.

Los esquemas se encuentran en:

```text
src/schemas/
```

Por ejemplo:

```text
task.schema.ts
user.schema.ts
```

La validación evita que datos incorrectos lleguen a la lógica de negocio.

El flujo es:

```text
Request
   ↓
Validation middleware
   ↓
¿Datos válidos?
   ↓
Controller
```

Si los datos no cumplen el esquema correspondiente, la petición es rechazada.

---

# 17. Manejo de errores

El proyecto utiliza errores personalizados mediante:

```text
src/errors/app.error.ts
```

y un middleware global:

```text
src/middlewares/error.middleware.ts
```

Esto permite centralizar el manejo de errores.

El flujo es:

```text
Error
 ↓
Service / Controller / Middleware
 ↓
Error middleware
 ↓
HTTP response
```

En lugar de manejar cada error de forma completamente diferente en cada endpoint, existe un punto central para procesarlos.

---

# 18. Tipado con TypeScript

El backend está desarrollado utilizando TypeScript.

Se utilizan tipos e interfaces para representar:

* usuarios;
* tareas;
* datos recibidos;
* respuestas;
* parámetros;
* información del usuario autenticado.

Los tipos principales se encuentran en:

```text
src/types/
```

Por ejemplo:

```text
task.types.ts
user.types.ts
express.d.ts
```

El archivo:

```text
express.d.ts
```

permite extender los tipos de Express para representar información adicional almacenada en `Request`, como el usuario autenticado.

---

# 19. Testing

El proyecto utiliza:

```text
Vitest
```

como framework de pruebas.

También utiliza:

```text
Supertest
```

para realizar pruebas HTTP contra la aplicación.

Los tests se encuentran en:

```text
tests/
├── helpers/
├── task/
└── user/
```

Se han implementado pruebas para diferentes niveles.

### Tests de schemas

Comprueban que la validación de datos funcione correctamente.

```text
task.schema.test.ts
user.schema.test.ts
```

### Tests de repositories

Comprueban operaciones relacionadas con la persistencia.

```text
task.repository.test.ts
```

### Tests de API

Comprueban el comportamiento de los endpoints HTTP.

```text
task.api.test.ts
user.api.test.ts
```

---

# 20. Ejecutar las pruebas

Desde `backend/`:

```bash
npm test
```

El proyecto utiliza una configuración específica de Vitest:

```text
vitest.config.ts
```

Las pruebas utilizan una base de datos separada para evitar trabajar directamente sobre la base de datos de desarrollo.

---

# 21. Base de datos de pruebas

El entorno de pruebas utiliza su propia configuración de SQLite.

Esto permite mantener separadas:

```text
Desarrollo
    ↓
dev.db

Pruebas
    ↓
test.db
```

Estas bases de datos son locales y están excluidas de Git.

---

# 22. Variables de entorno de pruebas

El proyecto también contempla configuración específica para el entorno de testing mediante:

```text
.env.test
```

Este archivo es local y no debe subirse al repositorio.

---

# 23. Seguridad básica implementada

El backend incorpora varias medidas importantes:

* contraseñas almacenadas mediante hash;
* autenticación mediante JWT;
* validación de tokens;
* protección de rutas;
* autorización por propietario;
* validación de datos mediante Zod;
* variables sensibles mediante `.env`;
* exclusión de secretos y bases de datos locales mediante `.gitignore`.

---

# 24. Git y archivos ignorados

El repositorio utiliza `.gitignore` para evitar subir archivos que pertenecen únicamente al entorno local.

Entre ellos:

```text
node_modules/
.env
.env.test
*.db
dist/
coverage/
```

Esto permite que otra persona clone el proyecto y genere sus propias dependencias, bases de datos y variables de entorno.

---

# 25. Instalación completa desde cero

Una instalación típica sería:

```bash
git clone https://github.com/Edwar007/task-manager.git
cd task-manager
cd backend
npm install
```

Crear/configurar:

```text
.env
```

Después ejecutar las migraciones:

```bash
npx prisma migrate dev
```

Y finalmente iniciar el servidor:

```bash
npm run dev
```

Para ejecutar las pruebas:

```bash
npm test
```

---

# 26. Comandos importantes

### Instalar dependencias

```bash
npm install
```

### Ejecutar servidor de desarrollo

```bash
npm run dev
```

### Ejecutar pruebas

```bash
npm test
```

### Ejecutar migraciones de Prisma

```bash
npx prisma migrate dev
```

### Generar Prisma Client

```bash
npx prisma generate
```

### Abrir Prisma Studio

```bash
npx prisma studio
```

Prisma Studio permite visualizar e interactuar con los datos de la base de datos durante el desarrollo.

---

# 27. Flujo completo de una petición

Una petición típica para crear una tarea sigue aproximadamente este flujo:

```text
Cliente
   │
   │ POST /tasks
   │ Authorization: Bearer TOKEN
   ↓
Express
   │
   ↓
Auth Middleware
   │
   │ Verificar JWT
   ↓
Validation Middleware
   │
   │ Validar datos con Zod
   ↓
Controller
   │
   ↓
Service
   │
   ↓
Repository
   │
   ↓
Prisma
   │
   ↓
SQLite
   │
   ↓
Repository
   ↓
Service
   ↓
Controller
   ↓
JSON Response
   ↓
Cliente
```

Esta separación permite que cada capa tenga una responsabilidad clara.

---

# 28. Estructura actual del backend

```text
backend/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   └── env.ts
│   │
│   ├── controllers/
│   │   ├── task.controller.ts
│   │   └── user.controller.ts
│   │
│   ├── errors/
│   │   └── app.error.ts
│   │
│   ├── lib/
│   │   └── prisma.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── authorize-user.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validate.middleware.ts
│   │
│   ├── repositories/
│   │   ├── task.repository.ts
│   │   └── user.repository.ts
│   │
│   ├── routes/
│   │   ├── task.routes.ts
│   │   └── user.routes.ts
│   │
│   ├── schemas/
│   │   ├── task.schema.ts
│   │   └── user.schema.ts
│   │
│   ├── services/
│   │   ├── task.service.ts
│   │   └── user.service.ts
│   │
│   └── types/
│       ├── express.d.ts
│       ├── task.types.ts
│       └── user.types.ts
│
├── tests/
│   ├── helpers/
│   │   └── auth.ts
│   │
│   ├── task/
│   │   ├── task.api.test.ts
│   │   ├── task.repository.test.ts
│   │   └── task.schema.test.ts
│   │
│   └── user/
│       ├── user.api.test.ts
│       └── user.schema.test.ts
│
├── .env.example
├── package.json
├── package-lock.json
├── prisma7.config.ts
├── tsconfig.json
└── vitest.config.ts
```

---

# 29. Estado del proyecto

El backend cuenta actualmente con una base funcional para una aplicación de gestión de tareas.

Se han trabajado conceptos de:

* Node.js
* TypeScript
* Express
* REST API
* arquitectura por capas
* Prisma
* SQLite
* migraciones
* validación
* middleware
* manejo de errores
* autenticación
* autorización
* JWT
* bcrypt
* testing
* Git
* GitHub
* variables de entorno

El frontend todavía se desarrollará posteriormente utilizando **React + TypeScript**.

La intención es conectar el frontend con esta API mediante peticiones HTTP.

---

# 30. Próxima etapa

La siguiente etapa del proyecto será construir el frontend utilizando React.

El objetivo será conectar:

```text
React
   ↓
HTTP / REST API
   ↓
Express
   ↓
Services
   ↓
Repositories
   ↓
Prisma
   ↓
SQLite
```

De esta manera, el proyecto completo terminará teniendo una arquitectura Full Stack:

```text
┌─────────────────────┐
│       React         │
│      Frontend       │
└──────────┬──────────┘
           │
           │ HTTP / JSON
           ↓
┌─────────────────────┐
│      Express        │
│       API           │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│      Services       │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│    Repositories     │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│       Prisma        │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│       SQLite        │
└─────────────────────┘
```

---

## Nota sobre el estado de los tests

El proyecto contiene una suite de pruebas automatizadas para las funcionalidades desarrolladas.

Algunas pruebas todavía pueden requerir ajustes y no se considera que toda la suite esté completamente libre de fallos en este punto del desarrollo.

Esto no impide continuar con la siguiente etapa, pero los tests pendientes quedan como trabajo técnico para una etapa posterior.
