import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.css']
})
export class NavigationButtonsComponent {
  constructor(private router: Router) {}

  goToProjects(): void {
    this.router.navigate(['/projects']);
  }

  goToTasks(): void {
    this.router.navigate(['/tasks']);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
