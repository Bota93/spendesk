# Spendesk - Gestor de Gastos Personales

Spendesk es una aplicación web moderna y ágil diseñada para ayudarte a tomar el control total de tus finanzas personales. Registra tus ingresos y gastos de forma intuitiva, visualiza tu balance y entiende a dónde va tu dinero. Este proyecto demuestra la creación de una aplicación full-stack completa con tecnologías modernas.

**[Enlace a la aplicación desplegada]** *(Lo añadiremos al final del proyecto)*

---

## Características Principales

Actualmente, la aplicación cuenta con un sistema de autenticación robusto y una interfaz de usuario completamente maquetada.

* **Registro de Usuarios:** Los nuevos usuarios pueden crear una cuenta segura con su correo electrónico y contraseña.
* **Inicio de Sesión:** Los usuarios registrados pueden acceder a la aplicación de forma segura.
* **Usuario de Demostración:** Permite a los visitantes (¡y a los reclutadores!) probar la funcionalidad principal de la aplicación al instante con un solo clic, sin necesidad de registrarse.
* **Gestión de Sesión Global:** La aplicación sabe en todo momento si un usuario ha iniciado sesión, manteniendo la sesión persistente entre recargas de la página.
* **Rutas Protegidas:** La sección principal de la aplicación (el Dashboard) está protegida y solo es accesible para usuarios autenticados.
* **Cierre de Sesión:** Los usuarios pueden cerrar su sesión de forma segura.

---

## Stack Tecnológico

### Frontend
* **React (con Vite):** Para una interfaz de usuario rápida, moderna y reactiva.
* **Tailwind CSS:** Para un diseño estilizado y responsive implementado de forma ágil.
* **React Router:** Para la gestión de la navegación en una Single Page Application (SPA).

### Backend (BaaS)
* **Supabase:** Utilizado para la base de datos PostgreSQL, autenticación de usuarios y la generación instantánea de APIs.

### Despliegue
* **Vercel:** Para un despliegue continuo, rápido y optimizado del frontend.

---

## Estado del Proyecto

La base de la aplicación, incluyendo la interfaz de usuario completa y todo el sistema de autenticación, está 100% completada. La siguiente fase se centrará en implementar la lógica de negocio principal: la gestión de transacciones.