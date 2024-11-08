import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-graph-card',
  standalone: true,
  imports: [
    CanvasJSAngularChartsModule,
    MatCardModule
  ],
  templateUrl: './graph-card.component.html',
  styleUrl: './graph-card.component.scss'
})
export class GraphCardComponent {
  @Input() graph_data: any = {
    title: 'sss',
    y_axis_title: 'sss',
    data_name: 'ssss',
    data_points: []
  };
	chart: any;

  chartOptions =  {
    animationEnabled: true,
    theme: "light2",
    title:{
      text: this.graph_data.title
    },
    axisX:{
    valueFormatString: "D"
    },
    axisY: {
    title: this.graph_data.y_axis_title
    },
    toolTip: {
    shared: true
    },
    legend: {
    cursor: "pointer",
    itemclick: function (e: any) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      e.chart.render();
    }
    },
    data: [{
    type: "line",
    showInLegend: true,
    name: this.graph_data.data_name,
    xValueFormatString: "MMM DD, YYYY",
    dataPoints: [
      { x: new Date(2021, 8, 1), y: 63 },
      { x: new Date(2021, 8, 2), y: 69 },
      { x: new Date(2021, 8, 3), y: 65 },
      { x: new Date(2021, 8, 4), y: 70 },
      { x: new Date(2021, 8, 5), y: 71 },
      { x: new Date(2021, 8, 6), y: 65 },
      { x: new Date(2021, 8, 7), y: 73 },
      { x: new Date(2021, 8, 8), y: 86 },
      { x: new Date(2021, 8, 9), y: 74 },
      { x: new Date(2021, 8, 10), y: 75 },
      { x: new Date(2021, 8, 11), y: 76 },
      { x: new Date(2021, 8, 12), y: 84 },
      { x: new Date(2021, 8, 13), y: 87 },
      { x: new Date(2021, 8, 14), y: 76 },
      { x: new Date(2021, 8, 15), y: 79 },
      { x: new Date(2021, 8, 16), y: 63 },
      { x: new Date(2021, 8, 17), y: 69 },
      { x: new Date(2021, 8, 18), y: 65 },
      { x: new Date(2021, 8, 19), y: 70 },
      { x: new Date(2021, 8, 20), y: 71 },
      { x: new Date(2021, 8, 21), y: 65 },
      { x: new Date(2021, 8, 22), y: 73 },
      { x: new Date(2021, 8, 23), y: 86 },
      { x: new Date(2021, 8, 24), y: 74 },
      { x: new Date(2021, 8, 25), y: 75 },
      { x: new Date(2021, 8, 26), y: 76 },
      { x: new Date(2021, 8, 27), y: 84 },
      { x: new Date(2021, 8, 28), y: 87 },
      { x: new Date(2021, 8, 29), y: 76 },
      { x: new Date(2021, 8, 30), y: 79 }
    ]
    }]
  }
  constructor(){

  }
}
