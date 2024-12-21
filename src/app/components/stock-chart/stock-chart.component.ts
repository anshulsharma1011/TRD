import { Component, OnInit } from '@angular/core';
import { TradingService } from '../../services/trading.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stock-chart',
  template: `
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <h5>Stock Chart</h5>
          <div class="input-group w-25">
            <input type="text" class="form-control" [(ngModel)]="ticker" placeholder="Enter ticker">
            <button class="btn btn-primary" (click)="loadData()">Load</button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <canvas id="stockChart"></canvas>
      </div>
    </div>
  `
})
export class StockChartComponent implements OnInit {
  ticker = 'RELIANCE.BSE';
  chart: any;

  constructor(private tradingService: TradingService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.tradingService.getHistoricalData(this.ticker).subscribe(data => {
      this.updateChart(data.data);
    });
  }

  updateChart(data: any[]) {
    const ctx = document.getElementById('stockChart') as HTMLCanvasElement;
    
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.date),
        datasets: [{
          label: 'Price',
          data: data.map(d => d.close),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
} 