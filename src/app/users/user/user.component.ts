import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  //This contains current route details
  route:ActivatedRoute;

  constructor(route:ActivatedRoute) { 
    this.route=route;
  }

  ngOnInit() {

    //Set user data by retrieving values from routing parameters
    this.user= {
      id: this.route.snapshot.params['id'],//Retrieve id from route parameters
      name: this.route.snapshot.params['name']//Retrieve name from route parameters
    };

    //Below code is executed to subscribe to params change event
    //So if in a component route params are changed below code should execute to update other objects
    //Thsi is only used when a params are changed from inside the same component ad we want to react
    this.route.params.subscribe((params:Params)=>{
      this.user.id=params['id'];
      this.user.name=params['name'];
    });
  }

}
