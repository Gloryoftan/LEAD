import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import * as AOS from 'aos';

// 初始化AOS动画库
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, 
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      }),
      withPreloading(PreloadAllModules)
    ),
    provideAnimations(),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
