import { Component } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { NumberCardComponent } from "../../components/cards/number-card/number-card.component";
import { GraphCardComponent } from "../../components/cards/graph-card/graph-card.component";
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NumberCardComponent, GraphCardComponent, MatOptionModule, MatSelectModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  years = [
    2024,
    2025,
    2026,
    2027,
    2028
  ]
  months = [
    {id: 1,name:'January'},
    {id: 2,name:'February'},
    {id: 3,name:'March'},
    {id: 4,name:'April'},
    {id: 5,name:'May'},
    {id: 6,name:'June'},
    {id: 7,name:'July'},
    {id: 8,name:'August'},
    {id: 9,name:'September'},
    {id: 10,name:'October'},
    {id: 11,name:'November'},
    {id: 12,name:'December'}
  ]
  cards = [
    {
      title: 'Total Books',
      total: 387
    },
    {
      title: 'Checked Out',
      total: 487
    },
    {
      title: 'Active Numbers',
      total: 287
    },
    {
      title: 'Total Fines',
      total: 5000
    }
  ];

  graph_data = {
    title: 'sss',
    y_axis_title: 'sss',
    data_name: 'ssss',
    data_points: []
  };

  constructor(private dashboard_service: DashboardService){}

  ngOnInit(): void {
    this.dashboard_service.get().subscribe({
      next: ()=>{

      },
      error: ()=>{

      }
    });
  }
}
