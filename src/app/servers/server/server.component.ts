import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  server: {id: number, name: string, status: string};
  activatedRoute:ActivatedRoute;
  router:Router;

  constructor(private serversService: ServersService,activatedRoute:ActivatedRoute,router:Router) { 
    this.activatedRoute=activatedRoute;
    this.router=router;
  }

  ngOnInit() {
    this.server = this.serversService.getServer(1);

    //Call below logic when there is change in parameters
    this.activatedRoute.params.subscribe((params:Params)=>{
      let serverId:number= +params['id'];//+ is used to convert string to number
      this.server=this.serversService.getServer(serverId);
    });
  }

  onEdit(){
    this.router.navigate(['edit'],
    {relativeTo:this.activatedRoute, 
      queryParamsHandling:'preserve'});
      //Append edit at end of current route and preserve the current query parameters to next route
  }
}
