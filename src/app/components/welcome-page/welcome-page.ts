import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'app-welcome-page',
 standalone: true,
 imports: [CommonModule],
 templateUrl: './welcome-page.html',
 styleUrls: ['./welcome-page.css']
})
export class WelcomePage implements OnInit {
 isLight = false;

 constructor(private router: Router) {}

 ngOnInit() {
 const savedTheme = localStorage.getItem('theme');
 if (savedTheme === 'light') {
 document.body.classList.add('light');
 this.isLight = true;
 }
 }

 toggleTheme(): void {
 const isNowLight = document.body.classList.toggle('light');
 localStorage.setItem('theme', isNowLight ? 'light' : 'dark');
 this.isLight = isNowLight;
 }

 navigateToInfo(algorithm: string): void {
    this.router.navigate(['/info', algorithm]);
  }
}
