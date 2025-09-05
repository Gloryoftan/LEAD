import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- About Hero -->
    <section class="about-hero">
      <div class="container">
        <div class="about-hero-content text-center">
          <h1 class="about-title fade-in-up">关于 LEAD</h1>
          <p class="about-subtitle fade-in-up">
            一个现代化的Angular应用，致力于提供最佳的用户体验和开发效率
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission">
      <div class="container">
        <div class="mission-content">
          <div class="mission-text">
            <h2 class="section-title">我们的使命</h2>
            <p class="mission-description">
              LEAD项目旨在创建一个现代化的Web应用框架，为开发者提供高效、可维护、可扩展的开发体验。
              我们相信技术应该服务于用户，通过精心设计的界面和流畅的交互，为用户创造价值。
            </p>
            <p class="mission-description">
              我们的目标是通过Angular框架的强大功能，结合最新的Web技术，
              构建一个既美观又实用的应用平台，为未来的Web开发树立新的标准。
            </p>
          </div>
          <div class="mission-image">
            <div class="mission-graphic">
              <div class="tech-stack">
                <div class="tech-item">Angular</div>
                <div class="tech-item">TypeScript</div>
                <div class="tech-item">SCSS</div>
                <div class="tech-item">GitHub</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">开发团队</h2>
          <p class="section-subtitle">
            我们是一群充满激情的开发者，致力于创造优秀的用户体验
          </p>
        </div>
        
        <div class="team-grid">
          <div class="team-member card">
            <div class="member-avatar">
              <div class="avatar-placeholder">👨‍💻</div>
            </div>
            <div class="member-info">
              <h3 class="member-name">Samari Tan</h3>
              <p class="member-role">项目负责人 & 全栈开发者</p>
              <p class="member-description">
                专注于Angular生态系统和现代化Web开发，拥有丰富的项目经验。
              </p>
              <div class="member-social">
                <a href="https://github.com/yourusername" target="_blank" class="social-link">GitHub</a>
                <a href="mailto:your-email@example.com" class="social-link">Email</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Section -->
    <section class="technology">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">技术栈</h2>
          <p class="section-subtitle">
            我们使用最新的技术和最佳实践来构建应用
          </p>
        </div>
        
        <div class="tech-categories">
          <div class="tech-category">
            <h3 class="category-title">前端框架</h3>
            <div class="tech-items">
              <div class="tech-item">
                <span class="tech-icon">🅰️</span>
                <span class="tech-name">Angular 17</span>
                <span class="tech-desc">现代化的前端框架</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">📘</span>
                <span class="tech-name">TypeScript</span>
                <span class="tech-desc">类型安全的JavaScript</span>
              </div>
            </div>
          </div>
          
          <div class="tech-category">
            <h3 class="category-title">样式与设计</h3>
            <div class="tech-items">
              <div class="tech-item">
                <span class="tech-icon">🎨</span>
                <span class="tech-name">SCSS</span>
                <span class="tech-desc">强大的CSS预处理器</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">📱</span>
                <span class="tech-name">响应式设计</span>
                <span class="tech-desc">适配所有设备</span>
              </div>
            </div>
          </div>
          
          <div class="tech-category">
            <h3 class="category-title">部署与CI/CD</h3>
            <div class="tech-items">
              <div class="tech-item">
                <span class="tech-icon">🚀</span>
                <span class="tech-name">GitHub Actions</span>
                <span class="tech-desc">自动化构建部署</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">🌐</span>
                <span class="tech-name">GitHub Pages</span>
                <span class="tech-desc">静态网站托管</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="timeline">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">发展历程</h2>
          <p class="section-subtitle">
            我们的项目发展时间线
          </p>
        </div>
        
        <div class="timeline-container">
          <div class="timeline-item">
            <div class="timeline-date">2025年1月</div>
            <div class="timeline-content">
              <h3 class="timeline-title">项目启动</h3>
              <p class="timeline-description">
                开始规划LEAD项目，确定技术栈和架构设计
              </p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-date">2025年1月</div>
            <div class="timeline-content">
              <h3 class="timeline-title">核心开发</h3>
              <p class="timeline-description">
                完成Angular应用的基础架构和核心组件开发
              </p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-date">未来</div>
            <div class="timeline-content">
              <h3 class="timeline-title">持续改进</h3>
              <p class="timeline-description">
                根据用户反馈持续优化功能，添加新特性
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 6rem 0 4rem;
      
      .about-title {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      
      .about-subtitle {
        font-size: 1.3rem;
        opacity: 0.9;
        max-width: 600px;
        margin: 0 auto;
      }
    }
    
    .mission {
      padding: 6rem 0;
      background: white;
      
      .mission-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
        
        .mission-text {
          .section-title {
            font-size: 2.5rem;
            margin-bottom: 2rem;
          }
          
          .mission-description {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #666;
            margin-bottom: 1.5rem;
          }
        }
        
        .mission-image {
          .mission-graphic {
            .tech-stack {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 1rem;
              
              .tech-item {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                padding: 1.5rem;
                border-radius: 12px;
                text-align: center;
                font-weight: 600;
                color: #2c3e50;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              }
            }
          }
        }
      }
    }
    
    .team {
      padding: 6rem 0;
      background: #f8f9fa;
      
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
      
      .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        
        .team-member {
          text-align: center;
          padding: 2rem;
          
          .member-avatar {
            margin-bottom: 1.5rem;
            
            .avatar-placeholder {
              width: 100px;
              height: 100px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 3rem;
              margin: 0 auto;
            }
          }
          
          .member-info {
            .member-name {
              font-size: 1.5rem;
              margin-bottom: 0.5rem;
              color: #2c3e50;
            }
            
            .member-role {
              color: #667eea;
              font-weight: 600;
              margin-bottom: 1rem;
            }
            
            .member-description {
              color: #666;
              line-height: 1.6;
              margin-bottom: 1.5rem;
            }
            
            .member-social {
              display: flex;
              gap: 1rem;
              justify-content: center;
              
              .social-link {
                padding: 0.5rem 1rem;
                background: #667eea;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-size: 0.9rem;
                transition: all 0.3s ease;
                
                &:hover {
                  background: #5a6fd8;
                  transform: translateY(-2px);
                }
              }
            }
          }
        }
      }
    }
    
    .technology {
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
      
      .tech-categories {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 3rem;
        
        .tech-category {
          .category-title {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: #2c3e50;
            text-align: center;
          }
          
          .tech-items {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            
            .tech-item {
              display: flex;
              align-items: center;
              padding: 1rem;
              background: #f8f9fa;
              border-radius: 8px;
              transition: all 0.3s ease;
              
              &:hover {
                background: #e9ecef;
                transform: translateX(5px);
              }
              
              .tech-icon {
                font-size: 1.5rem;
                margin-right: 1rem;
              }
              
              .tech-name {
                font-weight: 600;
                color: #2c3e50;
                margin-right: 1rem;
                min-width: 120px;
              }
              
              .tech-desc {
                color: #666;
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }
    
    .timeline {
      padding: 6rem 0;
      background: #f8f9fa;
      
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
      
      .timeline-container {
        max-width: 800px;
        margin: 0 auto;
        
        .timeline-item {
          display: flex;
          margin-bottom: 3rem;
          position: relative;
          
          &::before {
            content: '';
            position: absolute;
            left: 150px;
            top: 0;
            bottom: -3rem;
            width: 2px;
            background: #667eea;
          }
          
          &:last-child::before {
            display: none;
          }
          
          .timeline-date {
            width: 120px;
            font-weight: 600;
            color: #667eea;
            text-align: right;
            padding-right: 2rem;
            position: relative;
            
            &::after {
              content: '';
              position: absolute;
              right: -8px;
              top: 50%;
              transform: translateY(-50%);
              width: 16px;
              height: 16px;
              background: #667eea;
              border-radius: 50%;
              border: 4px solid white;
            }
          }
          
          .timeline-content {
            flex: 1;
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            
            .timeline-title {
              font-size: 1.3rem;
              margin-bottom: 0.5rem;
              color: #2c3e50;
            }
            
            .timeline-description {
              color: #666;
              line-height: 1.6;
            }
          }
        }
      }
    }
    
    @media (max-width: 768px) {
      .about-hero {
        padding: 4rem 0 2rem;
        
        .about-title {
          font-size: 2.5rem;
        }
        
        .about-subtitle {
          font-size: 1.1rem;
        }
      }
      
      .mission {
        padding: 4rem 0;
        
        .mission-content {
          grid-template-columns: 1fr;
          gap: 2rem;
          
          .mission-text {
            .section-title {
              font-size: 2rem;
            }
          }
        }
      }
      
      .team {
        padding: 4rem 0;
        
        .section-header {
          margin-bottom: 2rem;
          
          .section-title {
            font-size: 2rem;
          }
        }
      }
      
      .technology {
        padding: 4rem 0;
        
        .section-header {
          margin-bottom: 2rem;
          
          .section-title {
            font-size: 2rem;
          }
        }
        
        .tech-categories {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
      }
      
      .timeline {
        padding: 4rem 0;
        
        .section-header {
          margin-bottom: 2rem;
          
          .section-title {
            font-size: 2rem;
          }
        }
        
        .timeline-container {
          .timeline-item {
            flex-direction: column;
            
            &::before {
              left: 20px;
            }
            
            .timeline-date {
              width: auto;
              text-align: left;
              padding-left: 3rem;
              margin-bottom: 1rem;
              
              &::after {
                left: 0;
                right: auto;
              }
            }
          }
        }
      }
    }
  `]
})
export class AboutComponent {}
