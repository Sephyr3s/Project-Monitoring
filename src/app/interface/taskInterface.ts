export interface TaskInterface {
  id: number;
  name: string;
  description: string;
  status: 'Pendiente' | 'Iniciada' | 'Completada';
  project: string; // Nueva propiedad
}

export const TASK: TaskInterface[] = [
  {
    id: 1,
    name: 'Desarrollar la página de inicio',
    description: 'Crear y diseñar la página de inicio del sitio web con HTML, CSS y JavaScript.',
    status: 'Iniciada',
    project: 'Proyecto A'
  },
  {
    id: 2,
    name: 'Configurar el servidor',
    description: 'Instalar y configurar el servidor para el entorno de desarrollo.',
    status: 'Pendiente',
    project: 'Proyecto B'
  },
  {
    id: 3,
    name: 'Implementar autenticación',
    description: 'Añadir funcionalidad de inicio de sesión y registro de usuarios.',
    status: 'Pendiente',
    project: 'Proyecto C'
  },
  {
    id: 4,
    name: 'Realizar pruebas unitarias',
    description: 'Escribir y ejecutar pruebas unitarias para los componentes principales.',
    status: 'Completada',
    project: 'Proyecto A'
  },
  {
    id: 5,
    name: 'Diseñar la base de datos',
    description: 'Crear el esquema de la base de datos y las tablas necesarias.',
    status: 'Pendiente',
    project: 'Proyecto D'
  },
  {
    id: 6,
    name: 'Desarrollar la API',
    description: 'Implementar la API RESTful para la aplicación.',
    status: 'Iniciada',
    project: 'Proyecto B'
  },
  {
    id: 7,
    name: 'Crear documentación',
    description: 'Escribir la documentación del proyecto para los desarrolladores.',
    status: 'Pendiente',
    project: 'Proyecto C'
  },
  {
    id: 8,
    name: 'Optimizar el rendimiento',
    description: 'Mejorar el rendimiento de la aplicación mediante optimizaciones de código.',
    status: 'Completada',
    project: 'Proyecto A'
  },
  {
    id: 9,
    name: 'Implementar notificaciones',
    description: 'Añadir funcionalidad de notificaciones en tiempo real.',
    status: 'Iniciada',
    project: 'Proyecto D'
  },
  {
    id: 10,
    name: 'Realizar pruebas de integración',
    description: 'Escribir y ejecutar pruebas de integración para asegurar la cohesión del sistema.',
    status: 'Pendiente',
    project: 'Proyecto B'
  }
];
