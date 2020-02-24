import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //To use routing in class
  router:Router;
  authService:AuthService;

  constructor(router:Router,authService:AuthService) { 
    this.router=router;
    this.authService=authService;
  }

  ngOnInit() {
  }

  onLoadServers(id:number){

    //navigate to servers url with query parameters
    this.router.navigate(['/servers',id,'edit'],{queryParams:{allowEdit:'1'}});
    
  }

  onLogin(){
    this.authService.login();
  }
  onLogout(){
    this.authService.logout();
  }
}
