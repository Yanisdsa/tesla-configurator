import { Routes } from '@angular/router';
import { CarModelChoiceComponent } from './components/car-model-choice/car-model-choice.component';
import { CarOptionChoiceComponent } from './components/car-option-choice/car-option-choice.component';
import { TotalCostComponent } from './components/total-cost/total-cost.component';
import { firstStepCompleted, secondStepCompleted } from './core/guards';

export const routes: Routes = [
  { path: 'model', component: CarModelChoiceComponent },
  { path: 'option', component: CarOptionChoiceComponent, canActivate: [firstStepCompleted]},
  { path: 'total', component: TotalCostComponent, canActivate: [secondStepCompleted] },
  { path: '', redirectTo: '/model', pathMatch: 'full' },
];
