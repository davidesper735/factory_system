// URL: lee los parámetros de la dirección (por ejemplo ?orden=123).
export function leerParametro(nombre) {
  return new URLSearchParams(window.location.search).get(nombre);
}
