import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { List } from '../shared/list';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
  form: FormGroup;
  data!: List;

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
      this.data = { title: ''}; 
     }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.warn(this.form.value);
    const values = this.form.value;
    this.data.title = values.titleControl;
    console.log(this.data);
    this.backendservice.createList(this.data).subscribe((response: any) =>{
      console.log(response);
      this.router.navigate(['../mytasks', response._id]);
    });
    
  }

  cancel(): void {
    this.location.back();
  }

}
