// VISTA de fotos: construye con el DOM la lista de fotos de una orden.
import { crearElemento, vaciar } from "../utils/dom.js";

function crearImagen(evidencia) {
  if (evidencia.ruta === "") {
    // Foto subida por el usuario: solo se guardó su nombre, así que se muestra un recuadro
    const recuadro = crearElemento("div", "foto__imagen");
    recuadro.setAttribute("role", "img");
    recuadro.setAttribute("aria-label", evidencia.etiqueta);
    return recuadro;
  }
  const imagen = crearElemento("img", "foto__imagen");
  imagen.src = evidencia.ruta;
  imagen.alt = evidencia.etiqueta;
  return imagen;
}

function crearFoto(evidencia) {
  const leyenda = crearElemento("figcaption");
  leyenda.appendChild(crearElemento("strong", "", evidencia.etiqueta));
  leyenda.appendChild(crearElemento("span", "", evidencia.nombre));

  const figura = crearElemento("figure", "foto");
  figura.appendChild(crearImagen(evidencia));
  figura.appendChild(leyenda);
  return figura;
}

export function renderizarFotos(contenedor, evidencias) {
  vaciar(contenedor);
  for (const evidencia of evidencias) {
    contenedor.appendChild(crearFoto(evidencia));
  }
}
