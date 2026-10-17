// VISTA compartida: errores por campo y mensaje general de cualquier formulario.

// Muestra (o limpia) el error de un campo. idCampo es el id del input.
export function mostrarError(idCampo, texto) {
  const entrada = document.getElementById(idCampo).closest(".entrada");
  document.getElementById("error-" + idCampo).textContent = texto || "";
  entrada.classList.toggle("entrada--error", Boolean(texto));
}

// tipo: "error" o "exito". Si no hay texto, se oculta el mensaje.
export function mostrarMensaje(texto, tipo) {
  const mensaje = document.getElementById("mensaje-form");
  mensaje.textContent = texto;
  mensaje.className = "mensaje mensaje--" + tipo;
  mensaje.hidden = !texto;
}

// Ventana de confirmación (la usan el panel y el formulario de nueva orden)
export function abrirConfirmacion(titulo, texto, textoBoton, esPeligro) {
  document.getElementById("confirmar-titulo").textContent = titulo;
  document.getElementById("confirmar-texto").textContent = texto;
  const aceptar = document.getElementById("confirmar-aceptar");
  aceptar.textContent = textoBoton;
  aceptar.classList.toggle("boton--peligro", esPeligro);
  document.getElementById("dialogo-confirmar").showModal();
}

export function cerrarConfirmacion() {
  document.getElementById("dialogo-confirmar").close();
}
