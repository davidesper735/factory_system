// VISTA de fotos: construye con el DOM la lista de fotos de una orden.
import { crearElemento } from "../utils/dom.js";

function crearImagen(evidencia) {
  if (evidencia.ruta === "") { // foto subida por el usuario: solo se guardó su nombre
    const marcador = crearElemento("div", "foto__imagen");
    marcador.setAttribute("role", "img");
    marcador.setAttribute("aria-label", evidencia.etiqueta);
    return marcador;
  }
  const imagen = crearElemento("img", "foto__imagen");
  imagen.src = evidencia.ruta;
  imagen.alt = evidencia.etiqueta;
  return imagen;
}

function crearFoto(evidencia) {
  const leyenda = crearElemento("figcaption");
  leyenda.append(crearElemento("strong", "", evidencia.etiqueta), crearElemento("span", "", evidencia.nombre));
  const figura = crearElemento("figure", "foto");
  figura.append(crearImagen(evidencia), leyenda);
  return figura;
}

export function renderizarFotos(contenedor, evidencias) {
  contenedor.replaceChildren(...evidencias.map(crearFoto));
}
