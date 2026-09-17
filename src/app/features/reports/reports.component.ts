import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ReportService } from '../../core/services/report.service';
import {
  CategoryStock,
  SalesTrend,
  TopSellingProduct
} from '../../shared/models/report.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {
  topSelling: TopSellingProduct[] = [];
  salesTrend: SalesTrend[] = [];
  categoryStock: CategoryStock[] = [];
  trendDays = 30;

  // Sales trend chart
  public lineChartType: ChartType = 'line';
  public lineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Revenue Over Time' }
    }
  };

  // Top selling chart
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Top 10 Selling Products' }
    }
  };

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.loadTrend();
    this.loadTopSelling();
    this.loadCategoryStock();
  }

  loadTrend() {
    this.reportService.getSalesTrend(this.trendDays).subscribe(data => {
      this.salesTrend = data;
      this.lineChartData = {
        labels: data.map(s => s.period),
        datasets: [{
          data: data.map(s => s.revenue),
          label: 'Revenue ($)',
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79, 70, 229, 0.15)',
          fill: true,
          tension: 0.4
        }]
      };
    });
  }

  loadTopSelling() {
    this.reportService.getTopSelling(10).subscribe(data => {
      this.topSelling = data;
      this.barChartData = {
        labels: data.map(p => p.productName),
        datasets: [{
          data: data.map(p => p.totalRevenue),
          label: 'Revenue ($)',
          backgroundColor: '#f59e0b'
        }]
      };
    });
  }

  loadCategoryStock() {
    this.reportService.getCategoryStock().subscribe(data => this.categoryStock = data);
  }

  changeTrend(days: number) {
    this.trendDays = days;
    this.loadTrend();
  }

  exportCsv() {
    const rows = [['SKU', 'Product', 'Units Sold', 'Revenue']];
    this.topSelling.forEach(p => rows.push([
      p.sku, p.productName,
      p.totalQuantitySold.toString(),
      p.totalRevenue.toString()
    ]));

    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'top-selling-products.csv';
    link.click();
  }
}