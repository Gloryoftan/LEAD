import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BaseHrefService } from './services/base-href.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .main-content {
      flex: 1;
      padding-top: 80px; /* 为固定头部留出空间 */
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'LEAD';

  constructor(
    private baseHrefService: BaseHrefService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // BaseHrefService 在构造函数中已经初始化
    
    // 检查是否有重定向路径需要处理
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      // 清除存储的重定向路径
      sessionStorage.removeItem('redirectPath');
      
      // 移除base href前缀，获取相对路径
      const baseHref = this.baseHrefService.getBaseHref();
      const relativePath = redirectPath.replace(baseHref, '');
      
      // 导航到目标路径
      this.router.navigateByUrl(relativePath);
    }
  }
}
