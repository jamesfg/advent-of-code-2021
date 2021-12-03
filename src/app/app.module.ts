import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DayOneComponent } from './day-one/day-one.component';
import { DayTwoComponent } from './day-two/day-two.component';

@NgModule({
  declarations: [
    AppComponent,
    DayOneComponent,
    DayTwoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
