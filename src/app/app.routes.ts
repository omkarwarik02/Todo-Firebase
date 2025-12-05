import { Routes } from '@angular/router';
import { TodoCreate } from './components/todo-create/todo-create';
import { TodoList } from './components/todo-list/todo-list';
import { TodoEdit } from './components/todo-edit/todo-edit';
import { Dashboard } from './components/dashboard/dashboard';
import { NavbarComponent } from './layout/navbar/navbar';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'todo-create',
        component: TodoCreate,
      },
      {
        path: 'todo-list',
        component: TodoList,
      },
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'todo-edit/:id',
        component: TodoEdit,
      },
    ],
  },
];
