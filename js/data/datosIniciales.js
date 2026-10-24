// DATOS INICIALES: órdenes de ejemplo.
// Se guardan en localStorage SOLO la primera vez que se abre la aplicación.
// Para empezar sin datos, deja la lista vacía: export const ORDENES_INICIALES = [];

const CLAVES = ["recibido", "diagnostico", "reparacion", "listo", "entregado"];

// Crea un registro por cada estado, desde "recibido" hasta el estado actual
function crearHistorial(estadoActual, fechaIngreso) {
  const historial = [];
  for (const clave of CLAVES) {
    historial.push({ estado: clave, fecha: fechaIngreso + "T09:15" });
    if (clave === estadoActual) {
      break; // ya llegamos al estado actual: no seguimos
    }
  }
  return historial;
}

export const ORDENES_INICIALES = [
  {
    numero: 123,
    nombre: "Juan Pérez",
    cedula: "1098765432",
    telefono: "3001234567",
    tipo: "Portátil",
    marca: "HP",
    modelo: "Pavilion 15",
    falla: "Se apaga después de 15 minutos de uso y presenta sobrecalentamiento.",
    diagnostico: "Ventilador obstruido y pasta térmica seca. Limpieza interna y cambio de pasta térmica.",
    estado: "reparacion",
    fechaIngreso: "2026-10-06",
    tecnico: "Carlos Ruiz",
    costo: 120000,
    evidencias: [
      { nombre: "equipo_ingreso.jpg", etiqueta: "Vista del equipo", tamano: 1782579, ruta: "../img/equipo_ingreso.jpg" },
      { nombre: "ventilador_polvo.jpg", etiqueta: "Ventilador obstruido", tamano: 1572864, ruta: "../img/ventilador_polvo.jpg" },
    ],
    historial: [
      { estado: "recibido", fecha: "2026-10-06T09:15", nota: "Equipo registrado en el taller." },
      { estado: "diagnostico", fecha: "2026-10-06T14:30", nota: "Se identificó la causa del sobrecalentamiento." },
      { estado: "reparacion", fecha: "2026-10-07T10:00", nota: "Limpieza interna y cambio de pasta térmica en curso." },
    ],
  },
  {
    numero: 124,
    nombre: "Laura Gómez",
    cedula: "1012345678",
    telefono: "3105550124",
    tipo: "Portátil",
    marca: "Lenovo",
    modelo: "IdeaPad 3",
    falla: "El equipo no enciende.",
    diagnostico: "",
    estado: "recibido",
    fechaIngreso: "2026-10-08",
    tecnico: "Ana Torres",
    costo: 0,
    evidencias: [],
    historial: crearHistorial("recibido", "2026-10-08"),
  },
  {
    numero: 125,
    nombre: "Andrés López",
    cedula: "80123456",
    telefono: "3115550125",
    tipo: "Escritorio",
    marca: "Dell",
    modelo: "OptiPlex 7090",
    falla: "Se reinicia solo al iniciar Windows.",
    diagnostico: "Posible falla en la fuente de poder.",
    estado: "diagnostico",
    fechaIngreso: "2026-10-07",
    tecnico: "Carlos Ruiz",
    costo: 60000,
    evidencias: [],
    historial: crearHistorial("diagnostico", "2026-10-07"),
  },
  {
    numero: 126,
    nombre: "María Rodríguez",
    cedula: "52456789",
    telefono: "3125550126",
    tipo: "Portátil",
    marca: "ASUS",
    modelo: "VivoBook 14",
    falla: "La pantalla muestra líneas horizontales.",
    diagnostico: "Cable de pantalla dañado. Se reemplazó el cable.",
    estado: "listo",
    fechaIngreso: "2026-10-05",
    tecnico: "Ana Torres",
    costo: 180000,
    evidencias: [],
    historial: crearHistorial("listo", "2026-10-05"),
  },
  {
    numero: 127,
    nombre: "Diego Ramírez",
    cedula: "1023456789",
    telefono: "3135550127",
    tipo: "Portátil",
    marca: "Acer",
    modelo: "Aspire 5",
    falla: "La batería no carga.",
    diagnostico: "Batería agotada. Se cambió por una nueva.",
    estado: "entregado",
    fechaIngreso: "2026-10-02",
    tecnico: "Luis Moreno",
    costo: 95000,
    evidencias: [],
    historial: crearHistorial("entregado", "2026-10-02"),
  },
  {
    numero: 128,
    nombre: "Sofía Herrera",
    cedula: "1045678901",
    telefono: "3145550128",
    tipo: "Portátil",
    marca: "Apple",
    modelo: "MacBook Air M1",
    falla: "Varias teclas del teclado no responden.",
    diagnostico: "",
    estado: "recibido",
    fechaIngreso: "2026-10-08",
    tecnico: "Luis Moreno",
    costo: 0,
    evidencias: [],
    historial: crearHistorial("recibido", "2026-10-08"),
  },
];
