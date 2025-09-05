import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MemberService } from '../../services/member.service';
import { Member, Milestone } from '../../models/member.model';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="member-detail-page" *ngIf="member">
      <!-- 成员头部信息 -->
      <section class="member-header">
        <div class="container">
          <div class="member-profile" data-aos="fade-up">
            <div class="profile-avatar">
              <img 
                [src]="member.avatar || getDefaultAvatar(member.name)" 
                [alt]="member.name"
                class="avatar-large"
              >
              <div class="status-badge" [class]="getStatusClass(member)">
                {{ getStatusText(member) }}
              </div>
            </div>
            
            <div class="profile-info">
              <h1 class="member-name">{{ member.name }}</h1>
              <p class="member-title">{{ member.position }}</p>
              <p class="member-department">{{ member.department }}</p>
              <p class="member-bio">{{ member.bio }}</p>
              
              <div class="member-meta">
                <div class="meta-item">
                  <span class="meta-label">加入时间</span>
                  <span class="meta-value">{{ formatDate(member.joinDate) }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">绩效评分</span>
                  <span class="meta-value">{{ member.performance.rating }}/5</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">里程碑完成率</span>
                  <span class="meta-value">{{ getProgressPercentage(member) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 成长路径时间线 -->
      <section class="timeline-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">成长路径</h2>
            <p class="section-subtitle">关键里程碑与成就轨迹</p>
          </div>

          <div class="timeline-container" data-aos="fade-up">
            <div class="timeline">
              <div 
                *ngFor="let milestone of member.milestones; let i = index; trackBy: trackByMilestoneId"
                class="timeline-item"
                [class]="getTimelineItemClass(milestone)"
                [attr.data-aos-delay]="i * 100"
                data-aos="fade-up"
              >
                <div class="timeline-marker">
                  <div class="marker-icon" [class]="getMarkerIconClass(milestone)">
                    {{ getMarkerIcon(milestone) }}
                  </div>
                </div>
                
                <div class="timeline-content">
                  <div class="milestone-header">
                    <h3 class="milestone-title">{{ milestone.title }}</h3>
                    <div class="milestone-badges">
                      <span class="status-badge" [class]="milestone.status">
                        {{ getStatusText(milestone.status) }}
                      </span>
                      <span class="category-badge" [class]="milestone.category">
                        {{ getCategoryText(milestone.category) }}
                      </span>
                      <span class="priority-badge" [class]="milestone.priority">
                        {{ getPriorityText(milestone.priority) }}
                      </span>
                    </div>
                  </div>
                  
                  <p class="milestone-description">{{ milestone.description }}</p>
                  
                  <div class="milestone-meta">
                    <div class="meta-row" *ngIf="milestone.completedDate">
                      <span class="meta-label">完成时间</span>
                      <span class="meta-value">{{ formatDate(milestone.completedDate) }}</span>
                    </div>
                    <div class="meta-row" *ngIf="milestone.tags.length > 0">
                      <span class="meta-label">标签</span>
                      <div class="tags">
                        <span *ngFor="let tag of milestone.tags" class="tag">{{ tag }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 技能和统计图表 -->
      <section class="stats-section">
        <div class="container">
          <div class="stats-grid">
            <!-- 技能雷达图 -->
            <div class="chart-card" data-aos="fade-up" data-aos-delay="100">
              <h3 class="chart-title">技能分布</h3>
              <div class="chart-container">
                <canvas #skillsChart></canvas>
              </div>
            </div>

            <!-- 里程碑完成趋势 -->
            <div class="chart-card" data-aos="fade-up" data-aos-delay="200">
              <h3 class="chart-title">里程碑完成趋势</h3>
              <div class="chart-container">
                <canvas #timelineChart></canvas>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 当前目标 -->
      <section class="goals-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">当前目标</h2>
            <p class="section-subtitle">正在努力实现的目标</p>
          </div>

          <div class="goals-grid" data-aos="fade-up">
            <div 
              *ngFor="let goal of member.currentGoals; let i = index"
              class="goal-card"
              [attr.data-aos-delay]="i * 100"
              data-aos="fade-up"
            >
              <div class="goal-icon">🎯</div>
              <div class="goal-content">
                <h4 class="goal-title">{{ goal }}</h4>
                <div class="goal-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" [style.width.%]="getRandomProgress()"></div>
                  </div>
                  <span class="progress-text">{{ getRandomProgress() }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 返回按钮 -->
      <div class="back-button">
        <a routerLink="/members" class="btn btn-primary">
          ← 返回成员列表
        </a>
      </div>
    </div>

    <!-- 加载状态 -->
    <div class="loading-state" *ngIf="!member">
      <div class="loading-spinner"></div>
      <p>加载成员信息中...</p>
    </div>
  `,
  styles: [`
    .member-detail-page {
      min-height: 100vh;
      background: #f8f9fa;
    }

    .member-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 0;
    }

    .member-profile {
      display: flex;
      align-items: center;
      gap: 3rem;
    }

    .profile-avatar {
      position: relative;
      flex-shrink: 0;
    }

    .avatar-large {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 6px solid rgba(255, 255, 255, 0.2);
    }

    .status-badge {
      position: absolute;
      bottom: 10px;
      right: 10px;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
    }

    .profile-info {
      flex: 1;
    }

    .member-name {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .member-title {
      font-size: 1.5rem;
      opacity: 0.9;
      margin-bottom: 0.25rem;
    }

    .member-department {
      font-size: 1.1rem;
      opacity: 0.8;
      margin-bottom: 1rem;
    }

    .member-bio {
      font-size: 1.1rem;
      line-height: 1.6;
      opacity: 0.9;
      margin-bottom: 2rem;
    }

    .member-meta {
      display: flex;
      gap: 2rem;
    }

    .meta-item {
      text-align: center;
    }

    .meta-label {
      display: block;
      font-size: 0.9rem;
      opacity: 0.8;
      margin-bottom: 0.25rem;
    }

    .meta-value {
      display: block;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .timeline-section {
      padding: 4rem 0;
      background: white;
    }

    .timeline-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .timeline {
      position: relative;
      padding: 2rem 0;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transform: translateX(-50%);
    }

    .timeline-item {
      position: relative;
      margin-bottom: 3rem;
      display: flex;
      align-items: center;
    }

    .timeline-item:nth-child(odd) {
      flex-direction: row;
    }

    .timeline-item:nth-child(even) {
      flex-direction: row-reverse;
    }

    .timeline-marker {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
    }

    .marker-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 600;
      border: 4px solid white;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .marker-icon.completed {
      background: #28a745;
      color: white;
    }

    .marker-icon.in-progress {
      background: #ffc107;
      color: white;
    }

    .marker-icon.pending {
      background: #6c757d;
      color: white;
    }

    .timeline-content {
      width: 45%;
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      position: relative;
    }

    .timeline-item:nth-child(odd) .timeline-content {
      margin-left: auto;
    }

    .timeline-item:nth-child(even) .timeline-content {
      margin-right: auto;
    }

    .milestone-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .milestone-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0;
    }

    .milestone-badges {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .status-badge.completed {
      background: #d4edda;
      color: #155724;
    }

    .status-badge.in-progress {
      background: #fff3cd;
      color: #856404;
    }

    .status-badge.pending {
      background: #f8d7da;
      color: #721c24;
    }

    .category-badge.skill {
      background: #cce5ff;
      color: #004085;
    }

    .category-badge.project {
      background: #d1ecf1;
      color: #0c5460;
    }

    .category-badge.achievement {
      background: #d4edda;
      color: #155724;
    }

    .category-badge.certification {
      background: #f8d7da;
      color: #721c24;
    }

    .priority-badge.high {
      background: #f8d7da;
      color: #721c24;
    }

    .priority-badge.medium {
      background: #fff3cd;
      color: #856404;
    }

    .priority-badge.low {
      background: #d1ecf1;
      color: #0c5460;
    }

    .milestone-description {
      color: #555;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .milestone-meta {
      border-top: 1px solid #f0f0f0;
      padding-top: 1rem;
    }

    .meta-row {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .meta-label {
      font-weight: 600;
      color: #6c757d;
      margin-right: 1rem;
      min-width: 80px;
    }

    .tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .tag {
      background: #e3f2fd;
      color: #1976d2;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
    }

    .stats-section {
      padding: 4rem 0;
      background: #f8f9fa;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .chart-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .chart-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .chart-container {
      position: relative;
      height: 300px;
    }

    .goals-section {
      padding: 4rem 0;
      background: white;
    }

    .goals-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .goal-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: transform 0.3s ease;
    }

    .goal-card:hover {
      transform: translateY(-5px);
    }

    .goal-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .goal-content {
      flex: 1;
    }

    .goal-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .goal-progress {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .progress-bar {
      flex: 1;
      height: 8px;
      background: #f0f0f0;
      border-radius: 4px;
      overflow: hidden;
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
      font-weight: 600;
      min-width: 40px;
    }

    .back-button {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 1000;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 50vh;
      gap: 1rem;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .member-profile {
        flex-direction: column;
        text-align: center;
        gap: 2rem;
      }

      .member-name {
        font-size: 2rem;
      }

      .member-meta {
        flex-direction: column;
        gap: 1rem;
      }

      .timeline::before {
        left: 30px;
      }

      .timeline-item {
        flex-direction: row !important;
        padding-left: 60px;
      }

      .timeline-marker {
        left: 30px;
      }

      .timeline-content {
        width: 100%;
        margin: 0 !important;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .goals-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MemberDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('skillsChart', { static: false }) skillsChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('timelineChart', { static: false }) timelineChartRef!: ElementRef<HTMLCanvasElement>;

  member: Member | undefined;
  private destroy$ = new Subject<void>();
  private skillsChart: Chart | undefined;
  private timelineChart: Chart | undefined;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const memberId = params['id'];
        this.member = this.memberService.getMemberById(memberId);
      });
  }

  ngAfterViewInit(): void {
    if (this.member) {
      setTimeout(() => {
        this.createSkillsChart();
        this.createTimelineChart();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.skillsChart) {
      this.skillsChart.destroy();
    }
    if (this.timelineChart) {
      this.timelineChart.destroy();
    }
  }

  trackByMilestoneId(index: number, milestone: Milestone): string {
    return milestone.id;
  }

  getDefaultAvatar(name: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=150`;
  }

  getStatusClass(member: Member): string {
    const rating = member.performance.rating;
    if (rating >= 4.5) return 'active';
    if (rating >= 3.5) return 'busy';
    return 'away';
  }

  getStatusText(status: string | Member): string {
    if (typeof status === 'string') {
      switch (status) {
        case 'completed': return '已完成';
        case 'in-progress': return '进行中';
        case 'pending': return '待开始';
        default: return status;
      }
    } else {
      const rating = status.performance.rating;
      if (rating >= 4.5) return '优秀';
      if (rating >= 3.5) return '良好';
      return '待提升';
    }
  }

  getCategoryText(category: string): string {
    switch (category) {
      case 'skill': return '技能';
      case 'project': return '项目';
      case 'achievement': return '成就';
      case 'certification': return '认证';
      default: return category;
    }
  }

  getPriorityText(priority: string): string {
    switch (priority) {
      case 'high': return '高优先级';
      case 'medium': return '中优先级';
      case 'low': return '低优先级';
      default: return priority;
    }
  }

  getTimelineItemClass(milestone: Milestone): string {
    return `timeline-item-${milestone.status}`;
  }

  getMarkerIconClass(milestone: Milestone): string {
    return milestone.status;
  }

  getMarkerIcon(milestone: Milestone): string {
    switch (milestone.category) {
      case 'skill': return '📚';
      case 'project': return '🚀';
      case 'achievement': return '🏆';
      case 'certification': return '📜';
      default: return '⭐';
    }
  }

  getProgressPercentage(member: Member): number {
    const total = member.milestones.length;
    const completed = member.milestones.filter(m => m.status === 'completed').length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  getRandomProgress(): number {
    return Math.floor(Math.random() * 40) + 30; // 30-70% 的随机进度
  }

  private createSkillsChart(): void {
    if (!this.member || !this.skillsChartRef) return;

    const ctx = this.skillsChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const skills = this.member.skills;
    const skillLevels = skills.map(() => Math.floor(Math.random() * 5) + 1); // 随机技能等级

    this.skillsChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: skills,
        datasets: [{
          label: '技能水平',
          data: skillLevels,
          backgroundColor: 'rgba(102, 126, 234, 0.2)',
          borderColor: 'rgba(102, 126, 234, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(102, 126, 234, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(102, 126, 234, 1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  private createTimelineChart(): void {
    if (!this.member || !this.timelineChartRef) return;

    const ctx = this.timelineChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    // 按月份统计里程碑完成情况
    const monthlyData = this.getMonthlyMilestoneData();

    this.timelineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthlyData.labels,
        datasets: [{
          label: '完成的里程碑',
          data: monthlyData.completed,
          borderColor: 'rgba(102, 126, 234, 1)',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }, {
          label: '总里程碑',
          data: monthlyData.total,
          borderColor: 'rgba(118, 75, 162, 1)',
          backgroundColor: 'rgba(118, 75, 162, 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }

  private getMonthlyMilestoneData(): { labels: string[], completed: number[], total: number[] } {
    const labels: string[] = [];
    const completed: number[] = [];
    const total: number[] = [];

    // 生成过去12个月的数据
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthLabel = date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short' });
      labels.push(monthLabel);

      // 模拟数据
      const monthCompleted = Math.floor(Math.random() * 3);
      const monthTotal = monthCompleted + Math.floor(Math.random() * 2);
      
      completed.push(monthCompleted);
      total.push(monthTotal);
    }

    return { labels, completed, total };
  }
}
