import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from './task';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'api/tasks';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`TaskService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        tap(_ => this.log(`fetched tasks`)),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Task>(`getTask id=${id}`))
      );
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated task id=${task.id}`)),
        catchError(this.handleError<any>('updateTask'))
      );
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions)
      .pipe(
        tap((newTask: Task) => this.log(`added task w/ id=${newTask.id}`)),
        catchError(this.handleError<Task>('addTask'))
      );
  }

  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted task id=${id}`)),
        catchError(this.handleError<Task>('deleteTask'))
      );
  }

  searchTasks(term: string): Observable<Task[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Task[]>(`${this.tasksUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found tasks matching "${term}"`)),
        catchError(this.handleError<Task[]>('searchTasks', []))
      );
  }
}
