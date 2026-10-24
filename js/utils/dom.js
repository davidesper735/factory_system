// DOM: funciones pequeñas para crear y rellenar elementos de la página.
// Las usan varias vistas, así no repetimos código.
import { ESTADOS } from "../data/estados.js";

const ESPACIO_SVG = "http://www.w3.org/2000/svg";

export function porId(id) {
  return document.getElementById(id);
}

export function vaciar(contenedor) {
  contenedor.innerHTML = "";
}

// Crea un elemento. "clases" y "texto" son opcionales.
export function crearElemento(etiqueta, clases, texto) {
  const elemento = document.createElement(etiqueta);
  if (clases) {
    elemento.className = clases;
  }
  if (texto) {
    elemento.textContent = texto;
  }
  return elemento;
}

// Crea un ícono del archivo img/iconos.svg
export function crearIcono(nombre, etiqueta) {
  const svg = document.createElementNS(ESPACIO_SVG, "svg");
  svg.setAttribute("class", "icono");
  if (etiqueta) {
    svg.setAttribute("aria-label", etiqueta);
  } else {
    svg.setAttribute("aria-hidden", "true");
  }
  const uso = document.createElementNS(ESPACIO_SVG, "use");
  uso.setAttribute("href", "../img/iconos.svg#" + nombre);
  svg.appendChild(uso);
  return svg;
}

// Escribe texto en todos los elementos del HTML que tengan data-campo="nombre"
export function rellenarCampos(valores) {
  for (const campo in valores) {
    const elementos = document.querySelectorAll('[data-campo="' + campo + '"]');
    for (const elemento of elementos) {
      elemento.textContent = valores[campo];
    }
  }
}

// Pone el texto y el color del estado en los elementos con data-insignia
export function actualizarInsignias(estado) {
  const insignias = document.querySelectorAll("[data-insignia]");
  for (const insignia of insignias) {
    for (const otroEstado of ESTADOS) {
      insignia.classList.remove("insignia--" + otroEstado.clave);
    }
    insignia.classList.add("insignia--" + estado.clave);
    insignia.textContent = estado.texto;
  }
}

// Los enlaces con data-destino reciben el número de orden: detalle-orden.html?orden=123
export function agregarNumeroAEnlaces(numeroOrden) {
  const enlaces = document.querySelectorAll("[data-destino]");
  for (const enlace of enlaces) {
    enlace.href = enlace.dataset.destino + "?orden=" + numeroOrden;
  }
}

export function mostrarContenidoDeOrden() {
  porId("contenido-orden").hidden = false;
}

export function mostrarOrdenNoEncontrada() {
  porId("orden-no-encontrada").hidden = false;
}
