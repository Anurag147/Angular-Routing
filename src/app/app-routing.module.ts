import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import {Routes,RouterModule, Router} from '@angular/router';
import { AuthGuard } from "src/auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";

//Configuring routing in angular app
const appRoutes:Routes = [   
    //Default route configuration
    { path:'',component: HomeComponent },
 
   //Users route configuration
    { path:'users',component: UsersComponent, children:[
     { path:':id/:name',component: UserComponent }, //Set up routes to load user component with parameter
    ] }, //Set up users to load users component
    
    //Servers route configuration
    //canActivate:[AuthGuard] protects/filters the parent route with all child
    //canActivateChild:[AuthGuard] protects/filters all child routes except the parent rote
    //canDeactivate:[CanDeactivateGuard] will be called whenever a page is changed

    { path:'servers',canActivateChild:[AuthGuard], component: ServersComponent, children:[
     { path:':id/edit',component: EditServerComponent, canDeactivate:[CanDeactivateGuard] }, //Set up routes to load child component
     { path:':id',component: ServerComponent }, //Set up routes to load child component
    ] },//Set up routes to load server component with children 
    //canActivate:[AuthGuard] is a route filter, server routes will only be accessed if it returns true
 
     //Default route configuration for any page which is not found using wild card **
     //It should be the last one of the routing configuration
     //{ path:'not-found',component: PageNotFoundComponent },
     { path:'not-found',component: ErrorPageComponent, 
     data:{message:'Page not found!'} },//Passing static data to a component route
     { path:'**',redirectTo: '/not-found' },
 ];
 
@NgModule({
imports:[
    RouterModule.forRoot(appRoutes,{useHash:true})
    //Use hash adds hash in the url to inform browser to load routes correctly

],
exports:[RouterModule] //Export router module to app module for using external configuration file
})

export class AppRoutingModule {

}