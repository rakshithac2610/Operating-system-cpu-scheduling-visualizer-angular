// src/main.ts
import 'zone.js';  //  This is required for Angular change detection

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; //  Use 'App' because file is app.ts
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    importProvidersFrom(HttpClientModule) // global provider
  ]
}).catch(err => console.error(err));