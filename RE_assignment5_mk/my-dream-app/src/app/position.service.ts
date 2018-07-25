import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Position } from "./data/position";
import { Observable } from "Observable";

@Injectable()
export class PositionService {

  constructor(private http: HttpClient) { }
  
  getPositions() : Observable<Position[]>{
    return this.http.get<Position[]>("https://stormy-depths-28130.herokuapp.com/positions");
  }

  getPosition(id : string) : Observable<Position[]>{
   return this.http.get<Position[]>("https://stormy-depths-28130.herokuapp.com/position/"+id);
  }
  
  savePosition(position : Position){
    return this.http.put<any>("https://stormy-depths-28130.herokuapp.com/position/"+position._id, position);
  }
}
