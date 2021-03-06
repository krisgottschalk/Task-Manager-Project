# Project Task Manager
<br>

>Task Manager is a simple web based application that allows you to create your own lists and add tasks to those lists. It was created to help you keep track of all the things you have (or want) to do in your everyday life. 

<br>

## Table of Contents

* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Video](#video)
* [Installation](#installation)
* [Usage Examples](#usage-examples)
* [Roadmap](#roadmap)
* [Contact](#contact)


## Technologies Used

- Angular
- NodeJs
- MongoDB
- ExpressJs
- Bootstrap 5
- Angular Material

## Features

- A sign up form allows you to register.
- Once registered a simple login makes sure only authorized users can access your lists and tasks.
- Dialog windows are in use for errors during login and registration.
- Create, read, update and delete lists and tasks. 
- Toggle the state of a task to complete/ uncomplete by simply clicking on it.


## Screenshots

- Some impressions of the web application 

<br>

![Home Screen](./img/Home_Screenshot%20.png)
![Sign Up Screen](./img/Signup%20Screenshot%20.png)
![Login Screen](./img/Login%20Screenshot%20.png)
![Main View Screen](./img/main-view-lists%20Screenshot%20.png)
![Toggle on/off tasks](./img/Toggle%20on%3Aoff%20task%20Screenshot%20.png)
![Create a task Screen](./img/Create%20a%20task%20Screenshot%20.png)

## Video

- Check out this video to see how the application looks like and how you can use it

https://user-images.githubusercontent.com/82497617/162583133-2c6775fb-2b93-411c-8764-819b21cd8d35.mov


## Installation

To get this project up and running follow these steps:

1. Open the terminal on your computer. Navigate to the place where you want to save the Task Manager Project using the command `cd`. Now you can create a folder for the project and change into it.
```bash
mkdir TaskManager
cd TaskManager
````

2. Now we can clone the git repository.
```bash
git clone https://github.com/krisgottschalk/Task-Manager-Project.git
```

3. Navigate to the frontend and run `npm install`. It installs all the packages and dependencies needed.
```bash
cd Task-Manager-Project
cd frontend
npm install
```

4. Now go back to the Task-Manager-Project directory and go to the backend folder and run the command `npm install` again.
```
cd ..
cd backend
npm install
```

5. Next you need to set up a database connection. If you're fine with using a local database, you should try MongoDB. To create a new database with MongoDB, you can use mongosh. The installation process can be found [_here_](https://www.mongodb.com/docs/mongodb-shell/install/#std-label-mdb-shell-install).

6. Once your done with the installation, type mongosh in your terminal. To create the database where we can save our lists and tasks, type `use TaskManager` in your terminal.
```
use TaskManager
```
7. Open the project in your IDE and create a file called `.env` in your backend folder. Paste `DB_CONNECTION = mongodb://127.0.0.1:27017/TaskManager` to use this as your DB Connection String to connect to your local database.
```
DB_CONNECTION = mongodb://127.0.0.1:27017/TaskManager
```
8. Now run `npm run watch` to start the server in your backend.
```
npm run watch
```
9. Open a second terminal, change into the frontend directory and run `ng serve` to start the frontend.
```
ng serve
```

## Usage Examples

All the components of the frontend can be found in the `frontend/src/app` folder. For example, if you want to edit the dialog window that opens in the login component, look for the `login/error-dialog` folder and open the `error-dialog.component.html`. Here you can easily customize what you want to say. 
```
<h2 mat-dialog-title>Wrong login credentials?</h2>

<mat-dialog-content>
    Your login attempt was not successful. <br/>
    Please try again. <br/>
</mat-dialog-content>

<mat-dialog-actions>
    <button mat-button mat-dialog-close>Ok</button>
</mat-dialog-actions>
```
The error-dialog component is used in the `login.component.ts` and is being called, once a user clicks on login. 

```
  openDialogError() {

    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  
    this.dialog.open(ErrorLoginDialogComponent, dialogConfig);
  }
```

The routing of the application is very important too. You can find all the routes in the `app-routing.module.ts`. They will look like this: 
```
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
```
For more information on how to develop a project using Angular, check out the Angular website [_here_](https://angular.io/start)




## Roadmap

### Improvements that could be made 

- Map lists and their tasks to one user, so each user can create their own lists and tasks by using their login credentials.
- Add  a feature to collaborate on tasks and lists, so multiple users from one household for example can edit/ update the same lists. 
- Implement a share button to share your lists with friends via email. 
- Add a search field in the header to quickly find the corresponding tasks.
- Move completed tasks to the bottom of the list.
- Add new tasks to the top.


## Contact

Created by Christina Gottschalk - you can find me on [Linkedin](https://www.linkedin.com/in/christina-gottschalk/)
