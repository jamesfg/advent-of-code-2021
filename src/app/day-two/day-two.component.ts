import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdventService } from '../advent.service';

@Component({
  selector: 'app-day-two',
  templateUrl: './day-two.component.html',
  styleUrls: ['./day-two.component.scss']
})
export class DayTwoComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription;
  part1 = 0;
  part2 = 0;
  constructor(public adventService: AdventService) { 
    
  }

  ngOnInit(): void {
    this.subscriptions.add(this.adventService.getTxt(2).subscribe(data => {
      this.part1 = this.getDistance(data, false);
      this.part2 = this.getDistance(data, true);
    }));
  }

  getDistance(directions: string[], hasAim: boolean): number {
    const forward = 'forward';
    const down = 'down';
    const up = 'up';
    
    let aim = 0;
    let forwardDistance = 0;
    let depthDistance = 0;

    directions.forEach(dir => {
      if(dir.indexOf(forward) > -1) {

        const forwardMotion = dir.substring(forward.length, dir.length);
        forwardDistance += +forwardMotion;
        if(hasAim) {depthDistance += aim * +forwardMotion;}

      } else if(dir.indexOf(down) > -1) {

        const downMotion = dir.substring(down.length, dir.length);
        if(hasAim) {aim += +downMotion;} 
        else {depthDistance += +downMotion;}

      } else if(dir.indexOf(up) > -1) {

        const upMotion = dir.substring(up.length, dir.length);
        if(hasAim) {aim -= +upMotion;}
        else {depthDistance -= +upMotion;}
      
      }
    });
    return forwardDistance * depthDistance; 
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
