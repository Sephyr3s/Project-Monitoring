import { PROJECTS, Project } from './../interface/proyectsInterface';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsKey = 'projects';

  constructor(private localStorageService: LocalStorageService) {}
  getProjects(): Project[] {
    const projects = this.localStorageService.get<Project>(this.projectsKey);
    return projects.length ? projects : PROJECTS;
  }

  addProject(project: Project): void {
    const projects = this.getProjects();
    projects.push(project);
    this.localStorageService.set(this.projectsKey, projects);
  }

  updateProject(updatedProject: Project): void {
    const projects = this.getProjects();
    const index = projects.findIndex(project => project.id === updatedProject.id);
    if (index !== -1) {
      projects[index] = updatedProject;
      this.localStorageService.set(this.projectsKey, projects);
    }
  }

  deleteProject(id: number): void {
    const projects = this.getProjects();
    const index = projects.findIndex(project => project.id === id);
    if (index !== -1) {
      projects.splice(index, 1);
      this.localStorageService.set(this.projectsKey, projects);
    }
  }
}
