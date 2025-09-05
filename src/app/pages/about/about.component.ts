import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- About Hero -->
    <section class="page-hero">
      <div class="container">
        <div class="text-center">
          <h1 class="page-title fade-in-up">关于 LEAD 项目</h1>
          <p class="page-subtitle fade-in-up">
            《D128 LEAD项目第二期》- 让每一位Leader，成为改变发生的支点
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission">
      <div class="container">
        <div class="mission-content">
          <div class="mission-text">
            <h2 class="section-title">项目背景</h2>
            <p class="mission-description">
              为渴望突破领导力瓶颈的大区干事提供练兵场&赋能场，破局共生，打造韧性领导力。
              我们相信每一位Leader都有成为改变发生支点的潜力，通过系统化的培训和实践，
              能够突破个人和团队的成长瓶颈。
            </p>
            <p class="mission-description">
              我们的使命是让每位肩负使命的伙伴，在破局时有人支持，在探索时有路可循。
              通过炼能、韧性、共生三大核心价值观，构建一个互助共赢的领导力发展生态。
            </p>
          </div>
          <div class="mission-image">
            <div class="mission-graphic">
              <div class="tech-stack">
                <div class="tech-item">炼能</div>
                <div class="tech-item">韧性</div>
                <div class="tech-item">共生</div>
                <div class="tech-item">LEAD</div>
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
          <h2 class="section-title">项目目标</h2>
          <p class="section-subtitle">
            通过系统化的培训和实践，实现领导力突破和团队成长
          </p>
        </div>
        
        <div class="team-grid">
          <div class="team-member card">
            <div class="member-avatar">
              <div class="avatar-placeholder">📚</div>
            </div>
            <div class="member-info">
              <h3 class="member-name">学员留存率</h3>
              <p class="member-role">课程参与率 ≥85%</p>
              <p class="member-description">
                确保学员积极参与培训课程，建立持续学习的良好习惯。
              </p>
            </div>
          </div>
          <div class="team-member card">
            <div class="member-avatar">
              <div class="avatar-placeholder">✅</div>
            </div>
            <div class="member-info">
              <h3 class="member-name">作业完成率</h3>
              <p class="member-role">作业完成率 ≥80%</p>
              <p class="member-description">
                通过实践作业巩固学习成果，提升领导力技能的实际应用能力。
              </p>
            </div>
          </div>
          <div class="team-member card">
            <div class="member-avatar">
              <div class="avatar-placeholder">🎯</div>
            </div>
            <div class="member-info">
              <h3 class="member-name">卡点解决率</h3>
              <p class="member-role">领导力卡点解决率 ≥80%</p>
              <p class="member-description">
                针对性解决学员在领导力发展过程中遇到的具体问题和瓶颈。
              </p>
            </div>
          </div>
          <div class="team-member card">
            <div class="member-avatar">
              <div class="avatar-placeholder">🌟</div>
            </div>
            <div class="member-info">
              <h3 class="member-name">成果转化率</h3>
              <p class="member-role">50%学员进入DLC人才池</p>
              <p class="member-description">
                将培训成果转化为实际价值，为组织培养更多优秀的领导人才。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Section -->
    <section class="technology">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">核心价值观</h2>
          <p class="section-subtitle">
            炼能、韧性、共生 - 构建领导力发展的三大支柱
          </p>
        </div>
        
        <div class="tech-categories">
          <div class="tech-category">
            <h3 class="category-title">炼能</h3>
            <div class="tech-items">
              <div class="tech-item">
                <span class="tech-icon">🎯</span>
                <span class="tech-name">能力建设</span>
                <span class="tech-desc">系统化提升领导力核心技能</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">📚</span>
                <span class="tech-name">知识体系</span>
                <span class="tech-desc">构建完整的领导力知识框架</span>
              </div>
            </div>
          </div>
          
          <div class="tech-category">
            <h3 class="category-title">韧性</h3>
            <div class="tech-items">
              <div class="tech-item">
                <span class="tech-icon">💪</span>
                <span class="tech-name">心理韧性</span>
                <span class="tech-desc">培养面对挑战的适应能力</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">🔄</span>
                <span class="tech-name">恢复能力</span>
                <span class="tech-desc">快速从挫折中恢复并成长</span>
              </div>
            </div>
          </div>
          
          <div class="tech-category">
            <h3 class="category-title">共生</h3>
            <div class="tech-items">
              <div class="tech-item">
                <span class="tech-icon">🤝</span>
                <span class="tech-name">团队协作</span>
                <span class="tech-desc">建立互助共赢的团队文化</span>
              </div>
              <div class="tech-item">
                <span class="tech-icon">🌱</span>
                <span class="tech-name">共同成长</span>
                <span class="tech-desc">实现个人与团队的共同发展</span>
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
          <h2 class="section-title">项目口号</h2>
          <p class="section-subtitle">
            LEAD Program—Ignite change starting from YOU/ME. 让改变从你(我)开始
          </p>
        </div>
        
        <div class="timeline-container">
          <div class="timeline-item">
            <div class="timeline-date">愿景</div>
            <div class="timeline-content">
              <h3 class="timeline-title">让每一位Leader，成为改变发生的支点</h3>
              <p class="timeline-description">
                我们相信每个人都有成为领导者的潜力，通过系统化的培训和实践，
                能够成为推动组织和社会变革的重要力量。
              </p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-date">使命</div>
            <div class="timeline-content">
              <h3 class="timeline-title">让每位肩负使命的伙伴，在破局时有人支持，在探索时有路可循</h3>
              <p class="timeline-description">
                为每一位渴望突破领导力瓶颈的大区干事提供练兵场和赋能场，
                在挑战中成长，在探索中前行。
              </p>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-date">传播度</div>
            <div class="timeline-content">
              <h3 class="timeline-title">项目故事获大区公众号阅读量500+</h3>
              <p class="timeline-description">
                通过分享项目故事和学员成长经历，扩大项目影响力，
                激励更多人参与领导力发展。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    
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
