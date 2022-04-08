import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Task } from '../shared/task';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  form: FormGroup;
  task!: Task;
  listId: string = '';

  constructor(
    private backendservice: BackendService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        this.listId = params['listId'];
    })
    this.form = this.fb.group(
      {
        titleControl: ['', Validators.required],
        idControl: ['', Validators.required],
      });
     
   }

  
  

  ngOnInit(): void { 
  }

  onSubmit(): void {
    const values = this.form.value;
    const task = <Task> ({
      title: values.titleControl,
      _listId : this.listId
    })
    this.backendservice.createTask(task).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['../mytasks/', response._listId]);
    });
   
  }


  cancel(): void {
    this.location.back();
  }

}
