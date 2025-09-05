import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">
              <span class="brand-icon">🚀</span>
              LEAD
            </h3>
            <p class="footer-description">
              一个现代化的Angular应用，致力于提供最佳的用户体验。
            </p>
            <div class="social-links">
              <a href="https://github.com/yourusername" target="_blank" class="social-link">
                <span class="social-icon">📱</span>
                GitHub
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" class="social-link">
                <span class="social-icon">🐦</span>
                Twitter
              </a>
              <a href="mailto:your-email@example.com" class="social-link">
                <span class="social-icon">📧</span>
                Email
              </a>
            </div>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-subtitle">快速链接</h4>
            <ul class="footer-links">
              <li><a href="/" class="footer-link">首页</a></li>
              <li><a href="/about" class="footer-link">关于我们</a></li>
              <li><a href="/contact" class="footer-link">联系我们</a></li>
              <li><a href="https://github.com/yourusername/LEAD" target="_blank" class="footer-link">项目仓库</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-subtitle">技术栈</h4>
            <ul class="footer-links">
              <li><span class="tech-tag">Angular 17</span></li>
              <li><span class="tech-tag">TypeScript</span></li>
              <li><span class="tech-tag">SCSS</span></li>
              <li><span class="tech-tag">GitHub Pages</span></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-subtitle">联系信息</h4>
            <div class="contact-info">
              <p class="contact-item">
                <span class="contact-icon">📍</span>
                中国
              </p>
              <p class="contact-item">
                <span class="contact-icon">📧</span>
                your-email@example.com
              </p>
              <p class="contact-item">
                <span class="contact-icon">🌐</span>
                https://yourusername.github.io/LEAD
              </p>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <p class="copyright">
              &copy; {{ currentYear }} LEAD. 保留所有权利。
            </p>
            <p class="license">
              使用 <a href="https://pages.github.com/" target="_blank" class="license-link">GitHub Pages</a> 托管
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      color: white;
      margin-top: 4rem;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      padding: 3rem 0 2rem;
    }
    
    .footer-section {
      .footer-title {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        
        .brand-icon {
          font-size: 1.8rem;
          margin-right: 0.5rem;
        }
      }
      
      .footer-subtitle {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #ecf0f1;
      }
      
      .footer-description {
        color: #bdc3c7;
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      
      .social-link {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        text-decoration: none;
        color: white;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        
        .social-icon {
          margin-right: 0.5rem;
        }
      }
    }
    
    .footer-links {
      list-style: none;
      
      li {
        margin-bottom: 0.5rem;
        
        .footer-link {
          color: #bdc3c7;
          text-decoration: none;
          transition: color 0.3s ease;
          
          &:hover {
            color: white;
          }
        }
        
        .tech-tag {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: rgba(102, 126, 234, 0.2);
          border-radius: 4px;
          font-size: 0.9rem;
          color: #667eea;
        }
      }
    }
    
    .contact-info {
      .contact-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        color: #bdc3c7;
        
        .contact-icon {
          margin-right: 0.5rem;
          width: 20px;
        }
      }
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1.5rem 0;
      
      .footer-bottom-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
        
        .copyright,
        .license {
          color: #bdc3c7;
          margin: 0;
          
          .license-link {
            color: #667eea;
            text-decoration: none;
            
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
    
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        padding: 2rem 0 1.5rem;
      }
      
      .footer-bottom-content {
        flex-direction: column;
        text-align: center;
      }
      
      .social-links {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
