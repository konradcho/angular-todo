import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  add(name: string) {
    name = name.trim();
    if (!name) { return; }
    this.taskService.addTask({ name } as Task).subscribe(task => {
      this.tasks.push(task);
    });
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(h => h !== task);
    this.taskService.deleteTask(task).subscribe();
  }
}
