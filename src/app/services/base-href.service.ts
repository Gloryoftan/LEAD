import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseHrefService {
  
  constructor() {
    this.setBaseHref();
  }

  private setBaseHref(): void {
    // 检查是否在GitHub Pages环境
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    if (isGitHubPages) {
      // 在GitHub Pages上，设置正确的base href
      const baseElement = document.querySelector('base');
      if (baseElement) {
        baseElement.setAttribute('href', '/LEAD/');
      }
    } else {
      // 本地开发环境，使用环境配置中的base href
      const baseElement = document.querySelector('base');
      if (baseElement) {
        baseElement.setAttribute('href', environment.baseHref);
      }
    }
  }

  getBaseHref(): string {
    // 检查是否在GitHub Pages环境
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    if (isGitHubPages) {
      return '/LEAD/';
    } else {
      return environment.baseHref;
    }
  }
}
