import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CsvReadService } from '../shared/services/csv-read.service';
import { WeatherData } from '../shared/models/weather-data-model';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-line-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  //@ViewChild("containerPieChart") element: ElementRef;

  private margin = {top:20, right:20, bottom:30, left:50};
  private width:number;
  private height:number;
  private x:any;
  private y:any;
  private svg:any;
  private line:d3Shape.Line<[number,number]>;
  private title:string = "VanderSat PoC";
  private weatherData:Array<WeatherData> = [];
  private errorMessage:string;

  private DATA = [
    {date: new Date('07-21'), value1: 210.73, value2:222.04},
    {date: new Date('07-23'), value1: 214.01, value2:219.26},
    {date: new Date('07-24'), value1: 214.38, value2:201.25},
    {date: new Date('07-25'), value1: 210.97, value2:205.2},
    {date: new Date('07-26'), value1: 210.58, value2:212.23},
    {date: new Date('07-27'), value1: 211.98, value2:227.56},
    {date: new Date('07-28'), value1: 210.11, value2:233.78},
    {date: new Date('07-29'), value1: 207.72, value2:211.9},
    {date: new Date('07-30'), value1: 210.65, value2:214.01},
    {date: new Date('07-31'), value1: 209.43, value2:207.72},
    {date: new Date('08-01'), value1: 205.93, value2:210.97}
  ];


  constructor(private csvRead:CsvReadService) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
   }

  ngOnInit() {
    this.initSVG();
    this.initAxis();
    this.drawAxis();
    this.drawLine();
  }

  private initSVG():void{
    this.svg = d3.select("svg")
              .append('g')
              .attr('transform',`translate(${this.margin.left},${this.margin.top})`);
  }

  private initAxis():void{
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height,0]);
    this.x.domain(d3Array.extent(this.DATA,(d)=>d.date));
    this.y.domain(d3Array.extent(this.DATA,(d)=>d.value2));

  }

  private drawAxis():void{
    this.svg.append('g')
      .attr('class','axis axis--x')
      .attr('transform',`translate(0,${this.height})`)
      .call(d3Axis.axisBottom(this.x));

    this.svg.append('g')
      .attr('class','axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class','axis-title')
      .attr('transform','rotate(-90)')
      .attr('y',6)
      .attr('dy','.71em')
      .attr('text-anchor','end')
      .text('Temperature');
  }

  private drawLine():void{
    this.line = d3Shape.line()
                .x((d:any)=>this.x(d.date))
                .y((d:any)=>this.y(d.value1));

    this.svg.append('path')
            .datum(this.DATA)
            .attr('class','line')
            .attr('d',this.line);

    this.line = d3Shape.line()
                .x((d:any)=>this.x(d.date))
                .y((d:any)=>this.y(d.value2));

    this.svg.append('path')
            .datum(this.DATA)
            .attr('style','stroke: rgb(0, 113, 41)')
            .attr('class','line')
            .attr('d',this.line);
  }

  public convertFile(event:any){
     this.csvRead.convertFileAsync(event).subscribe(value => {
       this.weatherData = value;
       console.log(this.weatherData);
    }, 
    error=> this.errorMessage = <any>error);
   // console.log(this.weatherData);
    
  }
}
