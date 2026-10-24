// MODELO DE ÓRDENES: aquí está el CRUD (crear, leer, actualizar, eliminar).
// Maneja los datos, pero NO toca el HTML ni localStorage directamente:
// para guardar y leer usa el archivo storage/almacenamiento.js.
import { leerDatos, guardarDatos } from "../storage/almacenamiento.js";
import { ORDENES_INICIALES } from "../data/datosIniciales.js";
import { fechaHoraActualIso } from "../utils/formato.js";

const LLAVE_ORDENES = "factorySystem.ordenes";

// ----- Funciones internas (solo se usan dentro de este archivo) -----

// Lee la lista de órdenes. La primera vez guarda los datos de ejemplo.
function cargarOrdenes() {
  const guardadas = leerDatos(LLAVE_ORDENES, null);
  if (guardadas === null) {
    guardarDatos(LLAVE_ORDENES, ORDENES_INICIALES);
    return leerDatos(LLAVE_ORDENES, []);
  }
  return guardadas;
}

function guardarOrdenes(ordenes) {
  guardarDatos(LLAVE_ORDENES, ordenes);
}

// El número nuevo es el mayor número que existe + 1
function calcularSiguienteNumero(ordenes) {
  let mayor = 0;
  for (const orden of ordenes) {
    if (orden.numero > mayor) {
      mayor = orden.numero;
    }
  }
  return mayor + 1;
}

function crearRegistroDeEstado(estado) {
  return { estado: estado, fecha: fechaHoraActualIso() };
}

// Copia los datos del formulario dentro de la orden
function copiarDatos(orden, datos) {
  orden.nombre = datos.nombre;
  orden.cedula = datos.cedula;
  orden.telefono = datos.telefono;
  orden.tipo = datos.tipo;
  orden.marca = datos.marca;
  orden.modelo = datos.modelo;
  orden.falla = datos.falla;
  orden.diagnostico = datos.diagnostico;
  orden.estado = datos.estado;
  orden.fechaIngreso = datos.fechaIngreso;
  orden.tecnico = datos.tecnico;
  orden.costo = datos.costo;
}

// ----- READ (leer) -----
export function obtenerOrdenes() {
  return cargarOrdenes();
}

export function buscarOrdenPorNumero(numero) {
  const ordenes = cargarOrdenes();
  for (const orden of ordenes) {
    if (orden.numero === Number(numero)) {
      return orden;
    }
  }
  return null;
}

export function buscarOrdenPorCedulaYNumero(cedula, numero) {
  const orden = buscarOrdenPorNumero(numero);
  if (orden !== null && orden.cedula === cedula) {
    return orden;
  }
  return null;
}

// ----- CREATE (crear) -----
export function crearOrden(datos, evidencias) {
  const ordenes = cargarOrdenes();
  const orden = {};
  copiarDatos(orden, datos);
  orden.numero = calcularSiguienteNumero(ordenes);
  orden.evidencias = evidencias;
  orden.historial = [crearRegistroDeEstado(datos.estado)];

  ordenes.push(orden);
  guardarOrdenes(ordenes);
  return orden;
}

// ----- UPDATE (actualizar) -----
export function actualizarOrden(numero, datos, evidenciasNuevas) {
  const ordenes = cargarOrdenes();
  for (const orden of ordenes) {
    if (orden.numero === numero) {
      const estadoAnterior = orden.estado;
      copiarDatos(orden, datos);
      for (const evidencia of evidenciasNuevas) {
        orden.evidencias.push(evidencia);
      }
      if (estadoAnterior !== datos.estado) {
        orden.historial.push(crearRegistroDeEstado(datos.estado)); // el estado cambió
      }
    }
  }
  guardarOrdenes(ordenes);
}

// ----- DELETE (eliminar) -----
export function eliminarOrden(numero) {
  const ordenes = cargarOrdenes();
  const ordenesQueQuedan = [];
  for (const orden of ordenes) {
    if (orden.numero !== numero) {
      ordenesQueQuedan.push(orden);
    }
  }
  guardarOrdenes(ordenesQueQuedan);
}
