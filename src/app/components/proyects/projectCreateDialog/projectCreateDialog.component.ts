import { Project } from './../../../interface/proyectsInterface';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-create-dialog',
  templateUrl: './projectCreateDialog.component.html',
})
export class ProjectCreateDialogComponent {
  project: Project = { id: 0, name: '', description: '', hasTasks: false };

  constructor(public dialogRef: MatDialogRef<ProjectCreateDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.project);
  }
}
