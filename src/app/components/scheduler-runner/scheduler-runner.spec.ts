import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SchedulerService, Process } from '../../services/scheduler.service';

@Component({
  selector: 'app-scheduler-runner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scheduler-runner.html',
  styleUrls: ['./scheduler-runner.css']
})
export class SchedulerRunner {
  selectedAlgorithm: string = '';
  newProcess: Process = { pid: '', arrivalTime: 0, burstTime: 0 };
  processes: Process[] = [];
  ganttChart: any[] = [];

  avgWaiting: number = 0;
  avgTurnaround: number = 0;

  constructor(
    private route: ActivatedRoute,
    private scheduler: SchedulerService,
    private router: Router
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
    this.avgWaiting = 0;
    this.avgTurnaround = 0;
  }

 runAlgorithm() {
  if (!this.selectedAlgorithm || this.processes.length === 0) return;

  let result: Process[] = [];

  if (this.selectedAlgorithm === 'sjf') {
    result = this.scheduler.sjf(this.processes);
  } else {
    result = this.scheduler.srtf(this.processes);
  }

  this.ganttChart = result.map((p: Process) => ({
    label: p.pid,
    start: p.startTime,
    end: p.completionTime
  }));

  this.avgWaiting = result.reduce((sum: number, p: Process) => sum + (p.waitingTime ?? 0), 0) / result.length;
  this.avgTurnaround = result.reduce((sum: number, p: Process) => sum + (p.turnaroundTime ?? 0), 0) / result.length;

  this.processes = result;
}


  backToHome() {
    this.router.navigate(['/welcome']);
  }
}