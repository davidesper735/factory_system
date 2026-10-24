// MODELO: datos y reglas de negocio. No toca el HTML ni localStorage directamente.
import { leerDatos, guardarDatos, borrarDatos } from "../storage/almacenamiento.js";

const USUARIOS = [{ usuario: "admin", clave: "admin123" }]; // datos de prueba
const LLAVE_USUARIO = "factorySystem.usuarioRecordado";

// Devuelve un objeto con los errores (vacío si todo está bien)
export function validarCredenciales(usuario, clave) {
  const errores = {};

  if (usuario.trim() === "") {
    errores.usuario = "Escribe tu usuario.";
  } else if (usuario.trim().length < 3) {
    errores.usuario = "El usuario debe tener al menos 3 caracteres.";
  }

  if (clave === "") {
    errores.clave = "Escribe tu contraseña.";
  } else if (clave.length < 6) {
    errores.clave = "La contraseña debe tener al menos 6 caracteres.";
  }

  return errores;
}

export function autenticar(usuario, clave) {
  for (const registrado of USUARIOS) {
    if (registrado.usuario === usuario.trim() && registrado.clave === clave) {
      return true;
    }
  }
  return false;
}

export function guardarUsuario(usuario) {
  guardarDatos(LLAVE_USUARIO, usuario.trim());
}

export function olvidarUsuario() {
  borrarDatos(LLAVE_USUARIO);
}

export function obtenerUsuarioGuardado() {
  return leerDatos(LLAVE_USUARIO, "");
}
