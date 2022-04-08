import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListComponent } from './edit-list/edit-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MytasksComponent } from './mytasks/mytasks.component';
import { NewListComponent } from './new-list/new-list.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { RegisterComponent } from './register/register.component';
import { AuthguardGuard } from './guards/authguard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'mytasks', component: MytasksComponent, canActivate: [AuthguardGuard] },
  { path: 'mytasks/:listId', component: MytasksComponent, canActivate: [AuthguardGuard]},
  { path: 'mytasks/nl/newlist', component: NewListComponent, canActivate: [AuthguardGuard] },
  { path: 'mytasks/:listId/nl/newlist', component: NewListComponent, canActivate: [AuthguardGuard] },
  { path: 'mytasks/:listId/nt/newtask', component: NewTaskComponent, canActivate: [AuthguardGuard] },
  { path: 'mytasks/:listId/tasks/:taskId', component: EditTaskComponent, canActivate: [AuthguardGuard]},
  { path: 'mytasks/:listId/el/editList', component: EditListComponent, canActivate: [AuthguardGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
