import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit:boolean = false;
  router:Router;

  //Get reference to currently loaded route
  route:ActivatedRoute;
  changesSaved:boolean=false;

  constructor(private serversService: ServersService,route:ActivatedRoute,router:Router) {
    this.route=route;
    this.router=router;
   }

  ngOnInit() {

    console.log(this.route.snapshot.queryParams);
    //Will output the query parameters, this is not reactive

    console.log(this.route.snapshot.fragment);
    //Will output the fragment, this is not reactive

    this.route.queryParams.subscribe((params:Params)=>{
      this.allowEdit = params['allowEdit']==='1'?true:false;      
    });//This run reactively
    
    this.route.fragment.subscribe(); //This runs reactively

    this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, 
      {name: this.serverName, status: this.serverStatus});

      //Changes are saved
      this.changesSaved=true;
      this.router.navigate(['../'],{relativeTo:this.route});//Navigate one level up of this route
  }

  canDeactivate():boolean | Observable<boolean> | Promise<boolean>{
    if(!this.allowEdit){
      return true;
    }
    //If changes were not saved ask confirmation from user
    if(!this.changesSaved){
      return confirm("Do you want to discard the changes?");
    }
    else{
      return true;
    }
  };

}
