// VISTA de pasos: construye con el DOM la lista de pasos del historial.
import { crearElemento, crearIcono } from "../utils/dom.js";
import { formatearFechaHora } from "../utils/formato.js";

const ETIQUETAS = { completado: "Completado", actual: "Actual", pendiente: "Pendiente" };

function obtenerTextoDeFecha(paso) {
  if (paso.fecha !== "") return formatearFechaHora(paso.fecha);
  return paso.situacion === "pendiente" ? "Pendiente" : "Completado";
}

function crearCirculo(paso) {
  const circulo = crearElemento("span", "paso__circulo");
  if (paso.situacion === "completado") {
    circulo.append(crearIcono("check", "Completado"));
  } else {
    circulo.textContent = paso.numero;
  }
  return circulo;
}

function crearCuerpo(paso, opciones) {
  const claseEtiqueta = opciones.etiquetaSoloMovil ? "paso__etiqueta solo-movil" : "paso__etiqueta";
  const cuerpo = crearElemento("div", "paso__cuerpo");
  cuerpo.append(
    crearElemento("span", "insignia insignia--" + paso.clave, paso.texto),
    crearElemento("span", claseEtiqueta, ETIQUETAS[paso.situacion]),
    crearElemento("p", "paso__fecha", obtenerTextoDeFecha(paso))
  );
  if (opciones.conDetalle) cuerpo.append(crearElemento("p", "paso__detalle", paso.nota));
  return cuerpo;
}

function crearPaso(paso, opciones) {
  const elemento = crearElemento("li", "paso paso--" + paso.situacion);
  if (paso.situacion === "actual") elemento.setAttribute("aria-current", "step");
  elemento.append(crearCirculo(paso), crearCuerpo(paso, opciones));
  return elemento;
}

export function renderizarPasos(contenedor, pasos, opciones) {
  contenedor.replaceChildren(...pasos.map((paso) => crearPaso(paso, opciones)));
}
