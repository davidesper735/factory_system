// DOM: funciones pequeñas para crear y rellenar elementos de la página.
// Las usan todas las vistas, así no se repite código.

const ESPACIO_SVG = "http://www.w3.org/2000/svg";

export function porId(id) {
  return document.getElementById(id);
}

export function crearElemento(etiqueta, clases = "", texto = "") {
  const elemento = document.createElement(etiqueta);
  if (clases) elemento.className = clases;
  if (texto) elemento.textContent = texto;
  return elemento;
}

// Crea un ícono del archivo img/iconos.svg
export function crearIcono(nombre, etiqueta = "") {
  const svg = document.createElementNS(ESPACIO_SVG, "svg");
  svg.setAttribute("class", "icono");
  svg.setAttribute(etiqueta ? "aria-label" : "aria-hidden", etiqueta || "true");
  const uso = document.createElementNS(ESPACIO_SVG, "use");
  uso.setAttribute("href", "../img/iconos.svg#" + nombre);
  svg.append(uso);
  return svg;
}

// Escribe texto en todos los elementos con data-campo="nombre"
export function rellenarCampos(valores) {
  Object.entries(valores).forEach(([campo, valor]) => {
    document.querySelectorAll('[data-campo="' + campo + '"]').forEach((elemento) => {
      elemento.textContent = valor;
    });
  });
}

// Pone el texto y el color del estado en los elementos con data-insignia
export function actualizarInsignias(estado) {
  document.querySelectorAll("[data-insignia]").forEach((insignia) => {
    insignia.className = insignia.className.replace(/insignia--\S+/g, "").trim() + " insignia--" + estado.clave;
    insignia.textContent = estado.texto;
  });
}

// Los enlaces con data-destino reciben el número de orden: detalle-orden.html?orden=123
export function agregarNumeroAEnlaces(numeroOrden) {
  document.querySelectorAll("[data-destino]").forEach((enlace) => {
    enlace.href = enlace.dataset.destino + "?orden=" + numeroOrden;
  });
}

export function mostrarContenidoDeOrden() {
  porId("contenido-orden").hidden = false;
}

export function mostrarOrdenNoEncontrada() {
  porId("orden-no-encontrada").hidden = false;
}
