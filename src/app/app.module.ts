import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MatMenuModule, MatSidenavModule } from '@angular/material';

const appRoutes:Routes = [
  {path:'chart', component:LineChartComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    RouterModule.forRoot(appRoutes),
    MatSidenavModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
