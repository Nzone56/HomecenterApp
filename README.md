# 🛠️ Prueba Técnica - SPA de Alquiler de Productos

Esta aplicación es una **SPA (Single Page Application)** desarrollada con **React 19**, **TypeScript**, **Tailwind CSS 4.1** y la librería de componentes **shadcn/ui**. Fue construida utilizando **Vite**

## 🎯 Descripción del Proyecto

La aplicación consume el servicio

GET https://www.homecenter.com.co/s/search/v1/soco/category/products?categoryId=cat1210001&currentpage=1&zoneId=1&priceGroup=10&sortBy=_score,desc


Y permite:

1. Mostrar los productos (imagen, nombre, precio).
2. Agregar un producto mostrando un **popup de confirmación**.
3. Seleccionar **fechas de alquiler** mediante un calendario.
4. Digitar la cantidad a alquilar.
5. Mostrar el **costo total** del alquiler.
6. Confirmar el proceso mediante un botón que:
   - Muestra un **popup de éxito**.
   - Actualiza un archivo `.json` con los datos del alquiler.

---

## 📦 Tecnologías Usadas

- ⚛️ React 19
- 🧠 TypeScript
- 💨 Tailwind CSS 4.1
- 🧩 shadcn/ui (UI components)
- ⚡ Vite
- 🧪 Jest y Testing Library (para pruebas unitarias)

## 📦 Requisitos

- Node.js v22+
- npm

---

## 🚀 Instalación

```bash

git clone https://github.com/Nzone56/HomecenterApp.git
cd HomecenterApp
nvm use 22 (Si es necesario)
npm install
npm run dev
```
---
## 🧾 Estructura del JSON generado
```bash
{
  "fechaInicio": "2025-07-30T05:00:00.000Z",
  "fechaFinal": "2025-07-30T05:00:00.000Z",
  "diasAlquiler": 1,
  "producto": "ID del producto",
   "descripcionProducto": {
    "nombre": "Nombre del producto",
    "cantidad": "Candidad a alquilar",
    "precioProducto": "Precio del producto (comprar)"
  },
  "precioDia": "Precio alquilado por dia (5%)",
  "precioTotal": "Precio final"
}
```
