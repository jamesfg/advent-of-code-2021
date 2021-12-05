import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdventService } from '../advent.service';

@Component({
  selector: 'app-day-four',
  templateUrl: './day-four.component.html',
  styleUrls: ['./day-four.component.scss']
})
export class DayFourComponent implements OnInit {
  subscriptions = new Subscription;
  part1: number = 0;
  part2: number = 0;
  scoreKeeper: number[] = [];
  winOrder: number[] = [];

  
  constructor(public adventService: AdventService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.adventService.getTxt(4).subscribe(data => {
      this.callBingo(data);
      this.part1 = this.scoreKeeper[this.winOrder[0]];
      this.part2 = this.scoreKeeper[this.winOrder[this.winOrder.length - 1]];
    }));
  }

  callBingo(data: string[]) {
    const bingoCalls = data[0].split(/[,]+/);
    const bingoCards = this.getBingoCards(data);
    this.scoreKeeper = Array(bingoCards.length).fill(0);

    bingoCalls.forEach(call => {
      bingoCards.forEach(card => {
        card.forEach(row => {
          let foundIndex = row.findIndex(rowIndex => rowIndex == `n${call}`);
          if(foundIndex >= 0) {
            row[foundIndex] = `y${call}`;
          }
        });
      });
      this.checkForWin(bingoCards, call);
    });
  }

  getBingoCards(data: string[]): string[][][] {
    let bingoCards: string[][][] = [];
    let card: string[][] = [];
    let cardHeight = 0;

    data.forEach((line, index) => {
      if(index > 1) {
        if(line !== '') {
          var rowArray: string[] = line.split(/[ ]+/).filter( e => e.trim().length > 0).map(ra => `n${ra}`);
          card[cardHeight] = rowArray;
          cardHeight += 1;
        }

        if(line === '' || index === data.length - 1) {
          bingoCards.push(card);
          card = [];
          cardHeight = 0;
        }
      }
    });

    return bingoCards;
  }

  checkForWin(bingoCards: string[][][], call: string) {

    bingoCards.forEach((card, cardIndex) => {
      const rowLength = bingoCards[0][0].length;
      let columnTrack: number[] = Array(rowLength).fill(0);
      if(this.scoreKeeper[cardIndex] == 0) {
        card.forEach(row => {
        let rowTrack = 0;
        row.forEach((r,rowIndex)=> {
            if(r.startsWith('n')) {
              rowTrack+=1;
            }
            if(r.startsWith('y')) {
              columnTrack[rowIndex] += 1;
              if(columnTrack[rowIndex] === rowLength && this.scoreKeeper[cardIndex] == 0) {
                this.getCardScore(card, call, cardIndex);
              }
            }
          });


          if(rowTrack === 0 && this.scoreKeeper[cardIndex] == 0) {
            this.getCardScore(card, call, cardIndex);
          }
        });
      }
    });
  }

  getCardScore(card: string[][], call: string, cardIndex: number) {
    let sumUnmarked = 0;
    card.forEach(row => row.filter(r=>r.startsWith('n')).forEach(r => sumUnmarked += +r.substring(1, r.length)));
    this.scoreKeeper[cardIndex] = +call * sumUnmarked;
    this.winOrder.push(cardIndex);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}