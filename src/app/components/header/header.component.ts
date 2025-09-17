import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <nav class="navbar">
          <div class="navbar-brand">
            <a routerLink="/" class="brand-link">
              <img src="assets/TM_Logo.png" alt="Toastmasters International" class="brand-logo">
              <span class="brand-text">LEAD</span>
            </a>
          </div>
          
          <div class="navbar-menu" [class.active]="isMenuOpen">
            <a routerLink="/" 
               routerLinkActive="active" 
               [routerLinkActiveOptions]="{exact: true}"
               class="nav-link"
               (click)="closeMenu()">
               首页
            </a>
            <a routerLink="/members" 
               routerLinkActive="active" 
               class="nav-link"
               (click)="closeMenu()">
               学员
            </a>
            <a routerLink="/about" 
               routerLinkActive="active" 
               class="nav-link"
               (click)="closeMenu()">
               关于
            </a>
            <a routerLink="/contact" 
               routerLinkActive="active" 
               class="nav-link"
               (click)="closeMenu()">
               团队
            </a>
          </div>
          
          <div class="navbar-toggle" (click)="toggleMenu()">
            <span class="hamburger" [class.active]="isMenuOpen"></span>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      z-index: 1000;
      transition: all 0.3s ease;
    }
    
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
    }
    
    .navbar-brand {
      .brand-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #2c3e50;
        font-weight: 700;
        font-size: 1.5rem;
        
        .brand-logo {
          height: 2rem;
          width: auto;
          margin-right: 0.5rem;
          object-fit: contain;
        }
        
        .brand-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }
    }

    /* 导出模式：使用纯色替代渐变色 */
    .export-mode .brand-text {
      background: none !important;
      -webkit-background-clip: initial !important;
      -webkit-text-fill-color: initial !important;
      background-clip: initial !important;
      color: #667eea !important;
      text-shadow: none !important;
    }
    
    .navbar-menu {
      display: flex;
      gap: 2rem;
      
      .nav-link {
        text-decoration: none;
        color: #555;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        transition: all 0.3s ease;
        position: relative;
        
        &:hover {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }
        
        &.active {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
          
          &::after {
            content: '';
            position: absolute;
            bottom: -1rem;
            left: 50%;
            transform: translateX(-50%);
            width: 6px;
            height: 6px;
            background: #667eea;
            border-radius: 50%;
          }
        }
      }
    }
    
    .navbar-toggle {
      display: none;
      flex-direction: column;
      cursor: pointer;
      padding: 0.5rem;
      
      .hamburger {
        width: 25px;
        height: 3px;
        background: #333;
        margin: 3px 0;
        transition: 0.3s;
        border-radius: 2px;
        
        &::before,
        &::after {
          content: '';
          position: absolute;
          width: 25px;
          height: 3px;
          background: #333;
          transition: 0.3s;
          border-radius: 2px;
        }
        
        &::before {
          transform: translateY(-8px);
        }
        
        &::after {
          transform: translateY(8px);
        }
        
        &.active {
          background: transparent;
          
          &::before {
            transform: rotate(45deg);
          }
          
          &::after {
            transform: rotate(-45deg);
          }
        }
      }
    }
    
    @media (max-width: 768px) {
      .navbar-menu {
        position: fixed;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        
        &.active {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }
        
        .nav-link {
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid #eee;
          
          &:last-child {
            border-bottom: none;
          }
        }
      }
      
      .navbar-toggle {
        display: flex;
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  closeMenu() {
    this.isMenuOpen = false;
  }
}
