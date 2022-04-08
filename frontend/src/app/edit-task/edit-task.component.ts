import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Task } from '../shared/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  listId: string = '';
  taskId: string = '';
  form: FormGroup;
  task!: Task; 

  constructor(
    private backendservice: BackendService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.form = this.fb.group(
      {
        titleControl: ['', Validators.required]
      }
    );
   }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('taskId') || '';
    this.listId = this.route.snapshot.paramMap.get('listId') || '';
    console.log(this.taskId);
    console.log(this.listId);
    this.readOne(this.listId, this.taskId);
  }

  readOne(listId: string, taskId: string): void {
    this.backendservice.getOneTask(listId, taskId).subscribe(
      (
        response: Task) => {
          this.task = response;
          console.log(this.task);

          this.form.patchValue({
            titleControl: this.task?.title
          });
          return this.task;
        },
        error => console.log(error)
      );
  }

  update(): void {
    const values = this.form.value;
    this.task.title = values.titleControl;
    console.log(this.task);
    this.backendservice.updateTask(this.taskId, this.task).subscribe((response: any) =>{
      console.log(response);
      this.location.back();
    });
    
  }

  cancel(): void {
    this.location.back();
  }

}
