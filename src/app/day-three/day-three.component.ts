import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdventService } from '../advent.service';

@Component({
  selector: 'app-day-three',
  templateUrl: './day-three.component.html',
  styleUrls: ['./day-three.component.scss']
})
export class DayThreeComponent implements OnInit {
  subscriptions = new Subscription;
  part1: number = 0;
  part2: number = 0;

  constructor(public adventService: AdventService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.adventService.getTxt(3).subscribe(data => {
      this.part1 = this.getPowerConsumption(data);
      this.part2 = this.getLifeSupport(data);
    }));
  }

  getPowerConsumption(data: string[]): any {
    const {gamma, epsilon} = this.getGEValues(data);
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
  } 

  getLifeSupport(data: string[]): any {
    const lineLength: number[] = Array(data[0].length).fill(0);
    let ogr = '';
    let csr = '';
    var ogrData = [...data];
    var csrData = [...data];

    lineLength.forEach((position, index) => {
      if(ogrData.length > 0) {
        const {gamma} = this.getGEValues(ogrData);
        ogrData = ogrData.filter( (line: string) => {
          const chars = [...line];
          return +gamma[index] == +chars[index];
        });     
        if(ogrData.length == 1) {ogr = `${ogrData[0]}`};
      }

      if(csrData.length > 0) {
        const {epsilon} = this.getGEValues(csrData);
        csrData = csrData.filter( (line: string) => {
          const chars = [...line];
          return +epsilon[index] == +chars[index];
        });
        if(csrData.length == 1) {csr = `${csrData[0]}`};
      } 
    });

    return parseInt(ogr, 2) * parseInt(csr, 2);
  } 

  getGEValues(data: string[]): any {
    let positionArray = new Array<number>(data[0].length);

    data.forEach(power => {
      const chars = [...power];
      chars.forEach((value, index) => {
        if(positionArray[index] == null) {
          positionArray[index] = 0;
        }

        if(+value === 1) {
          positionArray[index] += 1;
        } else {
          positionArray[index] -= 1;
        }
      });    
    });

    let gamma: string = '';
    let epsilon: string = '';
    positionArray.forEach(value => {
      gamma = `${gamma}${value >= 0 ? '1' : '0'}`;
      epsilon = `${epsilon}${value >= 0 ? '0' : '1'}`;
    });  

    return {gamma, epsilon};

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
