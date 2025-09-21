/**
 * @file supabaseClient.jsx
 * @module lib/supabaseClient
 * @description Módulo de inicialización y exportación del cliente singleton de Supabase.
 * Centraliza la configuración de la conexión con la API de Supabase, utilizando
 * variables de entorno para una gestión segura de las credenciales.
 */

import { createClient } from "@supabase/supabase-js";

// Se obtienen las credenciales de la API desde las variables de entorno de Vite.
// El prefijo `VITE_` es mandatorio para que Vite exponga estas variables al cliente de forma segura.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * @constant {SupabaseClient} supabase
 * @description Instancia singleton del cliente de Supabase. Esta instancia se importa
 * a lo largo de la aplicación para interactuar con los servicios de Supabase
 * (Autenticación, Base de Datos, etc.) de forma consistente.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
