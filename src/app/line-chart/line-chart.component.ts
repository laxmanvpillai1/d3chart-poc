import { Component, ViewEncapsulation, OnInit } from '@angular/core';

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

  private DATA = [
    {date: new Date('2018-07-21'), value: 210.73},
    {date: new Date('2018-07-23'), value: 214.01},
    {date: new Date('2018-07-24'), value: 214.38},
    {date: new Date('2018-07-25'), value: 210.97},
    {date: new Date('2018-07-26'), value: 210.58},
    {date: new Date('2018-07-27'), value: 211.98},
    {date: new Date('2018-07-28'), value: 210.11},
    {date: new Date('2018-07-29'), value: 207.72},
    {date: new Date('2018-07-30'), value: 210.65},
    {date: new Date('2018-07-31'), value: 209.43},
    {date: new Date('2018-08-01'), value: 205.93}
  ];

  constructor() {
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
    this.y.domain(d3Array.extent(this.DATA,(d)=>d.value));

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
                .y((d:any)=>this.y(d.value));

    this.svg.append('path')
            .datum(this.DATA)
            .attr('class','line')
            .attr('d',this.line);
  }
}
