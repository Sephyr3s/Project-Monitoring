export class Project {
  id: number;
  name: string;
  description: string;
  hasTasks: boolean;

  constructor(id: number, name: string, description: string, hasTasks: boolean) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.hasTasks = hasTasks;
  }
}

// Ejemplos de proyectos
export const PROJECTS: Project[] = [
  new Project(1, 'Proyecto A', 'Descripción del Proyecto A', false),
  new Project(2, 'Proyecto B', 'Descripción del Proyecto B', false),
  new Project(3, 'Proyecto C', 'Descripción del Proyecto C', false),
  new Project(4, 'Proyecto D', 'Descripción del Proyecto D', false)
];
