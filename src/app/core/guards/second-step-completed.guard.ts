import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { Signal, inject } from "@angular/core";
import { ChoiceDataService } from "../services";


export const secondStepCompleted: CanActivateFn = (): boolean | UrlTree => {
    const choiceDataService: ChoiceDataService = inject(ChoiceDataService);
    const router: Router = inject(Router);
    const secondStepCompleted: Signal<boolean> = choiceDataService.secondStepCompleted();
    
    if(secondStepCompleted()){
        return true;
    }else{
        return router.parseUrl('/option');
    }
  };