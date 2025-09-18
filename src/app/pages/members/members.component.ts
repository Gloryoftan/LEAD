import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
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

          <!-- 学员姓名快速导航 -->
          <div class="members-quick-nav" data-aos="fade-up">
            <div class="nav-header">
              <h3 class="nav-title">快速导航</h3>
              <p class="nav-subtitle" *ngIf="!isFiltered">点击姓名筛选显示</p>
              <p class="nav-subtitle" *ngIf="isFiltered">已筛选: {{ getSelectedMemberName() }} | 再次点击取消</p>
            </div>
            <div class="names-container">
              <span 
                *ngFor="let member of members; let i = index" 
                class="name-tag"
                [class.active]="selectedMemberId && (member.memberId || member.id) === selectedMemberId"
                (click)="toggleMemberFilter(member)"
              >
                {{ member.name }}
              </span>
            </div>
          </div>

          <div class="members-grid" data-aos="fade-up">
            <div 
              *ngFor="let member of filteredMembers; let i = index; trackBy: trackByMemberId" 
              class="member-card"
              [class.loading]="loadingStates[member.memberId || '']"
              [class.disabled]="loadingStates[member.memberId || '']"
              [attr.data-letter]="getFirstLetter(member.name)"
              (click)="navigateToMemberDetail(member)"
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
                <p class="member-english" *ngIf="member.englishName">{{ member.englishName }}</p>
                <p class="member-id" *ngIf="member.memberId">会员号: {{ member.memberId }}</p>
                
                <!-- 手机端点击提示 -->
                <div class="mobile-tap-hint" *ngIf="!loadingStates[member.memberId || '']">
                  <span class="tap-icon">👆</span>
                  <span class="tap-text">点击查看详情</span>
                </div>
                
                <!-- 加载状态提示 -->
                <div class="loading-hint" *ngIf="loadingStates[member.memberId || '']">
                  <div class="loading-spinner"></div>
                  <span class="loading-text">正在加载...</span>
                </div>
                
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

    .members-quick-nav {
      margin: 2rem 0;
      padding: 2rem;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid #f0f0f0;
    }

    .nav-header {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .nav-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .nav-subtitle {
      color: #6c757d;
      font-size: 0.9rem;
      margin: 0;
    }

    .names-container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      max-width: 900px;
      margin: 0 auto;
    }

    .name-tag {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.6rem 1.2rem;
      border-radius: 25px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      color: #495057;
      font-weight: 500;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      min-width: 60px;
      text-align: center;
    }

    .name-tag:hover {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
      border-color: #667eea;
    }

    .name-tag.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: #764ba2;
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
      transform: translateY(-1px);
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

    .member-card:active {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    }

    .member-card.loading {
      opacity: 0.7;
      pointer-events: none;
    }

    .member-card.disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .member-card.highlight {
      animation: highlightPulse 2s ease-in-out;
      border: 3px solid #667eea;
      box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
    }

    @keyframes highlightPulse {
      0% {
        transform: scale(1);
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
      }
      50% {
        transform: scale(1.02);
        box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
      }
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
      margin-bottom: 0.5rem;
    }

    .member-english {
      color: #667eea;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .member-id {
      color: #6c757d;
      font-size: 0.8rem;
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

    .mobile-tap-hint {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin: 1rem 0;
      padding: 0.75rem 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 25px;
      font-size: 0.9rem;
      font-weight: 500;
      animation: pulse 2s infinite;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      transition: all 0.3s ease;
    }

    .mobile-tap-hint:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .tap-icon {
      font-size: 1.2rem;
    }

    .tap-text {
      font-size: 0.85rem;
    }

    .loading-hint {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin: 1rem 0;
      padding: 0.75rem 1rem;
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      color: white;
      border-radius: 25px;
      font-size: 0.9rem;
      font-weight: 500;
      box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
      animation: loadingPulse 1.5s infinite;
    }

    .loading-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .loading-text {
      font-size: 0.85rem;
    }

    @keyframes loadingPulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.02);
        opacity: 0.9;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.8;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
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
      .members-quick-nav {
        margin: 1.5rem 0;
        padding: 1.5rem;
      }

      .nav-title {
        font-size: 1.1rem;
      }

      .nav-subtitle {
        font-size: 0.8rem;
      }

      .names-container {
        gap: 0.5rem;
      }

      .name-tag {
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
        min-width: 50px;
      }

      .members-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .member-card {
        padding: 1.5rem;
        position: relative;
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
  filteredMembers: Member[] = [];
  loadingStates: { [key: string]: boolean } = {};
  selectedMemberId: string | null = null;
  isFiltered: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.memberService.getMembers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(members => {
        this.members = members;
        this.filteredMembers = members;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByMemberId(index: number, member: Member): string {
    return member.memberId || member.id;
  }

  getAnimationDelay(index: number): number {
    return index * 100;
  }

  getDefaultAvatar(name: string): string {
    // 使用默认头像或生成基于名字的初始头像
    // 对于三个字的名字，显示后两个字；两个字的名字保持不变
    let displayName = name;
    if (name.length === 3) {
      displayName = name.substring(1); // 取后两个字
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=667eea&color=fff&size=80`;
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

  /**
   * 导航到成员详情页面
   * 添加加载状态管理和智能预加载，提升用户体验
   */
  navigateToMemberDetail(member: Member): void {
    const memberId = member.memberId || '';
    
    // 如果已经在加载中，直接返回
    if (this.loadingStates[memberId]) {
      return;
    }

    // 设置加载状态
    this.loadingStates[memberId] = true;

    // 预加载目标组件（如果还没有加载）
    this.preloadMemberDetailComponent();

    // 使用setTimeout来确保UI更新，然后进行路由跳转
    setTimeout(() => {
      this.router.navigate(['/members', memberId])
        .then(() => {
          // 导航成功后清除加载状态
          this.loadingStates[memberId] = false;
        })
        .catch((error) => {
          // 导航失败时也清除加载状态
          console.error('导航失败:', error);
          this.loadingStates[memberId] = false;
        });
    }, 100);
  }

  /**
   * 预加载成员详情组件
   * 在用户点击时提前加载组件，减少跳转延迟
   */
  private preloadMemberDetailComponent(): void {
    // 动态导入成员详情组件进行预加载
    import('../member-detail/member-detail.component')
      .then(() => {
        console.log('成员详情组件预加载完成');
      })
      .catch((error) => {
        console.warn('成员详情组件预加载失败:', error);
      });
  }

  /**
   * 切换会员筛选状态
   * @param member 会员对象
   */
  toggleMemberFilter(member: Member): void {
    const memberId = member.memberId || member.id;
    
    console.log('点击会员:', member.name, '当前选中:', this.selectedMemberId, '是否筛选:', this.isFiltered);
    
    // 如果点击的是当前选中的会员且正在筛选状态，则取消筛选
    if (this.selectedMemberId === memberId && this.isFiltered) {
      console.log('取消筛选');
      this.clearFilter();
    } else {
      console.log('开始筛选');
      this.filterByMember(member);
    }
  }

  /**
   * 按会员筛选
   * @param member 会员对象
   */
  private filterByMember(member: Member): void {
    this.selectedMemberId = member.memberId || member.id;
    this.isFiltered = true;
    this.filteredMembers = [member];
  }

  /**
   * 清除筛选
   */
  private clearFilter(): void {
    this.selectedMemberId = null;
    this.isFiltered = false;
    this.filteredMembers = [...this.members];
    console.log('筛选已清除，selectedMemberId:', this.selectedMemberId, 'isFiltered:', this.isFiltered);
  }

  /**
   * 获取当前选中会员的姓名
   * @returns 会员姓名
   */
  getSelectedMemberName(): string {
    if (!this.selectedMemberId) return '';
    const member = this.members.find(m => (m.memberId || m.id) === this.selectedMemberId);
    return member ? member.name : '';
  }

  /**
   * 获取会员姓名的首字母（保留用于data-letter属性）
   * @param name 会员姓名
   * @returns 首字母（大写）
   */
  getFirstLetter(name: string): string {
    if (!name || name.length === 0) return 'A';
    const firstChar = name.charAt(0).toUpperCase();
    // 如果是中文字符，返回拼音首字母
    if (/[\u4e00-\u9fa5]/.test(firstChar)) {
      return this.getChineseFirstLetter(firstChar);
    }
    return firstChar;
  }

  /**
   * 获取中文字符的拼音首字母
   * @param char 中文字符
   * @returns 拼音首字母
   */
  private getChineseFirstLetter(char: string): string {
    // 简化的中文拼音首字母映射
    const pinyinMap: { [key: string]: string } = {
      '阿': 'A', '安': 'A', '艾': 'A',
      '白': 'B', '包': 'B', '毕': 'B', '边': 'B',
      '陈': 'C', '程': 'C', '曹': 'C', '崔': 'C',
      '邓': 'D', '丁': 'D', '董': 'D', '段': 'D',
      '冯': 'F', '方': 'F', '范': 'F', '费': 'F',
      '高': 'G', '郭': 'G', '顾': 'G', '关': 'G',
      '何': 'H', '黄': 'H', '韩': 'H', '胡': 'H',
      '李': 'L', '刘': 'L', '林': 'L', '梁': 'L',
      '马': 'M', '毛': 'M', '孟': 'M', '穆': 'M',
      '王': 'W', '吴': 'W', '魏': 'W', '温': 'W',
      '张': 'Z', '赵': 'Z', '周': 'Z', '郑': 'Z'
    };
    
    return pinyinMap[char] || 'A';
  }
}
