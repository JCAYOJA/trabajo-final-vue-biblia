# MODULO 6 Vue 3 + Vite DIPLOMADO EN FULLSTACK DEVELOPER BACK END Y FRONT END. V9 Postgrado - USIP
# NOMBRE: JHONNY CAYOJA CAHMABI 
# Vue 3 + Vite
# 📖 Gestión de Libros Bíblicos

Un sistema interactivo para la administración y control de libros bíblicos organizado por testamentos y capítulos. Desarrollado con una interfaz moderna basada en **Material Design** y almacenamiento reactivo local.

## 🚀 Tecnologías Utilizadas

* **Framework:** [Vue.js 3](https://vuejs.org) (Composition API)
* **Herramienta de Construcción:** [Vite](https://vite.dev)
* **Librería de Componentes:** [Vuetify 3](https://vuetifyjs.com) (Material UI)
* **Base de Datos Simulada:** [JSON Server](https://github.com)
* **Iconos:** Material Design Icons (`@mdi/font`)
* **Enrutamiento:** Vue Router

## 🛠️ Instalación del Proyecto

Sigue estos pasos para clonar e instalar el proyecto en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JCAYOJA/trabajo-final-vue-biblia.git
   cd trabajo-final-vue-biblia
   ```

2. **Instalar las dependencias de Node:**
   ```bash
   npm install
   ```

## 💻 Ejecución del Sistema

Este sistema requiere que se ejecuten **dos servidores de forma simultánea** en terminales separadas para funcionar correctamente:

### Terminal 1: Servidor Backend (Base de Datos JSON)
Enciende el servidor que procesa las operaciones de lectura, guardado, edición y eliminación de datos en tu archivo `db.json`:
```bash
npx json-server --watch db.json --port 3000
```

### Terminal 2: Servidor Frontend (Aplicación Web)
Enciende el servidor de desarrollo local para compilar y visualizar la interfaz web:
```bash
npm run dev
```
Una vez iniciados ambos servicios, abre tu navegador e ingresa a la dirección provista por la consola (ej. **http://localhost:5173** o **http://localhost:5174**).


## 🌟 Características Principales

* **Filtros en Tiempo Real:** Búsqueda dinámica reactiva por coincidencia de texto e ID de testamento.
* **Manejo de CRUD Completo:** Permite crear, listar, editar y eliminar libros de la base de datos `db.json`.
* **Diseño Responsivo:** Interfaz adaptada gracias a los componentes estilizados de Material UI (Vuetify).
* **Control de Sesión:** Simulación de autenticación local con manejo de rutas protegidas mediante Vue Router.


