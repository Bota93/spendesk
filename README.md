# Spendesk - Gestor de Gastos Personales

Spendesk es una aplicación web full-stack moderna y ágil, diseñada para ofrecer una gestión intuitiva de las finanzas personales. Registra ingresos y gastos, visualiza tu balance en tiempo real y entiende tus patrones de consumo.


**Visita la aplicación en vivo:** [**https://spendesk.vercel.app/**]

---

## Características Principales

* **Gestión CRUD Completa:** Los usuarios pueden Crear, Leer, Actualizar y Eliminar (CRUD) sus transacciones. La interfaz se actualiza en tiempo real sin necesidad de recargar la página.
* **Autenticación Segura y Rutas Protegidas:** Sistema de registro e inicio de sesión completo. El Dashboard y todas las operaciones de datos están protegidos y solo son accesibles para usuarios autenticados.
* **Seguridad a Nivel de Fila (RLS):** Los datos son completamente privados. Cada usuario solo puede acceder a sus propias transacciones gracias a las políticas de seguridad implementadas en la base de datos de Supabase.
* **Modo Demo Inteligente:** Permite a los visitantes probar la aplicación al instante. Se crea una cuenta de demostración única y temporal con un solo clic, que se limpia automáticamente del backend tras 30 minutos de inactividad.
* **Notificaciones Modernas:** La aplicación utiliza notificaciones "Toast" no intrusivas para dar feedback al usuario, mejorando la experiencia de usuario.
* **Diseño Responsive:** La interfaz está construida con Tailwind CSS y es completamente funcional en dispositivos de escritorio y móviles.

---

## Stack Tecnológico

### Frontend
* **React (con Vite):** Para una interfaz de usuario rápida, moderna y reactiva.
* **Tailwind CSS:** Para un diseño estilizado y responsive implementado de forma ágil.
* **React Router:** Para la gestión de la navegación en una Single Page Application (SPA).
* **React Hot Toast:** Para un sistema de notificaciones moderno.

### Backend (BaaS) & Base de Datos
* **Supabase:**
    * **Base de Datos PostgreSQL:** Para el almacenamiento de datos.
    * **Autenticación:** Gestión de usuarios, sesiones y seguridad.
    * **Funciones SQL y Cron Jobs:** Para la limpieza automática de usuarios demo inactivos (`pg_cron`).

### Despliegue
* **Vercel:** Para un despliegue continuo, rápido y optimizado del frontend, conectado directamente al repositorio de GitHub.

---

## Estado del Proyecto

**¡Completado!** La aplicación está 100% funcional y desplegada en Vercel.