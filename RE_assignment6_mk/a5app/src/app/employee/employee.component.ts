import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/EmployeeRaw'; // THIS MIGHT COULD CAUSE ERROR './data/EmployeeRaw' <-- is this better? 
import { EmployeeService } from '../data/employee.service';
import { PositionService } from '../data/position.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  private paramSubScription: any;
  private employeeSubscription: any;
  private getPositionsSubcription: any;
  private saveEmployeeSubscription: any;
  private employee: EmployeeRaw;
  private positions: Position[];
  private successMessage = false;
  private failMessage = false;


  constructor() { }

  ngOnInit() {
  }

}
