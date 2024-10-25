import { ConfirmDialogComponent } from './../../editTask/ConfirmDialog/ConfirmDialog.component';
import { Project } from './../../../interface/proyectsInterface';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TaskInterface } from '../../../interface/taskInterface';
import { LocalStorageService } from '../../../Services/localStorage.service';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './proyect-dialog.component.html',
})
export class ProjectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project },
    public dialog: MatDialog,
    private localStorageService: LocalStorageService // Asegúrate de inyectar el servicio de LocalStorage
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.data.project);
  }

  onDeleteClick(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { message: '¿Está seguro que desea eliminar el proyecto?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const tasks: TaskInterface[] = this.localStorageService.get<TaskInterface>('tasks');
        const hasTasks = tasks.some(task => task.project === this.data.project.name);
        if (hasTasks) {
          alert('No se puede eliminar el proyecto porque tiene tareas asociadas.');
        } else {
          this.dialogRef.close({ delete: true, id: this.data.project.id });
        }
      }
    });
  }
}
