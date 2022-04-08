import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from './list';
import { Task } from './task';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  tasksUrl ='http://localhost:3000/lists';
  userURL ='http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getAll(): Observable<List[]>{
    return this.http.get<List[]>(this.tasksUrl);
  };

  getOneList(id: string): Observable<List>{
    return this.http.get<List>(this.tasksUrl + '/' + id);
  }

  createList(listData: List): Observable<List>{
    return this.http.post<List>(this.tasksUrl, listData);
  } 

  updateList(id: string, data: List): Observable<List> {
    return this.http.patch<List>(this.tasksUrl + '/' + id, data);
  }

  deleteList(id: string): Observable<any>{
    return this.http.delete<any>(this.tasksUrl + '/' + id, {observe: 'response'});
  }


  getAllTasks(listId: any): Observable<Task[]>{
  return this.http.get<Task[]>(this.tasksUrl + `/${listId}/tasks`);
  };

  getOneTask(listId: string, taskId: string): Observable<Task>{
    return this.http.get<Task>(this.tasksUrl + `/${listId}/tasks/${taskId}`);
  }

  createTask(taskData: Task): Observable<Task>{
    return this.http.post<Task>(this.tasksUrl +`/${taskData._listId}/tasks`, taskData);
  };

  updateTask(taskId: string, taskData: Task): Observable<Task> {
    return this.http.patch<Task>(this.tasksUrl + `/${taskData._listId}/tasks/${taskId}`, taskData);
  }

  completeTask(task: Task){
    return this.http.patch(this.tasksUrl + `/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }

  deleteTask(taskData: Task): Observable<any> {
    return this.http.delete<Task>(this.tasksUrl + `/${taskData._listId}/tasks/${taskData._id}`, {observe: 'response'});
  }

  registerNewUser(user: User): Observable<User>{
    return this.http.post<User>(this.userURL, user);
  }

  checkIfExist(email: string): Observable<User>{
    return this.http.get<User>(this.userURL + '/' + email);
  }

  loginUser(email: string, password: string): Observable<any>{
    return this.http.post<User>(this.userURL + '/login/' + email, { password: password });
  }


}
