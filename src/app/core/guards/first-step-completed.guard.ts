import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { inject } from "@angular/core";
import { ChoiceDataService } from "../services";


export const firstStepCompleted: CanActivateFn = (): boolean | Promise<boolean> => {

    const choiceDataService: ChoiceDataService = inject(ChoiceDataService);
    const router = inject(Router);
    const firstStepCompleted = choiceDataService.firstStepCompleted();

    if(firstStepCompleted()){
        return true;
    }else{
        return router.navigate(['/model']);
    }
  };