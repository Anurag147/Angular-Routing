import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  errorMessage:string;
  activatedRoute:ActivatedRoute;

  constructor(activatedRoute:ActivatedRoute) { 
    this.activatedRoute=activatedRoute;
  }

  ngOnInit() {

    //If data do not changes inside same page then snapshot method can be used
    this.errorMessage=this.activatedRoute.snapshot.data['message'];

    //If data changes inside same page then subscribe method is used
    this.activatedRoute.data.subscribe((data:Data)=>{
      this.errorMessage=data['message'];
    });
  }

}
