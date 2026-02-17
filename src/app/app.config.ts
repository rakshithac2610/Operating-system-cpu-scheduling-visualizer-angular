// src/app/app.config.ts
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes'; // ✅ use the centralized routes

export const appConfig = {
 providers: [
 provideRouter(routes),
 importProvidersFrom(HttpClientModule)
 ]
};
