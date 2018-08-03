import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { EmployeeRaw } from "./employeeRaw";

@Injectable()
export class EmployeeService {

    constructor(private http: HttpClient) { }

    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>("https://radiant-mesa-48727.herokuapp.com/employees");
    }

    saveEmployee(employee: EmployeeRaw): Observable<any> {
        return this.http.put<any>("https://radiant-mesa-48727.herokuapp.com/employee/" + employee._id, employee);
    }

    getEmployee(id: number): Observable<EmployeeRaw[]> {
        return this.http.get<EmployeeRaw[]>("https://radiant-mesa-48727.herokuapp.com/employee-raw/" + id);

    }

}