import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TaskInterface } from '../../interface/taskInterface';
import { ConfirmDialogComponent } from './ConfirmDialog/ConfirmDialog.component';
import { Project } from '../../interface/proyectsInterface';
import { ProjectService } from '../../Services/proyectService.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './editTask.component.html',
  styleUrls: ['./editTask.component.css']
})
export class EditTaskComponent implements OnInit {
  public task: TaskInterface;
  projects: Project[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskInterface,
    public dialog: MatDialog,
    private projectService: ProjectService // Asegúrate de inyectar el servicio de proyectos
  ) {
    this.task = { ...data }; // Clona los datos para evitar modificar el original directamente
  }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.task);
  }

  onDeleteClick(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close({ delete: true, id: this.task.id });
      }
    });
  }
}
