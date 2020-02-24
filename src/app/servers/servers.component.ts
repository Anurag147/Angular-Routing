import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  router:Router;
  routeAcivated:ActivatedRoute;

  constructor(private serversService: ServersService,router:Router,routeAcivated:ActivatedRoute) { 
    this.router=router;
    this.routeAcivated=routeAcivated;
  }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReLoadServers()
  {
    //this.router.navigate(['servers']); 
    //This is fine as always this will search for rootpath + servers, ignoring current path

    this.router.navigate(['servers'],{relativeTo:this.routeAcivated});
    //Thsi will redirect to current route + route provided so it will search for 
    //Rootpath + current route + servers
  }

}
