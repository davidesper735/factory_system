// MODELO: datos y reglas de negocio. No toca el HTML.
const USUARIOS = [{ usuario: "admin", clave: "admin123" }]; // datos de prueba
const LLAVE = "usuarioRecordado";

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
  return USUARIOS.some((u) => u.usuario === usuario.trim() && u.clave === clave);
}

export function guardarUsuario(usuario) {
  localStorage.setItem(LLAVE, usuario.trim());
}

export function olvidarUsuario() {
  localStorage.removeItem(LLAVE);
}

export function obtenerUsuarioGuardado() {
  return localStorage.getItem(LLAVE) || "";
}
