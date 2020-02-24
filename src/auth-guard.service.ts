import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./app/auth.service";

//Below class is used to guard a route
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    authService:AuthService;
    router:Router;

    constructor(authService:AuthService,router:Router){
        this.authService=authService;
        this.router=router;
    }

    //This method is route filter for a route on parent level
    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{

            //Auth service method check if user is authenticated or not
            //It return a promise and when it is resolved we check if returned value is true or false
            return this.authService.isAuthenticate()
            .then((authenticated:boolean)=>{
                if(authenticated){
                    return true;
                }
                else{
                    this.router.navigate(['/']);//Navigate to root page if user is not authenticated
                }

            })
    }

    //This method is route filter for a route on child level
    canActivateChild(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
        return this.canActivate(route,state); //Call parent method to run the logic
    }
}