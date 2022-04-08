import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { User } from '../shared/user';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ExistDialogComponent } from './exist-dialog/exist-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

function validation () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event: any) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  user!: User;

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = this.registerForm?.get('password')?.value;
    let confirmPass = this.registerForm?.get('passwordrepeat')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  registerForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.compose([
      Validators.required,
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(8),
      Validators.maxLength(20)])
    ],
    passwordrepeat: [null],
  }, {validators: this.checkPasswords});

 

  constructor(
    private fb: FormBuilder,
    private backendservice: BackendService,
    private dialog: MatDialog,
    private router: Router
    ) {}

  ngOnInit(): void {
    validation();
  }

  onSubmit(): void {
    if(this.registerForm.valid)
    {
      const values = this.registerForm.value;
      console.log(values);
      this.user = {
      name: values.name,
      email: values.email,
      password: values.password
      };
  
      console.log("user : ", this.user);
      this.backendservice.registerNewUser(this.user).subscribe(
          response => {
            console.log(response);
            console.log(response.password);
            this.openDialogRegistration();
            this.router.navigateByUrl('/login');
          },
          error => {
            console.log(error);
          })
    }
    else {
      this.openDialogError();
    }
  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ExistDialogComponent, dialogConfig);
}

openDialogRegistration() {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  this.dialog.open(RegisterDialogComponent, dialogConfig);
}

openDialogError() {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  this.dialog.open(ErrorDialogComponent, dialogConfig);
}

  checkIfExists(evt: any): void {
    let email = this.registerForm.get('email')?.value;
    console.log('event-target', evt);
    console.log(email);
    this.backendservice.checkIfExist(email).subscribe(
      response => {
        console.log(response);
        if(response) {
          this.openDialog();
      }
    },
      error => {
        console.log(error);
      }
    );
  }
  
}
