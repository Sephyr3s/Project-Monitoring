import { Project } from './../interface/proyectsInterface';
import { Injectable } from '@angular/core';
import { TaskInterface } from '../interface/taskInterface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set<T>(key: string, data: T[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }

  get<T>(key: string): T[] {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]') as T[];
    } catch (e) {
      console.log(e);
      return [];
    }
  }

}

