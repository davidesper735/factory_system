// VISTA (JS): lee y modifica el HTML. No contiene reglas de negocio.
import { mostrarError } from "./formularioView.js";
export { mostrarMensaje } from "./formularioView.js";

export const elementos = {
  formulario: document.getElementById("form-login"),
  usuario: document.getElementById("usuario"),
  clave: document.getElementById("clave"),
  recordar: document.getElementById("recordar"),
  botonVerClave: document.getElementById("boton-ver-clave"),
  iconoVerClave: document.getElementById("icono-ver-clave"),
};

export function obtenerDatos() {
  return {
    usuario: elementos.usuario.value,
    clave: elementos.clave.value,
    recordar: elementos.recordar.checked,
  };
}

export function mostrarErrores(errores) {
  mostrarError("usuario", errores.usuario);
  mostrarError("clave", errores.clave);
}

// Muestra u oculta la contraseña cuando se pulsa el ojo
export function alternarClave() {
  const estaOculta = elementos.clave.type === "password";
  if (estaOculta) {
    elementos.clave.type = "text";
    elementos.iconoVerClave.setAttribute("href", "../img/iconos.svg#ojo");
    elementos.botonVerClave.setAttribute("aria-label", "Ocultar contraseña");
  } else {
    elementos.clave.type = "password";
    elementos.iconoVerClave.setAttribute("href", "../img/iconos.svg#ojo-tachado");
    elementos.botonVerClave.setAttribute("aria-label", "Mostrar contraseña");
  }
}

export function rellenarUsuario(usuario) {
  elementos.usuario.value = usuario;
  elementos.recordar.checked = true;
}
