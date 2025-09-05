import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, catchError } from 'rxjs';
import { Member, TeamData, Milestone } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private readonly STORAGE_KEY = 'team_data';
  private readonly DATA_URL = 'assets/data/members.json';
  private membersSubject = new BehaviorSubject<Member[]>([]);
  public members$ = this.membersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMembers();
  }

  private loadMembers(): void {
    // 首先尝试从JSON文件加载数据
    this.loadFromJsonFile().subscribe({
      next: (teamData) => {
        if (teamData && teamData.members) {
          this.processMembersData(teamData.members);
          // 将JSON数据保存到localStorage作为缓存
          this.saveMembersToStorage(teamData.members);
        } else {
          this.loadFromLocalStorage();
        }
      },
      error: (error) => {
        console.warn('无法从JSON文件加载数据，尝试从localStorage加载:', error);
        this.loadFromLocalStorage();
      }
    });
  }

  private loadFromJsonFile(): Observable<TeamData | null> {
    return this.http.get<TeamData>(this.DATA_URL).pipe(
      catchError(error => {
        console.error('从JSON文件加载数据失败:', error);
        return of(null);
      })
    );
  }

  private loadFromLocalStorage(): void {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (storedData) {
      try {
        const teamData: TeamData = JSON.parse(storedData);
        this.processMembersData(teamData.members);
      } catch (error) {
        console.error('从localStorage加载数据失败:', error);
        this.initializeDefaultData();
      }
    } else {
      this.initializeDefaultData();
    }
  }

  private processMembersData(members: Member[]): void {
    // 转换日期字符串为Date对象
    members.forEach(member => {
      member.joinDate = new Date(member.joinDate);
      member.milestones.forEach(milestone => {
        if (milestone.completedDate) {
          milestone.completedDate = new Date(milestone.completedDate);
        }
      });
      member.performance.lastReviewDate = new Date(member.performance.lastReviewDate);
    });
    this.membersSubject.next(members);
  }

  private saveMembersToStorage(members: Member[]): void {
    const teamData: TeamData = {
      members,
      lastUpdated: new Date()
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(teamData));
  }

  private initializeDefaultData(): void {
    const defaultMembers: Member[] = [
      {
        id: '1',
        name: '张明',
        position: '大区干事',
        department: 'D128大区',
        email: 'zhangming@toastmasters.org',
        joinDate: new Date('2024-01-15'),
        bio: '拥有3年Toastmasters经验，渴望突破领导力瓶颈，希望在团队管理和项目执行方面获得提升。',
        skills: ['团队管理', '项目执行', '沟通表达', '时间管理', '决策制定'],
        milestones: [
          {
            id: 'm1',
            title: '完成领导力基础培训',
            description: '通过LEAD项目第一阶段领导力基础课程',
            completedDate: new Date('2024-03-15'),
            status: 'completed',
            category: 'training',
            priority: 'high',
            tags: ['领导力', '基础培训']
          },
          {
            id: 'm2',
            title: '主导团队项目',
            description: '成功主导大区年度活动项目，提升团队协作效率',
            completedDate: new Date('2024-06-20'),
            status: 'completed',
            category: 'project',
            priority: 'high',
            tags: ['项目管理', '团队协作']
          },
          {
            id: 'm3',
            title: '学习韧性领导力',
            description: '深入研究韧性领导力模式和实践方法',
            status: 'in-progress',
            category: 'leadership',
            priority: 'medium',
            tags: ['韧性领导力', '心理韧性']
          }
        ],
        currentGoals: ['提升决策能力', '培养团队韧性', '进入DLC人才池'],
        performance: {
          rating: 4.5,
          lastReviewDate: new Date('2024-12-01'),
          notes: '学习积极，领导力提升明显，团队协作良好'
        },
        leadershipLevel: 'intermediate',
        participationRate: 92,
        assignmentCompletionRate: 88,
        bottleneckResolutionRate: 85
      },
      {
        id: '2',
        name: '李华',
        position: '大区干事',
        department: 'D128大区',
        email: 'lihua@toastmasters.org',
        joinDate: new Date('2023-08-20'),
        bio: '资深Toastmasters成员，擅长团队协调和活动组织，希望在战略思维和影响力方面获得突破。',
        skills: ['团队协调', '活动组织', '战略思维', '影响力建设', '冲突解决'],
        milestones: [
          {
            id: 'm4',
            title: '完成高级领导力认证',
            description: '获得Toastmasters高级领导力认证',
            completedDate: new Date('2024-01-10'),
            status: 'completed',
            category: 'certification',
            priority: 'high',
            tags: ['高级领导力', '认证']
          },
          {
            id: 'm5',
            title: '成功组织大区年会',
            description: '主导的大区年会活动成功举办，参与人数增长150%',
            completedDate: new Date('2024-09-15'),
            status: 'completed',
            category: 'achievement',
            priority: 'high',
            tags: ['活动组织', '影响力']
          },
          {
            id: 'm6',
            title: '学习共生领导力',
            description: '研究共生领导力模式和实践方法',
            status: 'pending',
            category: 'leadership',
            priority: 'medium',
            tags: ['共生领导力', '协作']
          }
        ],
        currentGoals: ['提升战略思维', '学习共生领导力', '培养影响力'],
        performance: {
          rating: 4.8,
          lastReviewDate: new Date('2024-11-15'),
          notes: '组织能力强，影响力突出，团队协作优秀'
        },
        leadershipLevel: 'advanced',
        participationRate: 95,
        assignmentCompletionRate: 92,
        bottleneckResolutionRate: 88
      },
      {
        id: '3',
        name: '王丽',
        position: '大区干事',
        department: 'D128大区',
        email: 'wangli@toastmasters.org',
        joinDate: new Date('2024-02-01'),
        bio: '新加入的Toastmasters成员，有良好的沟通基础，正在快速成长中，希望在领导力方面获得突破。',
        skills: ['沟通表达', '演讲技巧', '团队协作', '时间管理', '目标设定'],
        milestones: [
          {
            id: 'm7',
            title: '完成基础领导力培训',
            description: '参与LEAD项目基础领导力培训课程',
            completedDate: new Date('2024-04-20'),
            status: 'completed',
            category: 'training',
            priority: 'medium',
            tags: ['基础培训', '领导力']
          },
          {
            id: 'm8',
            title: '学习炼能领导力',
            description: '深入学习炼能领导力核心技能',
            status: 'in-progress',
            category: 'leadership',
            priority: 'medium',
            tags: ['炼能领导力', '技能提升']
          }
        ],
        currentGoals: ['提升沟通技能', '学习炼能领导力', '参与更多项目'],
        performance: {
          rating: 4.0,
          lastReviewDate: new Date('2024-10-01'),
          notes: '学习能力强，沟通基础扎实，需要更多实践机会'
        },
        leadershipLevel: 'beginner',
        participationRate: 88,
        assignmentCompletionRate: 85,
        bottleneckResolutionRate: 75
      }
    ];

    this.saveMembers(defaultMembers);
  }

  private saveMembers(members: Member[]): void {
    this.saveMembersToStorage(members);
    this.membersSubject.next(members);
  }

  getMembers(): Observable<Member[]> {
    return this.members$;
  }

  getMemberById(id: string): Member | undefined {
    return this.membersSubject.value.find(member => member.id === id);
  }

  updateMember(updatedMember: Member): void {
    const members = this.membersSubject.value;
    const index = members.findIndex(member => member.id === updatedMember.id);
    if (index !== -1) {
      members[index] = updatedMember;
      this.saveMembers(members);
    }
  }

  addMilestone(memberId: string, milestone: Milestone): void {
    const members = this.membersSubject.value;
    const member = members.find(m => m.id === memberId);
    if (member) {
      member.milestones.push(milestone);
      this.saveMembers(members);
    }
  }

  updateMilestone(memberId: string, milestoneId: string, updatedMilestone: Milestone): void {
    const members = this.membersSubject.value;
    const member = members.find(m => m.id === memberId);
    if (member) {
      const index = member.milestones.findIndex(m => m.id === milestoneId);
      if (index !== -1) {
        member.milestones[index] = updatedMilestone;
        this.saveMembers(members);
      }
    }
  }

  deleteMilestone(memberId: string, milestoneId: string): void {
    const members = this.membersSubject.value;
    const member = members.find(m => m.id === memberId);
    if (member) {
      member.milestones = member.milestones.filter(m => m.id !== milestoneId);
      this.saveMembers(members);
    }
  }

  /**
   * 重新从JSON文件加载数据
   * 用于管理员手动刷新数据
   */
  reloadFromJson(): Observable<boolean> {
    return new Observable(observer => {
      this.loadFromJsonFile().subscribe({
        next: (teamData) => {
          if (teamData && teamData.members) {
            this.processMembersData(teamData.members);
            this.saveMembersToStorage(teamData.members);
            observer.next(true);
            observer.complete();
          } else {
            observer.next(false);
            observer.complete();
          }
        },
        error: (error) => {
          console.error('重新加载JSON数据失败:', error);
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  /**
   * 清除localStorage缓存，强制从JSON文件重新加载
   */
  clearCacheAndReload(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.loadMembers();
  }
}
