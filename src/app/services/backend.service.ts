import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Process } from './scheduler.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'http://localhost:3000/api'; // Update if your backend runs elsewhere

  constructor(private http: HttpClient) {}

  saveProcesses(processes: Process[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, { processes });
  }

  getProcesses(): Observable<Process[]> {
    return this.http.get<Process[]>(`${this.apiUrl}/list`);
  }
}
