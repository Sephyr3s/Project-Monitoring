import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'shared-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
