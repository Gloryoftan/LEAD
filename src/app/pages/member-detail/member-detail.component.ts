import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
                <div class="meta-item" *ngIf="member.englishName">
                  <span class="meta-label">英文名</span>
                  <span class="meta-value">{{ member.englishName }}</span>
                </div>
                <div class="meta-item" *ngIf="member.memberId">
                  <span class="meta-label">会员号</span>
                  <span class="meta-value">{{ member.memberId }}</span>
                </div>
                <div class="meta-item" *ngIf="member.educationLevel">
                  <span class="meta-label">教育级</span>
                  <span class="meta-value">{{ member.educationLevel }}</span>
                </div>
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
                
                <div class="timeline-content" 
                     [class.clickable]="milestone.clickable"
                     (click)="onMilestoneClick(milestone)">
                  <div class="milestone-header">
                    <h3 class="milestone-title">
                      {{ milestone.title }}
                      <span *ngIf="milestone.clickable" class="click-indicator">🔗</span>
                    </h3>
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

      <!-- 项目目标 -->
      <section class="project-goals-section" *ngIf="member.projectGoals">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">项目目标</h2>
            <p class="section-subtitle">SMART目标框架</p>
          </div>

          <div class="goals-smart-grid" data-aos="fade-up">
            <div class="smart-item" data-aos="fade-up" data-aos-delay="100">
              <div class="smart-icon">🎯</div>
              <div class="smart-content">
                <h4 class="smart-title">明确性 (Specific)</h4>
                <p class="smart-description">{{ member.projectGoals.specific }}</p>
              </div>
            </div>
            <div class="smart-item" data-aos="fade-up" data-aos-delay="200">
              <div class="smart-icon">📊</div>
              <div class="smart-content">
                <h4 class="smart-title">可衡量的 (Measurable)</h4>
                <p class="smart-description">{{ member.projectGoals.measurable }}</p>
              </div>
            </div>
            <div class="smart-item" data-aos="fade-up" data-aos-delay="300">
              <div class="smart-icon">✅</div>
              <div class="smart-content">
                <h4 class="smart-title">可实现性 (Attainable)</h4>
                <p class="smart-description">{{ member.projectGoals.attainable }}</p>
              </div>
            </div>
            <div class="smart-item" data-aos="fade-up" data-aos-delay="400">
              <div class="smart-icon">🔗</div>
              <div class="smart-content">
                <h4 class="smart-title">相关性 (Relevant)</h4>
                <p class="smart-description">{{ member.projectGoals.relevant }}</p>
              </div>
            </div>
            <div class="smart-item" data-aos="fade-up" data-aos-delay="500">
              <div class="smart-icon">⏰</div>
              <div class="smart-content">
                <h4 class="smart-title">时限性 (Time-bound)</h4>
                <p class="smart-description">{{ member.projectGoals.timeBound }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 卡点分析 -->
      <section class="pain-points-section" *ngIf="member.painPoints && member.painPoints.length > 0">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">卡点分析</h2>
            <p class="section-subtitle">挑战与解决方案</p>
          </div>

          <div class="pain-points-grid" data-aos="fade-up">
            <div 
              *ngFor="let painPoint of member.painPoints; let i = index; trackBy: trackByPainPointIndex"
              class="pain-point-card"
              [attr.data-aos-delay]="i * 100"
              data-aos="fade-up"
            >
              <div class="pain-point-header">
                <div class="pain-point-icon">💡</div>
                <h4 class="pain-point-title">卡点 {{ i + 1 }}</h4>
              </div>
              
              <div class="pain-point-content">
                <div class="pain-point-section">
                  <h5 class="section-label">情境</h5>
                  <p class="section-content">{{ painPoint.situation }}</p>
                </div>
                
                <div class="pain-point-section">
                  <h5 class="section-label">痛感瞬间关键词</h5>
                  <p class="section-content">{{ painPoint.keywords }}</p>
                </div>
                
                <div class="pain-point-section">
                  <h5 class="section-label">希望获得的破局支持</h5>
                  <p class="section-content">{{ painPoint.support }}</p>
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
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(10px);
      color: white;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .profile-info {
      flex: 1;
    }

    .member-name {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: white;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .member-title {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.95);
      margin-bottom: 0.25rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .member-department {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 1rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .member-bio {
      font-size: 1.1rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.95);
      margin-bottom: 2rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .member-meta {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .meta-item {
      text-align: center;
    }

    .meta-label {
      display: block;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: 0.25rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .meta-value {
      display: block;
      font-size: 1.5rem;
      font-weight: 600;
      color: white;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
      transition: all 0.3s ease;
    }

    .timeline-content.clickable {
      cursor: pointer;
      border: 2px solid transparent;
      background: linear-gradient(white, white) padding-box,
                  linear-gradient(135deg, #667eea 0%, #764ba2 100%) border-box;
    }

    .timeline-content.clickable:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(102, 126, 234, 0.2);
    }

    .click-indicator {
      margin-left: 0.5rem;
      font-size: 0.8rem;
      opacity: 0.7;
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

    .meta-value {
      color: #2c3e50;
      font-weight: 500;
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

    .project-goals-section {
      padding: 4rem 0;
      background: #f8f9fa;
    }

    .goals-smart-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .smart-item {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      transition: transform 0.3s ease;
    }

    .smart-item:hover {
      transform: translateY(-5px);
    }

    .smart-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .smart-content {
      flex: 1;
    }

    .smart-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .smart-description {
      color: #555;
      line-height: 1.6;
      margin: 0;
    }

    .pain-points-section {
      padding: 4rem 0;
      background: white;
    }

    .pain-points-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .pain-point-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #667eea;
      transition: transform 0.3s ease;
    }

    .pain-point-card:hover {
      transform: translateY(-5px);
    }

    .pain-point-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .pain-point-icon {
      font-size: 1.5rem;
    }

    .pain-point-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0;
    }

    .pain-point-content {
      space-y: 1rem;
    }

    .pain-point-section {
      margin-bottom: 1rem;
    }

    .section-label {
      font-size: 1rem;
      font-weight: 600;
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .section-content {
      color: #555;
      line-height: 1.6;
      margin: 0;
      padding: 0.75rem;
      background: #f8f9fa;
      border-radius: 8px;
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
    private router: Router,
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

  trackByPainPointIndex(index: number, painPoint: any): number {
    return index;
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
      case 'leadership': return '领导力';
      case 'training': return '培训';
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
      case 'leadership': return '👑';
      case 'training': return '📚';
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

  onMilestoneClick(milestone: Milestone): void {
    if (milestone.clickable && milestone.link) {
      this.router.navigate([milestone.link]);
    }
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
