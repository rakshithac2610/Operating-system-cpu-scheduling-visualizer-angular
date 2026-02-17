import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
selector: 'app-root',
 standalone: true,
 imports: [RouterOutlet, HttpClientModule], //  Added HttpClientModule
 templateUrl: './app.html',
styleUrl: './app.css'
})
export class AppComponent implements OnInit {

 ngOnInit(): void {
 const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
document.body.classList.add('light');
 }
 }

 toggleTheme(): void {
 const isLight = document.body.classList.toggle('light');
 localStorage.setItem('theme', isLight ? 'light' : 'dark');
 }
}
