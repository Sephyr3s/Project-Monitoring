import { ProjectService } from './../../Services/proyectService.service';
import { ProjectDialogComponent } from './proyect-dialog/proyect-dialog.component';
import { Project } from './../../interface/proyectsInterface';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from '../../Services/localStorage.service';
import { ProjectCreateDialogComponent } from './projectCreateDialog/projectCreateDialog.component';
import { AuthService } from '../../Services/auth.service';
import { TaskInterface } from '../../interface/taskInterface';

@Component({
  selector: 'app-project-table',
  templateUrl: './proyectTable.component.html',
  styleUrls: ['./proyectTable.component.css']
})
export class ProjectTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'taskCount', 'action'];
  dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>();
  isAdmin: boolean = false;

  constructor(private projectService: ProjectService,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private authService: AuthService ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.isAdmin = this.authService.isAdmin();
  }

  loadProjects(): void {
    this.dataSource.data = this.projectService.getProjects();
  }

  getTaskCount(projectName: string): number {
    const tasks: TaskInterface[] = this.localStorageService.get<TaskInterface>('tasks');
    return tasks.filter(task => task.project === projectName).length;
  }

  nuevoProyecto(): void {
    const dialogRef = this.dialog.open(ProjectCreateDialogComponent, {
      width: '850px',
      data: { project: new Project(0, '', '', false) },
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.addProject(result);
        this.loadProjects();
      }
    });
  }

  editarProyecto(project: Project): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '800px',
      height: 'auto',
      data: { project },
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.delete) {
          this.projectService.deleteProject(result.id);
        } else {
          this.projectService.updateProject(result);
        }
        this.loadProjects();
      }
    });
  }
}
