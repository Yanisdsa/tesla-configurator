import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { Signal, inject } from "@angular/core";
import { ChoiceDataService } from "../services";


export const firstStepCompleted: CanActivateFn = (): boolean | Promise<boolean> => {
    const choiceDataService: ChoiceDataService = inject(ChoiceDataService);
    const router: Router = inject(Router);
    const firstStepCompleted: Signal<boolean> = choiceDataService.firstStepCompleted();

    if(firstStepCompleted()){
        return true;
    }else{
        return router.navigate(['/model']);
    }
  };