import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { inject } from "@angular/core";
import { ChoiceDataService } from "../services";


export const secondStepCompleted: CanActivateFn = (): boolean | UrlTree => {

    const choiceDataService: ChoiceDataService = inject(ChoiceDataService);
    const router = inject(Router);
    const secondStepCompleted = choiceDataService.secondStepCompleted();

    console.log(secondStepCompleted());
    
    if(secondStepCompleted()){
        return true;
    }else{
        return router.parseUrl('/option');
    }
  };