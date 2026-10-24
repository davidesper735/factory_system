// MODELO DE PROGRESO: a partir de una orden calcula los pasos del historial
// y los textos que se le muestran al cliente. No toca el HTML.
import { ESTADOS, indiceDeEstado } from "../data/estados.js";
import { formatearFecha } from "../utils/formato.js";

// Busca el último registro del historial que tenga ese estado (o null)
function buscarUltimoRegistro(orden, claveEstado) {
  let ultimo = null;
  for (const registro of orden.historial) {
    if (registro.estado === claveEstado) {
      ultimo = registro;
    }
  }
  return ultimo;
}

function calcularSituacion(indicePaso, indiceActual) {
  if (indicePaso < indiceActual) {
    return "completado";
  }
  if (indicePaso === indiceActual) {
    return "actual";
  }
  return "pendiente";
}

// Devuelve los 5 pasos. Cada uno puede estar: completado, actual o pendiente
export function construirPasos(orden) {
  let indiceActual = indiceDeEstado(orden.estado);
  if (orden.estado === "entregado") {
    indiceActual = ESTADOS.length; // si ya se entregó, todos los pasos quedan completados
  }

  const pasos = [];
  for (let indice = 0; indice < ESTADOS.length; indice++) {
    const estado = ESTADOS[indice];
    const paso = {
      numero: indice + 1,
      clave: estado.clave,
      texto: estado.texto,
      situacion: calcularSituacion(indice, indiceActual),
      fecha: "",
      nota: estado.nota,
    };
    const registro = buscarUltimoRegistro(orden, estado.clave);
    if (registro !== null) {
      paso.fecha = registro.fecha;
      if (registro.nota) {
        paso.nota = registro.nota;
      }
    }
    pasos.push(paso);
  }
  return pasos;
}

export function ultimaActualizacion(orden) {
  return orden.historial[orden.historial.length - 1].fecha;
}

export function notaDelEstadoActual(orden) {
  const pasos = construirPasos(orden);
  for (const paso of pasos) {
    if (paso.situacion === "actual") {
      return paso.nota;
    }
  }
  return "Tu equipo ya fue entregado.";
}

function obtenerPendientes(orden) {
  const pendientes = [];
  for (const paso of construirPasos(orden)) {
    if (paso.situacion === "pendiente") {
      pendientes.push(paso);
    }
  }
  return pendientes;
}

// Une los nombres: "Listo y Entregado"
function unirNombres(pasos) {
  let texto = "";
  for (let i = 0; i < pasos.length; i++) {
    if (i > 0 && i === pasos.length - 1) {
      texto = texto + " y ";
    } else if (i > 0) {
      texto = texto + ", ";
    }
    texto = texto + pasos[i].texto;
  }
  return texto;
}

// Texto que se muestra al cliente debajo del progreso
export function notaDeProgresoCliente(orden) {
  const pendientes = obtenerPendientes(orden);
  if (pendientes.length === 0) {
    return "Tu equipo ya fue entregado. ¡Gracias por confiar en nosotros!";
  }
  let verbo = "están pendientes";
  if (pendientes.length === 1) {
    verbo = "está pendiente";
  }
  let cierre = "Te avisaremos cuando tu equipo esté listo para recoger.";
  if (orden.estado === "listo") {
    cierre = "Puedes pasar por tu equipo al taller.";
  }
  return unirNombres(pendientes) + " " + verbo + ". " + cierre;
}

// Texto que se muestra debajo del historial de estados
export function notaDeHistorial(orden) {
  const pendientes = obtenerPendientes(orden);
  if (pendientes.length === 0) {
    return "La orden está completa: el equipo fue entregado.";
  }
  let verbo = "siguen pendientes";
  if (pendientes.length === 1) {
    verbo = "sigue pendiente";
  }
  return unirNombres(pendientes) + " " + verbo + ". Se avisará al cliente cuando finalice la reparación.";
}

export function avisoParaCliente(orden) {
  if (orden.estado === "entregado") {
    return "Tu equipo ya fue entregado.";
  }
  if (orden.estado === "listo") {
    return "¡Tu equipo está listo! Puedes pasar a recogerlo al taller.";
  }
  return "Tu equipo aún no está listo para entrega. No necesitas acudir al taller todavía.";
}

export function textoAutorDiagnostico(orden) {
  const registro = buscarUltimoRegistro(orden, "diagnostico");
  if (orden.diagnostico === "" || registro === null) {
    return "";
  }
  return orden.tecnico + " · Diagnóstico registrado el " + formatearFecha(registro.fecha);
}
