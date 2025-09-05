import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="members-page">
      <!-- 页面头部 -->
      <section class="page-hero">
        <div class="container">
          <h1 class="page-title">学员</h1>
          <p class="page-subtitle">探索每个学员的领导力成长轨迹和关键成就</p>
        </div>
      </section>

      <!-- 成员列表 -->
      <section class="members-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">我们的学员</h2>
            <p class="section-subtitle">{{ members.length }} 位优秀学员</p>
          </div>

          <div class="members-grid" data-aos="fade-up">
            <div 
              *ngFor="let member of members; let i = index; trackBy: trackByMemberId" 
              class="member-card"
              [routerLink]="['/members', member.id]"
              data-aos="fade-up"
              [attr.data-aos-delay]="getAnimationDelay(i)"
            >
              <div class="member-avatar">
                <img 
                  [src]="member.avatar || getDefaultAvatar(member.name)" 
                  [alt]="member.name"
                  class="avatar-img"
                >
                <div class="status-indicator" [class]="getStatusClass(member)"></div>
              </div>
              
              <div class="member-info">
                <h3 class="member-name">{{ member.name }}</h3>
                <p class="member-position">{{ member.position }}</p>
                <p class="member-department">{{ member.department }}</p>
                
                <div class="member-stats">
                  <div class="stat-item">
                    <span class="stat-label">参与率</span>
                    <span class="stat-value">{{ member.participationRate }}%</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">完成率</span>
                    <span class="stat-value">{{ member.assignmentCompletionRate }}%</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">解决率</span>
                    <span class="stat-value">{{ member.bottleneckResolutionRate }}%</span>
                  </div>
                </div>

                <div class="member-skills">
                  <span 
                    *ngFor="let skill of member.skills.slice(0, 3)" 
                    class="skill-tag"
                  >
                    {{ skill }}
                  </span>
                  <span *ngIf="member.skills.length > 3" class="more-skills">
                    +{{ member.skills.length - 3 }}
                  </span>
                </div>
              </div>

              <div class="member-progress">
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    [style.width.%]="member.assignmentCompletionRate"
                  ></div>
                </div>
                <span class="progress-text">{{ member.assignmentCompletionRate }}% 完成</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 学员统计 -->
      <section class="team-stats-section">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-card" data-aos="fade-up" data-aos-delay="100">
              <div class="stat-icon">👥</div>
              <div class="stat-content">
                <h3>{{ members.length }}</h3>
                <p>学员总数</p>
              </div>
            </div>
            <div class="stat-card" data-aos="fade-up" data-aos-delay="200">
              <div class="stat-icon">📚</div>
              <div class="stat-content">
                <h3>{{ getAverageParticipationRate() }}%</h3>
                <p>平均参与率</p>
              </div>
            </div>
            <div class="stat-card" data-aos="fade-up" data-aos-delay="300">
              <div class="stat-icon">✅</div>
              <div class="stat-content">
                <h3>{{ getAverageCompletionRate() }}%</h3>
                <p>平均完成率</p>
              </div>
            </div>
            <div class="stat-card" data-aos="fade-up" data-aos-delay="400">
              <div class="stat-icon">🎯</div>
              <div class="stat-content">
                <h3>{{ getAverageResolutionRate() }}%</h3>
                <p>平均解决率</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .members-page {
      min-height: 100vh;
    }

    .members-section {
      padding: 4rem 0;
      background: #f8f9fa;
    }

    .members-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .member-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .member-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .member-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .member-avatar {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
    }

    .avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #f0f0f0;
    }

    .status-indicator {
      position: absolute;
      bottom: 5px;
      right: 5px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
    }

    .status-indicator.active {
      background: #28a745;
    }

    .status-indicator.busy {
      background: #ffc107;
    }

    .status-indicator.away {
      background: #6c757d;
    }

    .member-info {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .member-name {
      font-size: 1.5rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .member-position {
      color: #667eea;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .member-department {
      color: #6c757d;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .member-stats {
      display: flex;
      justify-content: space-around;
      margin-bottom: 1rem;
      padding: 1rem 0;
      border-top: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
    }

    .stat-item {
      text-align: center;
    }

    .stat-label {
      display: block;
      font-size: 0.8rem;
      color: #6c757d;
      margin-bottom: 0.25rem;
    }

    .stat-value {
      display: block;
      font-size: 1.2rem;
      font-weight: 600;
      color: #2c3e50;
    }

    .member-skills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .skill-tag {
      background: #e3f2fd;
      color: #1976d2;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .more-skills {
      background: #f5f5f5;
      color: #6c757d;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
    }

    .member-progress {
      text-align: center;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #f0f0f0;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 0.9rem;
      color: #6c757d;
      font-weight: 500;
    }

    .team-stats-section {
      padding: 4rem 0;
      background: white;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }

    .stat-card {
      text-align: center;
      padding: 2rem;
      border-radius: 12px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-5px);
    }

    .stat-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .stat-content h3 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .stat-content p {
      color: #6c757d;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .members-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .member-card {
        padding: 1.5rem;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      .stat-card {
        padding: 1.5rem;
      }
    }
  `]
})
export class MembersComponent implements OnInit, OnDestroy {
  members: Member[] = [];
  private destroy$ = new Subject<void>();

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.memberService.getMembers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(members => {
        this.members = members;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByMemberId(index: number, member: Member): string {
    return member.id;
  }

  getAnimationDelay(index: number): number {
    return index * 100;
  }

  getDefaultAvatar(name: string): string {
    // 使用默认头像或生成基于名字的初始头像
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=80`;
  }

  getStatusClass(member: Member): string {
    // 根据成员状态返回不同的CSS类
    const rating = member.performance.rating;
    if (rating >= 4.5) return 'active';
    if (rating >= 3.5) return 'busy';
    return 'away';
  }

  getCompletedMilestones(member: Member): number {
    return member.milestones.filter(m => m.status === 'completed').length;
  }

  getProgressPercentage(member: Member): number {
    const total = member.milestones.length;
    const completed = this.getCompletedMilestones(member);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  getAverageParticipationRate(): number {
    if (this.members.length === 0) return 0;
    const totalRate = this.members.reduce((total, member) => total + member.participationRate, 0);
    return Math.round(totalRate / this.members.length);
  }

  getAverageCompletionRate(): number {
    if (this.members.length === 0) return 0;
    const totalRate = this.members.reduce((total, member) => total + member.assignmentCompletionRate, 0);
    return Math.round(totalRate / this.members.length);
  }

  getAverageResolutionRate(): number {
    if (this.members.length === 0) return 0;
    const totalRate = this.members.reduce((total, member) => total + member.bottleneckResolutionRate, 0);
    return Math.round(totalRate / this.members.length);
  }
}
