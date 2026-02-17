import { TestBed } from '@angular/core/testing';
import { SchedulerService } from '../services/scheduler.service';

describe('SchedulerService', () => {
  let service: SchedulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate SJF scheduling correctly', () => {
    const input = [
      { pid: 'P1', arrivalTime: 0, burstTime: 4 },
      { pid: 'P2', arrivalTime: 1, burstTime: 3 },
      { pid: 'P3', arrivalTime: 2, burstTime: 1 }
    ];
    
    const output = service.sjf(input);

    // sort by PID just for predictability
    const sorted = output.sort((a, b) => a.pid.localeCompare(b.pid));

    expect(sorted[0].completionTime).toBe(8); // P1
    expect(sorted[1].completionTime).toBe(7); // P2
    expect(sorted[2].completionTime).toBe(5); // P3
  });
});
