# 🚗 Frontend - Gestión de Autos

Aplicación frontend desarrollada con **React + Vite + Bun**, que consume una API REST para la gestión de autos (CRUD, dashboard e insights).

---

## 📌 Tecnologías utilizadas

* React
* Vite
* Bun
* Axios 
* Zod
* Tailwind CSS
* React Query

---

## ⚙️ Requisitos previos

Asegúrate de tener instalado:

* Node.js (opcional si usas Bun exclusivamente)
* Bun → https://bun.sh/

---

## 🔐 Variables de entorno

Antes de ejecutar el proyecto, debes crear un archivo:

```id="envfile"
.env
```

En la raíz del proyecto con el siguiente contenido:

```env id="envvars"
VITE_API_URL=https://localhost:7053/api
VITE_FILE_SERVER=https://localhost:7053
```

> ⚠️ Estas variables apuntan al backend local, asegúrate de que la API esté corriendo en ese puerto.

---

## ▶️ Ejecución del proyecto

1. Clonar el repositorio:

```id="clone"
git clone https://github.com/itzvin19/carManager--Frontend
cd carManager--Frontend
```

2. Instalar dependencias:

```id="install"
bun install
```

3. Ejecutar el servidor de desarrollo:

```id="run"
bun dev
```

---

## 🌐 URL de la aplicación

La aplicación estará disponible en:

```id="url"
http://localhost:5173
```

> ✅ Este puerto está habilitado en el backend mediante configuración de CORS.

---

## 🔌 Conexión con la API

El frontend consume los endpoints definidos en:

```id="apiurl"
https://localhost:7053/api
```

Asegúrate de que el backend esté corriendo antes de iniciar el frontend.

---

## 🧪 Notas adicionales

* La aplicación incluye:

  * Listado de autos
  * Creación, edición y eliminación
  * Filtros y paginación 
  * Dashboard con métricas

* Validaciones implementadas en formularios


---

## 👨‍💻 Autor

Kevin Carrasco
