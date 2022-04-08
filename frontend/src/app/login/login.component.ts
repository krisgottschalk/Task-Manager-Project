import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { BackendService } from '../shared/backend.service';
import { ErrorLoginDialogComponent } from './error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder, 
    private bs: BackendService,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog
    ) {}

  onSubmit(): void {
    const values = this.loginForm.value;
    const email = values.email;
    const password =  values.password;

    this.bs.loginUser(email, password).subscribe(
        response => {
          console.log('response',response);
          this.auth.login(response);
          this.router.navigateByUrl('/mytasks');
        },
        error => {
          console.log('error', error);
          console.log('error status', error.status);
          console.log('error error message', error.error.error);
          this.auth.logout();
          this.openDialogError();
        })
    
  }

  openDialogError() {

    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  
    this.dialog.open(ErrorLoginDialogComponent, dialogConfig);
  }
}
