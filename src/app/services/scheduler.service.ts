
import { Injectable } from '@angular/core';


export interface Process {
pid: string;
 arrivalTime: number;
 burstTime: number;
 remainingTime?: number;
 completionTime?: number;
 turnaroundTime?: number;
 waitingTime?: number;
 startTime?: number;
}

@Injectable({ providedIn: 'root' })
export class SchedulerService {

// ✅ SJF (Non-preemptive)
sjf(processes: Process[]): { result: Process[]; gantt: { pid: string; start: number; end: number }[] } {
 let time = 0, completed = 0;
 const result: Process[] = JSON.parse(JSON.stringify(processes));
 const gantt: { pid: string; start: number; end: number }[] = [];

 while (completed < result.length) {
 const ready = result.filter(p => p.arrivalTime <= time && !p.completionTime);
 if (ready.length > 0) {
const current = ready.reduce((a, b) => a.burstTime < b.burstTime ? a : b);
current.startTime = time;
 time += current.burstTime;
 current.completionTime = time;
 current.turnaroundTime = time - current.arrivalTime;
 current.waitingTime = current.turnaroundTime - current.burstTime;
gantt.push({ pid: current.pid, start: current.startTime, end: current.completionTime });
 completed++;
} else {
 time++;
 }
 }

 return { result, gantt };
 }

//  SRTF (Preemptive)
 srtf(processes: Process[]): { result: Process[]; gantt: { pid: string; start: number; end: number }[] } {
let time = 0, completed = 0;
 const result: Process[] = JSON.parse(JSON.stringify(processes));
 const gantt: { pid: string; start: number; end: number }[] = [];
 result.forEach(p => p.remainingTime = p.burstTime);

 let current: Process | null = null;
 let prevPid: string | null = null;
 let sliceStart = 0;

 while (completed < result.length) {
 const ready = result.filter(p => p.arrivalTime <= time && p.remainingTime! > 0);
if (ready.length > 0) {
 const next = ready.reduce((a, b) => a.remainingTime! < b.remainingTime! ? a : b);

 if (prevPid !== next.pid) {
if (current && prevPid) {
gantt.push({ pid: prevPid, start: sliceStart, end: time });
 }
 sliceStart = time;
prevPid = next.pid;
 }

 if (next.remainingTime === next.burstTime) {
next.startTime = time;
}

 next.remainingTime!--;
 current = next;
 time++;

 if (next.remainingTime === 0) {
 next.completionTime = time;
 next.turnaroundTime = time - next.arrivalTime;
 next.waitingTime = next.turnaroundTime - next.burstTime;
 completed++;
 }

} else {
 // Idle time
 if (prevPid !== 'idle') {
 if (current && prevPid) gantt.push({ pid: prevPid, start: sliceStart, end: time });
 sliceStart = time;
prevPid = 'idle';
}
 time++;
 }
 }

 // Push final slice
 if (current && prevPid) {
 gantt.push({ pid: prevPid, start: sliceStart, end: time });
 }

return { result, gantt };
 }
}
