import { Component, OnInit } from '@angular/core';
import { AdventService } from '../advent.service';

@Component({
  selector: 'app-day-one',
  templateUrl: './day-one.component.html',
  styleUrls: ['./day-one.component.scss']
})
export class DayOneComponent implements OnInit {

  part1: number = 0;
  part2: number = 0;

  constructor(public adventService: AdventService) {

  }

  ngOnInit() {
    this.day1();
  }

  day1() {
    this.part1 = this.checkForIncreases(this.adventService.getDay1());
    this.part2 = this.checkForSumsIncreases(this.adventService.getDay1());
  }

  checkForIncreases(inputs: number[]):number {
    let increases = 0;
    let previousInput = inputs[0];
    for(let i = 0; i<inputs.length; i++) {
      if(previousInput < inputs[i]) {
        increases++;
      }
      previousInput = inputs[i];
    }
    return increases;
  }

  checkForSumsIncreases(input: number[]): number {
    let increases = this.checkForIncreases(this.createSums(input));
    return increases;
  }

  createSums(inputs: number[]): number[] {
    let sums:number[] = [];
    let sumWindow = 0;

    for(let i = 0; i<inputs.length-2; i++) {
      sumWindow = inputs[i] + inputs[i+1] + inputs[i+2];
      sums.push(sumWindow);
    }

    return sums;
  }
}
