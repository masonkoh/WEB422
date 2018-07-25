import { Component, OnInit, OnDestroy } from '@angular/core';
import { Position } from './data/position';
import { PositionService } from './position.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit, OnDestroy {
    positions : Position[];
    getPositionSub : any;
    loadingError : boolean; 
  
    constructor(private pService : PositionService,private route : Router) { 
      this.positions = [];
      this.getPositionSub = "";
      this.loadingError = false;
    }
  
    ngOnInit() {
      this.getPositionSub = this.pService.getPositions().subscribe((positions) =>{
        this.positions = positions;
      },() => {
        this.loadingError = true;
      })
    }
  
  
    ngOnDestroy(){
      this.getPositionSub.unsubscribe();
    }
  
  }
  


// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-positions',
//   templateUrl: './positions.component.html',
//   styleUrls: ['./positions.component.css']
// })
// export class PositionsComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

}



