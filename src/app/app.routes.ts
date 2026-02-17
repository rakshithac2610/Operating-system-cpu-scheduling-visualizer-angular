// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { WelcomePage } from './components/welcome-page/welcome-page';
import { AlgorithmInfo } from './components/algorithm-info/algorithm-info';
import { SchedulerRunner } from './components/scheduler-runner/scheduler-runner';

export const routes: Routes = [
{ path: '', redirectTo: 'welcome', pathMatch: 'full' },  // default route
 { path: 'welcome', component: WelcomePage }, // welcome screen
 { path: 'info/:algo', component: AlgorithmInfo },  // info page for sjf/srtf
 { path: 'run/:algo', component: SchedulerRunner }, // simulation page
 { path: '**', redirectTo: 'welcome' }  // fallback route
];
