
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskTableComponent } from './taskTable/taskTable.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule } from '@angular/material/paginator';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NewTaskComponent } from './newTask/newTask.component';
import { MatInputModule } from '@angular/material/input';
import { EditTaskComponent } from './editTask/editTask.component';
import { ConfirmDialogComponent } from './editTask/ConfirmDialog/ConfirmDialog.component';
import { LoginComponent } from '../pages/login/login.component';
import { ProjectDialogComponent } from './proyects/proyect-dialog/proyect-dialog.component';
import { ProjectTableComponent } from './proyects/proyectTable.component';
import { LogoutButtonComponent } from '../shared/logout-button/logout-button.component';
import { NavigationButtonsComponent } from '../shared/navigation-buttons/navigation-buttons.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProjectCreateDialogComponent } from './proyects/projectCreateDialog/projectCreateDialog.component';

@NgModule({
  declarations: [
    TaskTableComponent,
    ProjectTableComponent,
    ProjectDialogComponent,
    NewTaskComponent,
    EditTaskComponent,
    ConfirmDialogComponent,
    LoginComponent,
    LogoutButtonComponent,
    NavigationButtonsComponent,
    ProjectCreateDialogComponent,

  ],
  imports: [
    CommonModule,
    MatTableModule,
    CdkTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatPaginatorModule
  ],
  exports: [
    TaskTableComponent,
    ProjectTableComponent,
    LogoutButtonComponent,
    NavigationButtonsComponent
  ],
  providers: [
    provideAnimationsAsync()
  ],
})
export class TaskModule { }
