import { Routes } from '@angular/router';
import { firstStepCompleted, secondStepCompleted } from './core/guards';

export const routes: Routes = [
  { 
    path: 'model',
    loadComponent: () => import('./components').then((c) => c.CarModelChoiceComponent),
  },
  { 
    path: 'option',
    loadComponent: () => import('./components').then((c) => c.CarOptionChoiceComponent),
    canActivate: [firstStepCompleted]
  },
  { 
    path: 'total',
    loadComponent: () => import('./components').then((c) => c.TotalCostComponent),
    canActivate: [secondStepCompleted]
  },
  { path: '', redirectTo: 'model', pathMatch: 'full' },
];
