import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradingService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getStockTrades(ticker: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/stock-trades/${ticker}`);
  }

  getHistoricalData(ticker: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/historical-data/${ticker}`);
  }
} 