// MODELO DE ÓRDENES: aquí está el CRUD (crear, leer, actualizar, eliminar).
// Maneja los datos, pero NO toca el HTML ni localStorage directamente:
// para guardar y leer usa el archivo storage/almacenamiento.js.
import { leerDatos, guardarDatos } from "../storage/almacenamiento.js";
import { ORDENES_INICIALES } from "../data/datosIniciales.js";
import { fechaHoraActualIso } from "../utils/formato.js";

const LLAVE_ORDENES = "factorySystem.ordenes";

// ----- Funciones internas -----
function cargarOrdenes() {
  const guardadas = leerDatos(LLAVE_ORDENES, null);
  if (guardadas !== null) return guardadas;
  guardarDatos(LLAVE_ORDENES, ORDENES_INICIALES); // primera vez: se guardan los datos de ejemplo
  return ORDENES_INICIALES;
}

function guardarOrdenes(ordenes) {
  guardarDatos(LLAVE_ORDENES, ordenes);
}

function calcularSiguienteNumero(ordenes) {
  return Math.max(0, ...ordenes.map((orden) => orden.numero)) + 1;
}

function crearRegistroDeEstado(estado) {
  return { estado: estado, fecha: fechaHoraActualIso() };
}

function combinarOrden(original, datosNuevos, evidenciasNuevas) {
  const cambioDeEstado = original.estado !== datosNuevos.estado;
  return {
    ...original,
    ...datosNuevos,
    evidencias: [...original.evidencias, ...evidenciasNuevas],
    historial: cambioDeEstado ? [...original.historial, crearRegistroDeEstado(datosNuevos.estado)] : original.historial,
  };
}

// ----- READ (leer) -----
export function obtenerOrdenes() {
  return cargarOrdenes();
}

export function buscarOrdenPorNumero(numero) {
  return cargarOrdenes().find((orden) => orden.numero === Number(numero)) || null;
}

export function buscarOrdenPorCedulaYNumero(cedula, numero) {
  const orden = buscarOrdenPorNumero(numero);
  return orden !== null && orden.cedula === cedula ? orden : null;
}

// ----- CREATE (crear) -----
export function crearOrden(datos, evidencias) {
  const ordenes = cargarOrdenes();
  const orden = {
    ...datos,
    numero: calcularSiguienteNumero(ordenes),
    evidencias: evidencias,
    historial: [crearRegistroDeEstado(datos.estado)],
  };
  guardarOrdenes([...ordenes, orden]);
  return orden;
}

// ----- UPDATE (actualizar) -----
export function actualizarOrden(numero, datosNuevos, evidenciasNuevas) {
  const ordenes = cargarOrdenes().map((orden) => {
    return orden.numero === numero ? combinarOrden(orden, datosNuevos, evidenciasNuevas) : orden;
  });
  guardarOrdenes(ordenes);
}

// ----- DELETE (eliminar) -----
export function eliminarOrden(numero) {
  guardarOrdenes(cargarOrdenes().filter((orden) => orden.numero !== numero));
}
