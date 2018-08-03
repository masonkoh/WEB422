import { Injectable } from '@angular/core';
import { Position } from './position';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PositionService {

  constructor(private http: HttpClient) { }

  getPositions() : Observable<Position[]>{
    return this.http.get<Position[]>("https://radiant-mesa-48727.herokuapp.com/positions");
  }
  
}
