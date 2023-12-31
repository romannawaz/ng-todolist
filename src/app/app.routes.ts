import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todo',
    loadComponent: () => import('./todo/page').then((c) => c.TodoPageComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'todo',
  },
];
