import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'app-algorithm-info',
 standalone: true,
 imports: [CommonModule],
 templateUrl: './algorithm-info.html',
styleUrls: ['./algorithm-info.css']
})
export class AlgorithmInfo {
 selectedAlgorithm: string = '';
 description: string = '';

 constructor(private route: ActivatedRoute, private router: Router) {
 this.route.params.subscribe(params => {
this.selectedAlgorithm = params['algo'];

if (this.selectedAlgorithm === 'sjf') {
 this.description = `
 <b>SJF (Shortest Job First)</b> is a Non-preemptive Scheduling Algorithm.
 It selects the process with the smallest burst time among the available ones.
Once selected, the process runs until completion.
<br><br><b>Why SJF?</b> It reduces average waiting time, but it may cause starvation for longer jobs.
 `;
} else if (this.selectedAlgorithm === 'srtf') {
 this.description = `
<b>SRTF (Shortest Remaining Time First)</b> is the Preemptive version of SJF.
If a new process arrives with a burst time shorter than the remaining time of the current process, the current process is preempted.
<br><br><b>Why SRTF?</b> It gives better average waiting time than SJF but is more complex and also suffers from starvation.
 `;
} else {
 this.description = 'Unknown Algorithm';
 }
});
 }

 goToSimulator() {
 this.router.navigate(['/run', this.selectedAlgorithm]);
 }
}
