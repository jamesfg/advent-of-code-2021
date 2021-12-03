import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-results',
  templateUrl: './display-results.component.html',
  styleUrls: ['./display-results.component.scss']
})
export class DisplayResultsComponent implements OnInit {
  @Input() part1: any = null;
  @Input() part2: any = null;
  constructor() { }

  ngOnInit(): void {
  }

}
