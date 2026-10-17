// CONTROLADOR: escucha los eventos del panel y coordina modelo y vista.
import * as modelo from "../models/panelModel.js";
import * as vista from "../views/panelView.js";

let accionPendiente = null; // { tipo, fila } mientras se espera la confirmación

// Muestra solo las filas que cumplen la búsqueda y el estado
function filtrar() {
  const filtros = vista.obtenerFiltros();
  let visibles = 0;
  vista.obtenerFilas().forEach((fila) => {
    const coincide = modelo.coincideFiltro(vista.textoDeFila(fila), vista.estadoDeFila(fila), filtros.texto, filtros.estado);
    vista.mostrarFila(fila, coincide);
    if (coincide) visibles++;
  });
  vista.actualizarResumen(visibles);
}

// Un solo "click" en la tabla sirve para todas las filas y botones
function clicEnTabla(evento) {
  const fila = evento.target.closest(".fila");
  if (!fila) return;
  vista.seleccionarFila(fila);

  const boton = evento.target.closest("[data-accion]");
  if (!boton) return;

  const accion = boton.dataset.accion;
  const datos = vista.leerFila(fila);

  if (accion === "editar") {
    window.location.href = "editar-orden.html"; // por ahora abre la orden de ejemplo #123
    return;
  }

  accionPendiente = { tipo: accion, fila: fila };
  if (accion === "eliminar") {
    vista.abrirConfirmacion("Eliminar orden " + datos.numero, "¿Seguro que quieres eliminar la orden de " + datos.cliente + "? Esta acción no se puede deshacer.", "Eliminar", true);
  } else {
    vista.abrirConfirmacion("Enviar aviso", "Se enviará un aviso por WhatsApp a " + datos.cliente + " sobre la orden " + datos.numero + ".", "Enviar aviso", false);
  }
}

function confirmarAccion() {
  const datos = vista.leerFila(accionPendiente.fila);
  if (accionPendiente.tipo === "eliminar") {
    vista.eliminarFila(accionPendiente.fila);
    filtrar();
    vista.mostrarMensaje("Orden " + datos.numero + " eliminada.", "exito");
  } else {
    vista.mostrarMensaje("Aviso enviado a " + datos.cliente + ".", "exito");
  }
  vista.cerrarConfirmacion();
  accionPendiente = null;
}

function iniciar() {
  const el = vista.elementos;
  el.buscador.addEventListener("input", filtrar);
  el.filtroEstado.addEventListener("change", filtrar);
  el.cuerpoTabla.addEventListener("click", clicEnTabla);

  el.confirmarAceptar.addEventListener("click", confirmarAccion);
  el.confirmarCancelar.addEventListener("click", vista.cerrarConfirmacion);
}

iniciar();
filtrar(); // calcula los contadores iniciales
