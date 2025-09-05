import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content fade-in-up">
          <h1 class="hero-title">
            欢迎来到 <span class="highlight">LEAD</span>
          </h1>
          <p class="hero-subtitle">
            一个现代化的Angular应用，致力于提供最佳的用户体验和开发效率
          </p>
          <div class="hero-actions">
            <a href="/about" class="btn btn-primary">了解更多</a>
            <a href="/contact" class="btn btn-outline">联系我们</a>
          </div>
        </div>
        <div class="hero-image fade-in">
          <div class="hero-graphic">
            <div class="floating-card card-1">🚀</div>
            <div class="floating-card card-2">⚡</div>
            <div class="floating-card card-3">🎯</div>
            <div class="floating-card card-4">💡</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">核心特性</h2>
          <p class="section-subtitle">
            我们提供现代化的技术栈和最佳实践
          </p>
        </div>
        
        <div class="grid grid-3">
          <div class="card feature-card fade-in-up">
            <div class="feature-icon">🚀</div>
            <h3 class="feature-title">现代化架构</h3>
            <p class="feature-description">
              基于Angular 17构建，采用最新的技术栈和最佳实践
            </p>
          </div>
          
          <div class="card feature-card fade-in-up">
            <div class="feature-icon">⚡</div>
            <h3 class="feature-title">高性能</h3>
            <p class="feature-description">
              优化的构建配置和懒加载路由，确保最佳性能
            </p>
          </div>
          
          <div class="card feature-card fade-in-up">
            <div class="feature-icon">📱</div>
            <h3 class="feature-title">响应式设计</h3>
            <p class="feature-description">
              完全响应式设计，在所有设备上都有完美体验
            </p>
          </div>
          
          <div class="card feature-card fade-in-up">
            <div class="feature-icon">🎨</div>
            <h3 class="feature-title">美观界面</h3>
            <p class="feature-description">
              精心设计的用户界面，提供优雅的视觉体验
            </p>
          </div>
          
          <div class="card feature-card fade-in-up">
            <div class="feature-icon">🔧</div>
            <h3 class="feature-title">易于维护</h3>
            <p class="feature-description">
              清晰的代码结构和组件化设计，便于开发和维护
            </p>
          </div>
          
          <div class="card feature-card fade-in-up">
            <div class="feature-icon">🌐</div>
            <h3 class="feature-title">自动部署</h3>
            <p class="feature-description">
              集成GitHub Actions，实现自动化构建和部署
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="grid grid-4">
          <div class="stat-item text-center">
            <div class="stat-number">17</div>
            <div class="stat-label">Angular版本</div>
          </div>
          <div class="stat-item text-center">
            <div class="stat-number">100%</div>
            <div class="stat-label">响应式设计</div>
          </div>
          <div class="stat-item text-center">
            <div class="stat-number">0</div>
            <div class="stat-label">配置复杂度</div>
          </div>
          <div class="stat-item text-center">
            <div class="stat-number">∞</div>
            <div class="stat-label">扩展可能</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content text-center">
          <h2 class="cta-title">准备开始了吗？</h2>
          <p class="cta-subtitle">
            立即体验LEAD的强大功能，开启你的现代化开发之旅
          </p>
          <div class="cta-actions">
            <a href="/contact" class="btn btn-primary">立即开始</a>
            <a href="https://github.com/yourusername/LEAD" target="_blank" class="btn btn-secondary">查看源码</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 6rem 0 4rem;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        opacity: 0.3;
      }
      
      .container {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
      }
      
      .hero-content {
        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          
          .highlight {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.2rem 0.5rem;
            border-radius: 8px;
          }
        }
        
        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          line-height: 1.6;
        }
        
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
      }
      
      .hero-image {
        display: flex;
        justify-content: center;
        align-items: center;
        
        .hero-graphic {
          position: relative;
          width: 300px;
          height: 300px;
          
          .floating-card {
            position: absolute;
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            backdrop-filter: blur(10px);
            animation: float 6s ease-in-out infinite;
            
            &.card-1 {
              top: 20px;
              left: 50px;
              animation-delay: 0s;
            }
            
            &.card-2 {
              top: 50px;
              right: 20px;
              animation-delay: 1.5s;
            }
            
            &.card-3 {
              bottom: 50px;
              left: 20px;
              animation-delay: 3s;
            }
            
            &.card-4 {
              bottom: 20px;
              right: 50px;
              animation-delay: 4.5s;
            }
          }
        }
      }
    }
    
    .features {
      padding: 6rem 0;
      background: white;
      
      .section-header {
        margin-bottom: 4rem;
        
        .section-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .section-subtitle {
          font-size: 1.2rem;
          color: #666;
        }
      }
      
      .feature-card {
        text-align: center;
        padding: 2.5rem 2rem;
        border: none;
        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        
        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }
        
        .feature-title {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #2c3e50;
        }
        
        .feature-description {
          color: #666;
          line-height: 1.6;
        }
      }
    }
    
    .stats {
      padding: 4rem 0;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      
      .stat-item {
        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          font-size: 1.1rem;
          color: #666;
          font-weight: 500;
        }
      }
    }
    
    .cta {
      padding: 6rem 0;
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      color: white;
      
      .cta-content {
        .cta-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .cta-subtitle {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        
        .cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
      }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }
    
    @media (max-width: 768px) {
      .hero {
        padding: 4rem 0 2rem;
        
        .container {
          grid-template-columns: 1fr;
          gap: 2rem;
          text-align: center;
        }
        
        .hero-content {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .hero-actions {
            justify-content: center;
          }
        }
        
        .hero-image {
          .hero-graphic {
            width: 200px;
            height: 200px;
            
            .floating-card {
              width: 60px;
              height: 60px;
              font-size: 1.5rem;
            }
          }
        }
      }
      
      .features {
        padding: 4rem 0;
        
        .section-header {
          margin-bottom: 2rem;
          
          .section-title {
            font-size: 2rem;
          }
        }
      }
      
      .stats {
        padding: 3rem 0;
        
        .stat-item {
          .stat-number {
            font-size: 2.5rem;
          }
        }
      }
      
      .cta {
        padding: 4rem 0;
        
        .cta-content {
          .cta-title {
            font-size: 2rem;
          }
          
          .cta-actions {
            flex-direction: column;
            align-items: center;
          }
        }
      }
    }
  `]
})
export class HomeComponent {}
