import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { List } from '../shared/list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  id: string = '';
  form: FormGroup;
  list!: List; 

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
    this.id = this.route.snapshot.paramMap.get('listId') || '';
    this.readOne(this.id);
  }

  readOne(id: string): void {
    this.backendservice.getOneList(id).subscribe(
      (
        response: List) => {
          this.list = response;
          console.log(this.list);

          this.form.patchValue({
            titleControl: this.list?.title
          });
          return this.list;
        },
        error => console.log(error)
      );
  }


  update(): void {
    const values = this.form.value;
    this.list.title = values.titleControl;
    console.log(this.list);
    this.backendservice.updateList(this.id, this.list).subscribe((response: any) =>{
      console.log(response);
      this.router.navigate(['../mytasks', response._id]);
    });
    
  }

  cancel(): void {
    this.location.back();
  }
 
}
