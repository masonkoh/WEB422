import { Component, OnInit } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  private getEmployeesSub: any;
  loadingError: boolean = false;
  filteredEmployees : Employee[];


  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    
  ) { 
    this.employees = [];
    this.filteredEmployees = [];

  }

  ngOnInit() {
    this.getEmployeesSub = this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
      this.filteredEmployees = employees;

    }, error => {
      this.loadingError = true;
    });

  }

  routeEmployee(id: string) {
    this.router.navigate(["/employee", id]);
  }

  onEmployeeSearchKeyUp(event: any){    
    let substring : string = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((e) => ((e.FirstName.toLowerCase().indexOf(substring) !== -1 ) || (e.LastName.toLowerCase().indexOf(substring) !== -1)))
  }

  ngOnDestroy() {
    if (this.getEmployeesSub) { this.getEmployeesSub.unsubscribe(); }
  }

}
