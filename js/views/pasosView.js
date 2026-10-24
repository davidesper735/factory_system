// VISTA de pasos: construye con el DOM la lista de pasos del historial.
import { crearElemento, crearIcono, vaciar } from "../utils/dom.js";
import { formatearFechaHora } from "../utils/formato.js";

const ETIQUETAS = { completado: "Completado", actual: "Actual", pendiente: "Pendiente" };

function obtenerTextoDeFecha(paso) {
  if (paso.fecha !== "") {
    return formatearFechaHora(paso.fecha);
  }
  if (paso.situacion === "pendiente") {
    return "Pendiente";
  }
  return "Completado";
}

// El círculo tiene un chulo si el paso está completado; si no, tiene el número
function crearCirculo(paso) {
  const circulo = crearElemento("span", "paso__circulo");
  if (paso.situacion === "completado") {
    circulo.appendChild(crearIcono("check", "Completado"));
  } else {
    circulo.textContent = paso.numero;
  }
  return circulo;
}

function crearCuerpo(paso, opciones) {
  let claseEtiqueta = "paso__etiqueta";
  if (opciones.etiquetaSoloMovil) {
    claseEtiqueta = "paso__etiqueta solo-movil";
  }
  const cuerpo = crearElemento("div", "paso__cuerpo");
  cuerpo.appendChild(crearElemento("span", "insignia insignia--" + paso.clave, paso.texto));
  cuerpo.appendChild(crearElemento("span", claseEtiqueta, ETIQUETAS[paso.situacion]));
  cuerpo.appendChild(crearElemento("p", "paso__fecha", obtenerTextoDeFecha(paso)));
  if (opciones.conDetalle) {
    cuerpo.appendChild(crearElemento("p", "paso__detalle", paso.nota));
  }
  return cuerpo;
}

function crearPaso(paso, opciones) {
  const elemento = crearElemento("li", "paso paso--" + paso.situacion);
  if (paso.situacion === "actual") {
    elemento.setAttribute("aria-current", "step");
  }
  elemento.appendChild(crearCirculo(paso));
  elemento.appendChild(crearCuerpo(paso, opciones));
  return elemento;
}

export function renderizarPasos(contenedor, pasos, opciones) {
  vaciar(contenedor);
  for (const paso of pasos) {
    contenedor.appendChild(crearPaso(paso, opciones));
  }
}
