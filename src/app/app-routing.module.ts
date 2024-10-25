import { AuthGuard } from './AuthGuard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskTableComponent } from './components/taskTable/taskTable.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectTableComponent } from './components/proyects/proyectTable.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskTableComponent,
    // canActivate: [AuthGuard]
  },
  { path: 'projects', component: ProjectTableComponent }, // Cambiado de 'project' a 'projects'
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
