import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Team Hero -->
    <section class="page-hero">
      <div class="container">
        <div class="text-center">
          <h1 class="page-title fade-in-up">团队成员</h1>
          <p class="page-subtitle fade-in-up">
            《D128 2025-2026 LEAD项目》团队成员及职责
          </p>
        </div>
      </div>
    </section>

    <!-- Team Content -->
    <section class="team-content">
      <div class="container">
        <div class="team-grid">
          <div class="team-card" *ngFor="let member of teamMembers">
            <div class="card">
              <div class="team-header">
                <h3 class="team-role">{{ member.role }}</h3>
                <div class="team-responsible">
                  <span class="responsible-label">负责人：</span>
                  <span class="responsible-names">{{ member.responsible }}</span>
                </div>
              </div>
              
              <div class="team-responsibilities">
                <h4 class="responsibilities-title">职责：</h4>
                <ul class="responsibilities-list">
                  <li *ngFor="let responsibility of member.responsibilities">
                    {{ responsibility }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .team-content {
      padding: 6rem 0;
      background: white;
      
      .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }
    }
    
    .team-card {
      .card {
        padding: 2rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
      }
    }
    
    .team-header {
      margin-bottom: 1.5rem;
      
      .team-role {
        font-size: 1.4rem;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .team-responsible {
        .responsible-label {
          font-weight: 600;
          color: #666;
        }
        
        .responsible-names {
          font-weight: 600;
          color: #667eea;
        }
      }
    }
    
    .team-responsibilities {
      flex: 1;
      
      .responsibilities-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 1rem;
      }
      
      .responsibilities-list {
        list-style: none;
        padding: 0;
        margin: 0;
        
        li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.8rem;
          color: #666;
          line-height: 1.5;
          
          &::before {
            content: '•';
            position: absolute;
            left: 0;
            top: 0.1em;
            color: #667eea;
            font-weight: bold;
            font-size: 1.2rem;
            line-height: 1;
          }
        }
      }
    }
    
    @media (max-width: 768px) {
      .team-content {
        padding: 4rem 0;
        
        .team-grid {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
      }
      
      .team-card {
        .card {
          padding: 1.5rem;
        }
      }
      
      .team-header {
        .team-role {
          font-size: 1.2rem;
        }
      }
      
      .team-responsibilities {
        .responsibilities-title {
          font-size: 1rem;
        }
        
        .responsibilities-list {
          li {
            font-size: 0.9rem;
            margin-bottom: 0.6rem;
            
            &::before {
              font-size: 1rem;
              line-height: 1;
              top: 0.1em;
            }
          }
        }
      }
    }
  `]
})
export class ContactComponent {
  teamMembers = [
    {
      role: '项目负责人',
      responsible: '徐莉莉 & 徐斌',
      responsibilities: [
        '寻找项目顾问',
        '制定愿景/使命/目标/计划',
        '确定团队职责',
        '跟踪进度',
        '标准化文档',
        '招募学员',
        '建立运营规则（签到、毕业）'
      ]
    },
    {
      role: '课程内容设计官',
      responsible: '徐莉莉 & 徐斌',
      responsibilities: [
        '确认课程主题/讲师',
        '确认教学大纲的连贯性',
        '为学员寻找学习材料'
      ]
    },
    {
      role: '作业官',
      responsible: '徐斌',
      responsibilities: [
        '设计课后书面作业（数字化技术支持）',
        '设计《领导力成长手册》作为实践性电子作业'
      ]
    },
    {
      role: '指导委员会护卫',
      responsible: '徐莉莉 & 徐斌',
      responsibilities: [
        '为学员分配导师',
        '监督学员-导师沟通',
        '确保记录提交给班主任'
      ]
    },
    {
      role: '班主任',
      responsible: '水镜',
      responsibilities: [
        '管理教学支持和流程',
        '发送录取通知书',
        '管理作业（发布、跟踪完成率）',
        '协调课程（培训、预习材料、反馈调查）',
        '归档沟通记录',
        '选择/奖励优秀学员'
      ]
    },
    {
      role: '副班主任',
      responsible: '徐斌',
      responsibilities: [
        '关注学员关系和成长',
        '了解个别学员痛点',
        '用《领导力成长手册》跟踪成长',
        '为问题提供初步指导',
        '提升社群活跃度',
        '识别/推广鼓舞人心的项目故事'
      ]
    },
    {
      role: '线上课程运营官',
      responsible: '小米粒 & 群群',
      responsibilities: [
        '组织所有五门在线课程',
        '包括主持人、计时员、流程确认、议程创建等角色',
        '具体课程主题：愿景/价值观/指导委员会/项目描述、指导委员会指导、冲突管理、高效能人士的七个习惯、培养与认可'
      ]
    },
    {
      role: '线下课程运营官',
      responsible: '小马哥—杭州场',
      responsibilities: [
        '组织线下活动',
        '包括场地、角色、茶歇、流程确认、议程'
      ]
    },
    {
      role: '数字化技术支持官',
      responsible: '美文',
      responsibilities: [
        '在"小打卡"上设置学习内容和作业（徐斌设计，文本/视频/导师评论）',
        '协助班主任进行作业统计'
      ]
    },
    {
      role: '数字化技术支持官',
      responsible: '子扬',
      responsibilities: [
        '满足运营团队的所有数字化工具需求',
        '制作电子录取/毕业证书',
        '定制化领导力旅程记录（数据依赖）',
        '任务解锁链'
      ]
    },
    {
      role: '财务官',
      responsible: '马岚',
      responsibilities: [
        '管理项目资金（包括前期余额1990元）',
        '收取学员押金',
        '记录/发布月度收支明细',
        '项目结束后退还押金/发布最终财务明细'
      ]
    },
    {
      role: '社群氛围官',
      responsible: '马莲',
      responsibilities: [
        '分类领导力痛点（匹配课程模块）',
        '通过定期发布痛点激活群组',
        '将讨论内容整理成《领导力错误手册》或《突破工具包》供分享'
      ]
    },
    {
      role: '宣传官',
      responsible: '徐莉莉',
      responsibilities: [
        '负责所有海报和推送文章发布'
      ]
    }
  ];
}
