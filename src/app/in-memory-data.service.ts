import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const tasks = [
      { id: 1, name: 'task 1' },
      { id: 2, name: 'task 2' },
      { id: 3, name: 'task 3' },
      { id: 4, name: 'task 4' },
      { id: 5, name: 'task 5' },
      { id: 6, name: 'task 6' },
      { id: 7, name: 'task 7' },
      { id: 8, name: 'task 8' },
      { id: 9, name: 'task 9' },
      { id: 10, name: 'task 10' }
    ];
    return {tasks};
  }

  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  }
}
