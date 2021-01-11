import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { EventService } from '../event.service';
import { PieData } from '../pie-data.payload';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  data: Array<PieData> =[];
  public options: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
 
  },
  title: {
      text: 'Current Events'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          colors:  ["orange","red","rgb(202, 185, 110)","#47b8f5"],
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
  },
  series: [{
      name: 'Place Type:',
      colorByPoint: true,
      data: this.data
  }]
  }
  constructor(private httpClient: HttpClient ,private eventService: EventService) { 
    this.eventService.getAllDataPie().subscribe(event => {
      console.log(event)
    

      Highcharts.chart('container', this.options);
      console.log(this.data);
    })
  }

  ngOnInit(): void {
    this.eventService.getAllDataPie().subscribe(event => {


      this.options.series[0].data = event;
      Highcharts.chart('container', this.options);

    })
    //Highcharts.chart('container', this.options);
  }
}
