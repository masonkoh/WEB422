import { Component, OnInit } from '@angular/core';
import {Employee} from "./data/employee";
import { EmployeeService } from './employee.service';
import {Router} from "@angular/router";
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
declare var $: any;



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  employees : Employee[];
  getEmployeeSub : any;
  loadingError : boolean; 

  constructor(
    private eService : EmployeeService,
    private router : Router
  ) {
    this.employees = [];
    this.getEmployeeSub = "";
    this.loadingError = false;
   }

  ngOnInit() {
    this.getEmployeeSub = this.eService.getEmployees().subscribe((employees) =>{
      this.employees = employees;
    },() => {
      this.loadingError = true;
    })
  }

  
  ngOnDestroy(){
    this.getEmployeeSub.unsubscribe();
  }

}


// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-employees',
//   templateUrl: './employees.component.html',
//   styleUrls: ['./employees.component.css']
// })
// export class EmployeesComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

