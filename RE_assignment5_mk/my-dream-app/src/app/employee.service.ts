import { Injectable } from '@angular/core';
import { Employee } from "./data/employee";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs/Observable";

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }
  
  getEmployees() : Observable<Employee[]>{
    return this.http.get<Employee[]>("https://stormy-depths-28130.herokuapp.com/employees");
  }


}
