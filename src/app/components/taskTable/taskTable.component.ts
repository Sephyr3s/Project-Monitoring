import { AuthService } from './../../Services/auth.service';
import { LocalStorageService } from './../../Services/localStorage.service';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TASK, TaskInterface } from '../../interface/taskInterface';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from '../newTask/newTask.component';
import { EditTaskComponent } from '../editTask/editTask.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Project } from '../../interface/proyectsInterface';

@Component({
  selector: 'app-taskList',
  templateUrl: './taskTable.component.html',
  styleUrls: ['./taskTable.component.css']
})
export class TaskTableComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['project', 'name', 'description', 'status', 'action'];
  public dataSource: MatTableDataSource<TaskInterface>;
  public contadorPendientes: number = 0;
  public contadorIniciadas: number = 0;
  public contadorCompletadas: number = 0;
  public selecteStatus: string = '';
  public isAdmin: boolean = false;
  public projects: string[] = ['Proyecto A', 'Proyecto B', 'Proyecto C', 'Proyecto D'];
  public filteredProjects: string[] = this.projects;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
  ) {
    const savedTasks = this.localStorageService.get<TaskInterface>('tasks');
    this.dataSource = new MatTableDataSource<TaskInterface>(savedTasks.length ? savedTasks : TASK);
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator; // Asegúrate de que esta línea esté aquí
      this.actualizarContadores();
      this.cdr.detectChanges();
    }
  }

  ngOnInit(): void {
    this.actualizarContadores();
    this.filteredProjects = [];
    this.isAdmin = this.authService.isAdmin(); // Actualiza isAdmin según el rol del usuario
    this.dataSource.filterPredicate = (data: TaskInterface, filter: string) => {
      if (filter === '') {
        return true;
      }
      return data.status.toLowerCase() === filter;
    };
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 5;
    this.updateProjectsList();
  }

  applyFilter(filterValue: string) {
    this.selecteStatus = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.actualizarContadores();
  }

  public actualizarContadores(): void {
    const tareasFiltradas = this.selecteStatus
      ? this.dataSource.filteredData
      : this.dataSource.data; // Asegúrate de usar dataSource.data
    this.contadorPendientes = tareasFiltradas.filter(task => task.status === 'Pendiente').length;
    this.contadorIniciadas = tareasFiltradas.filter(task => task.status === 'Iniciada').length;
    this.contadorCompletadas = tareasFiltradas.filter(task => task.status === 'Completada').length;
  }

  public nuevaTarea(): void {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '390px',
      height: '615px',
      autoFocus: false, // Evita que el foco se coloque en el primer elemento del diálogo
      disableClose: true,
      data: {},
      panelClass: 'custom-dialog-container', // Evita que el diálogo se cierre al hacer clic fuera de él
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const tasks = this.dataSource.data;
        tasks.push(result);
        this.dataSource.data = tasks;
        this.localStorageService.set('tasks', tasks); // Guardar en localStorage
        this.actualizarContadores();
        this.updateProjectsList();
      }
    });
  }

  public editarTarea(tarea: TaskInterface): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '390px',
      height: '615px',
      autoFocus: false, // Evita que el foco se coloque en el primer elemento del diálogo
      disableClose: true,
      data: tarea,
      panelClass: 'custom-dialog-container', // Evita que el diálogo se cierre al hacer clic fuera de él
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.delete) {
          const index = this.dataSource.data.findIndex(t => t.id === result.id);
          if (index !== -1) {
            this.dataSource.data.splice(index, 1);
            this.dataSource.data = [...this.dataSource.data];
            this.localStorageService.set('tasks', this.dataSource.data); // Guardar en localStorage
            this.actualizarContadores();
          }
        } else {
          const index = this.dataSource.data.findIndex(t => t.id === result.id);
          if (index !== -1) {
            this.dataSource.data[index] = result;
            this.dataSource.data = [...this.dataSource.data];
            this.localStorageService.set('tasks', this.dataSource.data); // Guardar en localStorage
            this.actualizarContadores();
            this.updateProjectsList();
          }
        }
      }
    });
  }

  private updateProjectsList(): void {
    const allProjects = this.dataSource.data.map(task => task.project);
    this.projects = Array.from(new Set(allProjects)); // Elimina duplicados
  }
  filterProjects(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.toLowerCase();
    if (filterValue) {
      this.filteredProjects = this.projects.filter(project => project.toLowerCase().includes(filterValue));
    } else {
      this.filteredProjects = [];
    }  }

  applyProjectFilter(project: string): void {
    this.dataSource.filterPredicate = (data: TaskInterface, filter: string) => {
      return filter === '' || data.project.toLowerCase() === filter.toLowerCase();
    };
    this.dataSource.filter = project;
  }

}
