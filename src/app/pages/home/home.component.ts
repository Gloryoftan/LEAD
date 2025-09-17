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
            《D128 2025-2026 LEAD项目》
          </h1>
          <p class="hero-subtitle">
            让每一位Leader，成为改变发生的支点
          </p>
          <p class="hero-mission">
            让每位肩负使命的伙伴，在破局时有人支持，在探索时有路可循
          </p>
          <div class="hero-actions">
            <a href="https://mp.weixin.qq.com/s/c6qmMhi8uAmrsSPsUM5fJA" target="_blank" class="btn btn-primary">了解更多</a>
            <a href="/members" class="btn btn-outline">查看学员</a>
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

    <!-- Background Section -->
    <section class="background">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">项目背景</h2>
          <p class="section-subtitle">
            为渴望突破领导力瓶颈的大区干事提供练兵场&赋能场，破局共生，打造韧性领导力
          </p>
        </div>
        
        <div class="background-content">
          <div class="background-text">
            <h3>我们的愿景</h3>
            <p>让每一位Leader，成为改变发生的支点</p>
            
            <h3>我们的使命</h3>
            <p>让每位肩负使命的伙伴，在破局时有人支持，在探索时有路可循</p>
            
            <h3>核心价值观</h3>
            <div class="values">
              <span class="value-tag">炼能</span>
              <span class="value-tag">韧性</span>
              <span class="value-tag">共生</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">项目特色</h2>
          <p class="section-subtitle">
            为渴望突破领导力瓶颈的大区干事提供练兵场&赋能场，破局共生，打造韧性领导力
          </p>
        </div>
        
        <div class="grid grid-3">
          <div class="card feature-card fade-in-up">
            <div class="feature-icon">🎯</div>
            <h3 class="feature-title">炼能</h3>
            <p class="feature-description">
              通过系统化培训和实践，提升领导力核心能力
            </p>
          </div>
          
          <div class="card feature-card fade-in-up">
            <div class="feature-icon">💪</div>
            <h3 class="feature-title">韧性</h3>
            <p class="feature-description">
              培养面对挑战时的心理韧性和适应能力
            </p>
          </div>
          
          <div class="card feature-card fade-in-up">
            <div class="feature-icon">🤝</div>
            <h3 class="feature-title">共生</h3>
            <p class="feature-description">
              建立互助共赢的团队文化和协作关系
            </p>
          </div>
          
          <div class="card feature-card fade-in-up">
            <div class="feature-icon">📚</div>
            <h3 class="feature-title">系统培训</h3>
            <p class="feature-description">
              课程参与率≥85%，作业完成率≥80%
            </p>
          </div>
          
          <div class="card feature-card fade-in-up">
            <div class="feature-icon">🔧</div>
            <h3 class="feature-title">问题解决</h3>
            <p class="feature-description">
              领导力卡点解决率≥80%，针对性突破瓶颈
            </p>
          </div>
          
          <div class="card feature-card fade-in-up">
            <div class="feature-icon">🌟</div>
            <h3 class="feature-title">成果转化</h3>
            <p class="feature-description">
              50%学员进入DLC人才池，实现价值转化
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="grid grid-5">
          <div class="stat-item text-center">
            <div class="stat-number">≥85%</div>
            <div class="stat-label">课程参与率</div>
          </div>
          <div class="stat-item text-center">
            <div class="stat-number">≥80%</div>
            <div class="stat-label">作业完成率</div>
          </div>
          <div class="stat-item text-center">
            <div class="stat-number">≥80%</div>
            <div class="stat-label">卡点解决率</div>
          </div>
          <div class="stat-item text-center">
            <div class="stat-number">50%</div>
            <div class="stat-label">人才池转化</div>
          </div>
          <div class="stat-item text-center">
            <div class="stat-number">500+</div>
            <div class="stat-label">公众号阅读量</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content text-center">
          <h2 class="cta-title">让改变从你(我)开始</h2>
          <p class="cta-subtitle">
            LEAD Program—Ignite change starting from YOU/ME
          </p>
          <div class="cta-actions">
            <a href="/contact" class="btn btn-primary">查看团队</a>
            <a href="https://mp.weixin.qq.com/s/c6qmMhi8uAmrsSPsUM5fJA" target="_blank" class="btn btn-secondary">了解更多</a>
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
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          
          .highlight {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.2rem 0.5rem;
            border-radius: 8px;
          }
        }
        
        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.6;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .hero-mission {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          font-style: italic;
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
    
    .background {
      padding: 6rem 0;
      background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
      
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
      
      .background-content {
        max-width: 800px;
        margin: 0 auto;
        
        .background-text {
          text-align: center;
          
          h3 {
            font-size: 1.5rem;
            color: #2c3e50;
            margin-bottom: 1rem;
            margin-top: 2rem;
            
            &:first-child {
              margin-top: 0;
            }
          }
          
          p {
            font-size: 1.1rem;
            color: #666;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }
          
          .values {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
            margin-top: 1rem;
            
            .value-tag {
              padding: 0.5rem 1.5rem;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border-radius: 25px;
              font-weight: 600;
              font-size: 1rem;
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
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .cta-subtitle {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
    
    @media (max-width: 1024px) and (min-width: 769px) {
      .hero {
        .hero-content {
          .hero-title {
            font-size: 3rem;
            white-space: nowrap;
            overflow: visible;
            text-overflow: initial;
          }
        }
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
            font-size: 2.2rem;
            white-space: nowrap;
            overflow: visible;
            text-overflow: initial;
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
      
      .background {
        padding: 4rem 0;
        
        .section-header {
          margin-bottom: 2rem;
          
          .section-title {
            font-size: 2rem;
          }
        }
        
        .background-content {
          .background-text {
            h3 {
              font-size: 1.3rem;
            }
            
            p {
              font-size: 1rem;
            }
            
            .values {
              .value-tag {
                font-size: 0.9rem;
                padding: 0.4rem 1.2rem;
              }
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
    
    @media (max-width: 480px) {
      .hero {
        .hero-content {
          .hero-title {
            font-size: 1.8rem;
            white-space: nowrap;
            overflow: visible;
            text-overflow: initial;
          }
        }
      }
    }
  `]
})
export class HomeComponent {}

