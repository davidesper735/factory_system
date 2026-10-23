// FORMATO: convierte datos guardados (fechas ISO, números) en texto para mostrar.
// No usa el DOM ni localStorage.

const MESES = ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic."];

const conDosDigitos = (numero) => String(numero).padStart(2, "0");
const conPuntosDeMiles = (texto) => String(texto).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// ----- Fechas: se guardan como "2026-10-06" o "2026-10-06T09:15" -----
export function fechaDeHoyIso() {
  const hoy = new Date();
  return hoy.getFullYear() + "-" + conDosDigitos(hoy.getMonth() + 1) + "-" + conDosDigitos(hoy.getDate());
}

export function fechaHoraActualIso() {
  const ahora = new Date();
  return fechaDeHoyIso() + "T" + conDosDigitos(ahora.getHours()) + ":" + conDosDigitos(ahora.getMinutes());
}

export function formatearFecha(iso) { // "06 oct. 2026"
  const [anio, mes, dia] = iso.slice(0, 10).split("-");
  return dia + " " + MESES[Number(mes) - 1] + " " + anio;
}

export function formatearFechaCorta(iso) { // "06/10/2026"
  const [anio, mes, dia] = iso.slice(0, 10).split("-");
  return dia + "/" + mes + "/" + anio;
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
  return (bytes / 1048576).toFixed(1).replace(".", ",") + " MB";
}
