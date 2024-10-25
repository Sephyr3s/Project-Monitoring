import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users=[
    {username: 'admin', password: 'admin123', role: 'admin'},
    {username: 'user', password: 'user123', role: 'admin'},
    {username: 'client', password: 'client123', role: 'client'},
    {username: '123', password: '123', role: 'client'},
    {username: '1', password: '1', role: 'admin'},
    {username: '2', password: '2', role: 'client'},
  ]


  private currentUser:{username: string, role: string} |null = null;
  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = { username: user.username, role: user.role };
      return true;
    }
    return false;
  }

  logout ():void {
  this.currentUser = null;
  }

  getCurrentUser():{username: string, role: string} | null {
      return this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }
  isClient(): boolean {
    return this.currentUser?.role === 'client';
  }

    constructor() { }
  }


