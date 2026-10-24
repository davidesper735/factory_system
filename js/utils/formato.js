// FORMATO: convierte datos guardados (fechas, números) en texto bonito para mostrar.
// Las fechas se guardan como texto: "2026-10-06" o "2026-10-06T09:15".

const MESES = ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic."];

function conDosDigitos(numero) { // 5 -> "05"
  return String(numero).padStart(2, "0");
}

function conPuntosDeMiles(numero) { // 120000 -> "120.000"
  return String(numero).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ----- Fecha y hora de ahora -----
export function fechaDeHoyIso() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = conDosDigitos(hoy.getMonth() + 1);
  const dia = conDosDigitos(hoy.getDate());
  return anio + "-" + mes + "-" + dia;
}

export function fechaHoraActualIso() {
  const ahora = new Date();
  const hora = conDosDigitos(ahora.getHours());
  const minutos = conDosDigitos(ahora.getMinutes());
  return fechaDeHoyIso() + "T" + hora + ":" + minutos;
}

// ----- Fechas guardadas -> texto -----
export function formatearFecha(iso) { // "06 oct. 2026"
  const partes = iso.slice(0, 10).split("-");
  const anio = partes[0];
  const mes = Number(partes[1]);
  const dia = partes[2];
  return dia + " " + MESES[mes - 1] + " " + anio;
}

export function formatearFechaCorta(iso) { // "06/10/2026"
  const partes = iso.slice(0, 10).split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

export function formatearHora(iso) { // "09:15"
  return iso.slice(11, 16);
}

export function formatearFechaHora(iso) { // "06 oct. 2026 · 09:15"
  return formatearFecha(iso) + " · " + formatearHora(iso);
}

// ----- Otros datos -----
export function formatearCosto(valor) { // 120000 -> "$120.000"
  return "$" + conPuntosDeMiles(valor);
}

export function formatearCedula(digitos) { // "1098765432" -> "1.098.765.432"
  return conPuntosDeMiles(digitos);
}

export function formatearTelefono(digitos) { // "3001234567" -> "300 123 4567"
  return digitos.slice(0, 3) + " " + digitos.slice(3, 6) + " " + digitos.slice(6);
}

export function formatearTelefonoCompleto(digitos) { // "+57 300 123 4567"
  return "+57 " + formatearTelefono(digitos);
}

export function formatearTamano(bytes) { // 3355443 -> "3,2 MB"
  const megas = (bytes / 1048576).toFixed(1);
  return megas.replace(".", ",") + " MB";
}
