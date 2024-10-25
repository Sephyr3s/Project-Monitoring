import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskInterface } from '../../interface/taskInterface';
import { Project } from '../../interface/proyectsInterface';
import { ProjectService } from '../../Services/proyectService.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './newTask.component.html',
  styleUrls: ['./newTask.component.css']
})
export class NewTaskComponent implements OnInit {
  task: TaskInterface = { id: 0, name: '', description: '', status: 'Pendiente', project: '' };
  projects: Project[] = [];
  filteredProjects: Project[] = [];

  constructor(
    public dialogRef: MatDialogRef<NewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskInterface,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
    this.filteredProjects = [];
  }

  filterProjects(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.toLowerCase();
    this.filteredProjects = this.projects.filter(project => project.name.toLowerCase().includes(filterValue));
  }
  displayProjectName(projectName: string): string {
    return projectName ? projectName : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.task);
  }
}
