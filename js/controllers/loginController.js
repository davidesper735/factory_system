// CONTROLADOR: escucha los eventos y coordina modelo y vista.
import * as modelo from "../models/usuarioModel.js";
import * as vista from "../views/loginView.js";

function enviarFormulario(evento) {
  evento.preventDefault(); // evita que la página se recargue

  const datos = vista.obtenerDatos();
  const errores = modelo.validarCredenciales(datos.usuario, datos.clave);
  vista.mostrarErrores(errores);
  vista.mostrarMensaje("", "error");

  if (Object.keys(errores).length > 0) return; // hay errores: no seguimos

  if (!modelo.autenticar(datos.usuario, datos.clave)) {
    vista.mostrarMensaje("Usuario o contraseña incorrectos.", "error");
    return;
  }

  if (datos.recordar) {
    modelo.guardarUsuario(datos.usuario);
  } else {
    modelo.olvidarUsuario();
  }
  window.location.href = "ordenes.html"; // navega al panel de órdenes
}

function iniciar() {
  const guardado = modelo.obtenerUsuarioGuardado();
  if (guardado) vista.rellenarUsuario(guardado);

  vista.elementos.formulario.addEventListener("submit", enviarFormulario);
  vista.elementos.botonVerClave.addEventListener("click", vista.alternarClave);
}

iniciar();
