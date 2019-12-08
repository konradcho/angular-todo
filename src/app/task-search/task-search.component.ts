import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: [ './task-search.component.sass' ]
})
export class TaskSearchComponent implements OnInit {
  tasks$: Observable<Task[]>;
  private searchTerms = new Subject<string>();

  constructor(private taskService: TaskService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.tasks$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.taskService.searchTasks(term)),
    );
  }
}

