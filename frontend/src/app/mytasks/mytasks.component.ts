import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { List } from '../shared/list';
import { Task } from '../shared/task';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mytasks', 
  templateUrl: './mytasks.component.html',
  styleUrls: ['./mytasks.component.css']
})
export class MytasksComponent implements OnInit {
  id: string = '';
  lists!: any[];
  tasks!: Task[];
  selectedListId!: string;
  listClicked = true;
  deletedList = false;


  constructor(private route: ActivatedRoute, 
              private bs: BackendService, 
              private router: Router,
              private location: Location
              ) { }

  ngOnInit(): void {
    this.readAll();
    this.readAllTasks();
  }

  readAll(): void {
    this.bs.getAll().subscribe(
      (
        response: List[]) => {
          this.lists = response;
          console.log(this.lists);
          return this.lists;
        },
        error => console.log(error)
      );
  }

 readAllTasks(): void {
  this.route.params.subscribe(
    (params: Params) => {
      console.log(params);
      if(params['listId']) {
        this.listClicked = true;
      }
      else {
        this.listClicked = false;
      }
    this.bs.getAllTasks(params['listId']).subscribe(
      (
        response: Task[]) => {
          this.tasks = response;
          return this.tasks;
        },
        error => console.log(error)
      );
  })
}

onTaskClick(task: Task) {
  this.bs.completeTask(task).subscribe(() => {
    console.log('Completed successfully!');
    task.completed = !task.completed;
  }
  ) 
}

deleteList(): void {
  this.route.params.subscribe(
    (params: Params) => {
      console.log(params);
  
  this.bs.deleteList(params['listId']).subscribe(
    (
      response: any) => {
        console.log('response: ', response);
        if(response.status == 204){
          console.log(response.status);
          this.reload(true);
        } else {
          console.log(response.status);
          console.log(response.error);
          this.reload(false);
        }
      },
      error => console.log(error)
    );
    })
}

deleteTask(task: Task): void {
  this.bs.deleteTask(task).subscribe(
    (
      response: any) => {
        console.log('response: ', response);
        if(response.status==204){
          console.log(response.status);
          this.reloadTask(true);
        } else {
          console.log(response.status);
          console.log(response.error);
          this.reloadTask(false);
        }
      },
      error => console.log(error)
  );
}

reload(deletedList : boolean)
{
  this.deletedList = deletedList;
  this.readAll();
  this.router.navigateByUrl('/mytasks');
}

reloadTask(deletedList: boolean)
{
  this.route.params.subscribe(
    (params: Params) => {
      console.log(params)
      this.selectedListId = params['listId'];
      
      this.deletedList = deletedList;
      this.readAll();
      this.readAllTasks();
      this.router.navigateByUrl(`/mytasks/${this.selectedListId}`);
    
    
    });

  
  
}

}


