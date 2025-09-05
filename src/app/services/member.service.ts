import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Member, TeamData, Milestone } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private readonly STORAGE_KEY = 'team_data';
  private membersSubject = new BehaviorSubject<Member[]>([]);
  public members$ = this.membersSubject.asObservable();

  constructor() {
    this.loadMembers();
  }

  private loadMembers(): void {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (storedData) {
      try {
        const teamData: TeamData = JSON.parse(storedData);
        // 转换日期字符串为Date对象
        teamData.members.forEach(member => {
          member.joinDate = new Date(member.joinDate);
          member.milestones.forEach(milestone => {
            if (milestone.completedDate) {
              milestone.completedDate = new Date(milestone.completedDate);
            }
          });
          member.performance.lastReviewDate = new Date(member.performance.lastReviewDate);
        });
        this.membersSubject.next(teamData.members);
      } catch (error) {
        console.error('Error loading members from localStorage:', error);
        this.initializeDefaultData();
      }
    } else {
      this.initializeDefaultData();
    }
  }

  private initializeDefaultData(): void {
    const defaultMembers: Member[] = [
      {
        id: '1',
        name: '张三',
        position: '高级前端工程师',
        department: '技术部',
        email: 'zhangsan@company.com',
        joinDate: new Date('2022-01-15'),
        bio: '拥有5年前端开发经验，专精React和Angular框架，热爱新技术探索。',
        skills: ['Angular', 'React', 'TypeScript', 'Node.js', 'UI/UX设计'],
        milestones: [
          {
            id: 'm1',
            title: '完成Angular高级培训',
            description: '通过公司内部Angular高级培训课程',
            completedDate: new Date('2022-03-15'),
            status: 'completed',
            category: 'certification',
            priority: 'high',
            tags: ['Angular', '培训']
          },
          {
            id: 'm2',
            title: '主导项目重构',
            description: '成功重构公司核心前端项目，提升性能30%',
            completedDate: new Date('2022-06-20'),
            status: 'completed',
            category: 'project',
            priority: 'high',
            tags: ['重构', '性能优化']
          },
          {
            id: 'm3',
            title: '学习微前端架构',
            description: '深入研究微前端架构模式',
            status: 'in-progress',
            category: 'skill',
            priority: 'medium',
            tags: ['微前端', '架构']
          }
        ],
        currentGoals: ['成为技术专家', '培养团队新人', '探索AI在前端的应用'],
        performance: {
          rating: 4.5,
          lastReviewDate: new Date('2023-12-01'),
          notes: '表现优秀，技术能力强，团队协作良好'
        }
      },
      {
        id: '2',
        name: '李四',
        position: '产品经理',
        department: '产品部',
        email: 'lisi@company.com',
        joinDate: new Date('2021-08-20'),
        bio: '资深产品经理，擅长用户研究和产品设计，有丰富的B端产品经验。',
        skills: ['产品设计', '用户研究', '数据分析', '项目管理', '敏捷开发'],
        milestones: [
          {
            id: 'm4',
            title: 'PMP认证',
            description: '获得项目管理专业人士认证',
            completedDate: new Date('2022-01-10'),
            status: 'completed',
            category: 'certification',
            priority: 'high',
            tags: ['PMP', '项目管理']
          },
          {
            id: 'm5',
            title: '产品上线成功',
            description: '主导的新产品成功上线，用户增长200%',
            completedDate: new Date('2022-09-15'),
            status: 'completed',
            category: 'achievement',
            priority: 'high',
            tags: ['产品上线', '用户增长']
          },
          {
            id: 'm6',
            title: '学习AI产品设计',
            description: '研究AI在产品设计中的应用',
            status: 'pending',
            category: 'skill',
            priority: 'medium',
            tags: ['AI', '产品设计']
          }
        ],
        currentGoals: ['提升数据分析能力', '学习AI产品设计', '培养产品团队'],
        performance: {
          rating: 4.8,
          lastReviewDate: new Date('2023-11-15'),
          notes: '产品思维优秀，执行力强，用户导向明确'
        }
      },
      {
        id: '3',
        name: '王五',
        position: 'UI/UX设计师',
        department: '设计部',
        email: 'wangwu@company.com',
        joinDate: new Date('2023-02-01'),
        bio: '新加入的设计师，有良好的设计基础，正在快速成长中。',
        skills: ['Figma', 'Sketch', 'Adobe Creative Suite', '用户界面设计', '用户体验设计'],
        milestones: [
          {
            id: 'm7',
            title: '完成设计系统搭建',
            description: '参与公司设计系统的搭建工作',
            completedDate: new Date('2023-04-20'),
            status: 'completed',
            category: 'project',
            priority: 'medium',
            tags: ['设计系统', '协作']
          },
          {
            id: 'm8',
            title: '学习前端开发基础',
            description: '学习HTML、CSS、JavaScript基础',
            status: 'in-progress',
            category: 'skill',
            priority: 'medium',
            tags: ['前端开发', '学习']
          }
        ],
        currentGoals: ['提升设计技能', '学习前端开发', '参与更多项目'],
        performance: {
          rating: 4.0,
          lastReviewDate: new Date('2023-10-01'),
          notes: '学习能力强，设计基础扎实，需要更多项目经验'
        }
      }
    ];

    this.saveMembers(defaultMembers);
  }

  private saveMembers(members: Member[]): void {
    const teamData: TeamData = {
      members,
      lastUpdated: new Date()
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(teamData));
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
}
