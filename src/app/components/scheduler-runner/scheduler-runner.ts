// src/app/components/scheduler-runner/scheduler-runner.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SchedulerService, Process } from '../../services/scheduler.service';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../services/backend.service';


@Component({
  selector: 'app-scheduler-runner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scheduler-runner.html',
  styleUrls: ['./scheduler-runner.css']
})
export class SchedulerRunner {
  selectedAlgorithm: string = '';
  newProcess: Process = { pid: '', arrivalTime:0 , burstTime: 0 };
  processes: Process[] = [];
  ganttChart: any[] = [];
  avgWaiting: number=0;
  avgTurnaround: number = 0;
animatedChart: { label: string, start: number, end: number }[] = [];
currentStep = -1;

  backendUrl = 'http://localhost:3000/api'; // 🔗 Your backend base URL

  constructor(
    private route: ActivatedRoute,
    private scheduler: SchedulerService,
     private backend: BackendService,
    private router: Router,
    private http: HttpClient
  ) {
    this.route.params.subscribe(params => {
      this.selectedAlgorithm = params['algo'];
    });
  }

  addProcess() {
    if (this.newProcess.pid && this.newProcess.burstTime >= 0 && this.newProcess.arrivalTime >= 0) {
      this.processes.push({ ...this.newProcess });
      this.newProcess = { pid: '', arrivalTime: 0, burstTime: 0 };
    }
  }

  removeProcess(index: number) {
    this.processes.splice(index, 1);
  }

 clearProcesses() {
 this.processes = [];
 this.ganttChart = [];
 this.animatedChart = []; // clear animated chart
 this.currentStep = -1;  // reset animation step
this.avgWaiting = 0;
 this.avgTurnaround = 0;
}

runAlgorithm() {
if (!this.selectedAlgorithm || this.processes.length === 0) return;

 let output;
 if (this.selectedAlgorithm === 'sjf') {
output = this.scheduler.sjf(this.processes);
 } else {
 output = this.scheduler.srtf(this.processes);
 }

this.processes = output.result;
 this.animatedChart = [];
 this.currentStep = -1;

 const interval = setInterval(() => {
 this.currentStep++;
 if (output.gantt && this.currentStep < output.gantt.length) {
const slice = output.gantt[this.currentStep];
this.animatedChart.push({
 label: slice.pid,
 start: slice.start,
 end: slice.end
});
 } else {
 clearInterval(interval);
 }
 }, 700);

 this.avgWaiting = this.processes.reduce((sum, p) => sum + (p.waitingTime ?? 0), 0) / this.processes.length;
 this.avgTurnaround = this.processes.reduce((sum, p) => sum + (p.turnaroundTime ?? 0), 0) / this.processes.length;
}



  saveToBackend() {
  this.backend.saveProcesses(this.processes).subscribe(() => {
    alert('✅ Processes saved to backend!');
  }, error => {
    console.error('❌ Error saving to backend:', error);
  });
}

loadFromBackend() {
 this.backend.getProcesses().subscribe(data => {
 this.processes = data;

//  Re-run algorithm after loading to recalculate averages and Gantt
 this.runAlgorithm();

 }, error => {
 console.error('❌ Error loading from backend:', error);
 });
}



  backToHome() {
    this.router.navigate(['/welcome']);
  }
  
}
