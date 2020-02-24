import { Observable } from "rxjs";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export interface CanComponentDeactivate{
    //Can deactivate method contract with return type
    canDeactivate:()=>Observable<boolean>|Promise<boolean>|boolean;
}

export class CanDeactivateGuard  implements CanDeactivate<CanComponentDeactivate>{
    canDeactivate(component:CanComponentDeactivate, 
        currentRoute:ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot,
        nextState?:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean{
            return component.canDeactivate();
    }
}